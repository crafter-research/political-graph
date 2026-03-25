import * as d3 from "d3";
import { LINK_TYPES } from "../data/link-types";
import { cases } from "../data/cases";
import { politicians } from "../data/politicians";
import { links } from "../data/links";

interface GraphNode extends d3.SimulationNodeDatum {
  id: string;
  label: string;
  nodeType: "caso" | "politico";
  size: number;
  desc?: string;
  role?: string;
  year?: string;
  monto?: string;
  party?: string;
  tags?: string[];
}

const allNodes: GraphNode[] = [
  ...cases.map((c) => ({
    ...c,
    nodeType: "caso" as const,
    size: c.size || 16,
  })),
  ...politicians.map((p) => ({
    ...p,
    nodeType: "politico" as const,
    size: p.size || 12,
  })),
];

let activeTypes = new Set(Object.keys(LINK_TYPES));
let activePartyFilter = new Set<string>();
let selectedId: string | null = null;
let sim: d3.Simulation<GraphNode, undefined>;
let linkEls: d3.Selection<SVGLineElement, (typeof links)[number], SVGGElement, unknown>;
let nodeEls: d3.Selection<SVGGElement, GraphNode, SVGGElement, unknown>;

function launch() {
  document.getElementById("intro")!.classList.add("gone");
  setTimeout(init, 300);
}

function init() {
  const parties = [
    ...new Set(politicians.filter((p) => p.party).map((p) => p.party!)),
  ].sort();
  const chipWrap = document.getElementById("party-chips")!;
  for (const party of parties) {
    const chip = document.createElement("span");
    chip.className = "party-chip";
    chip.textContent = party;
    chip.dataset.party = party;
    chip.onclick = () => toggleParty(chip, party);
    chipWrap.appendChild(chip);
  }

  const fc = document.getElementById("filter-container")!;
  for (const [key, val] of Object.entries(LINK_TYPES)) {
    const chip = document.createElement("span");
    chip.className = "link-chip active";
    chip.dataset.type = key;
    chip.innerHTML = `<span class="lc-dot" style="background:${val.color}"></span>${val.label}`;
    chip.onclick = () => toggleType(chip, key);
    fc.appendChild(chip);
  }

  document.getElementById("s-pol")!.textContent = String(politicians.length);
  document.getElementById("s-cas")!.textContent = String(cases.length);
  document.getElementById("s-con")!.textContent = String(links.length);
  document.getElementById("s-era")!.textContent = "2000-2026";

  const svg = d3.select<SVGSVGElement, unknown>("#canvas");
  const W = svg.node()!.clientWidth;
  const H = svg.node()!.clientHeight;

  const defs = svg.append("defs");
  const glow = defs.append("filter").attr("id", "glow");
  glow.append("feGaussianBlur").attr("stdDeviation", "4").attr("result", "b");
  const m = glow.append("feMerge");
  m.append("feMergeNode").attr("in", "b");
  m.append("feMergeNode").attr("in", "SourceGraphic");

  const g = svg.append("g");
  const zoom = d3
    .zoom<SVGSVGElement, unknown>()
    .scaleExtent([0.2, 6])
    .on("zoom", (e) => g.attr("transform", e.transform));
  svg.call(zoom);
  svg.call(
    zoom.transform,
    d3.zoomIdentity.translate(W / 2, H / 2).scale(0.75)
  );

  linkEls = g
    .append("g")
    .selectAll<SVGLineElement, (typeof links)[number]>("line")
    .data(links)
    .join("line")
    .attr("class", "link-line")
    .attr("stroke", (d) => LINK_TYPES[d.type]?.color || "#555")
    .attr("stroke-width", (d) =>
      d.type === "condenado" || d.type === "responsable" ? 2.5 : 1.5
    )
    .attr("stroke-dasharray", (d) => LINK_TYPES[d.type]?.dash || "none");

  nodeEls = g
    .append("g")
    .selectAll<SVGGElement, GraphNode>("g")
    .data(allNodes)
    .join("g")
    .attr("class", "node-g")
    .call(
      d3
        .drag<SVGGElement, GraphNode>()
        .on("start", (e, d) => {
          if (!e.active) sim.alphaTarget(0.3).restart();
          d.fx = d.x;
          d.fy = d.y;
        })
        .on("drag", (e, d) => {
          d.fx = e.x;
          d.fy = e.y;
        })
        .on("end", (e, d) => {
          if (!e.active) sim.alphaTarget(0);
          d.fx = null;
          d.fy = null;
        })
    );

  nodeEls
    .append("circle")
    .attr("class", "outer")
    .attr("r", (d) => d.size)
    .attr("fill", (d) =>
      d.nodeType === "politico" ? "rgba(255,210,63,0.1)" : "rgba(60,60,60,0.4)"
    )
    .attr("fill-opacity", (d) => (d.nodeType === "politico" ? 0.15 : 0.6))
    .attr("stroke", (d) => (d.nodeType === "politico" ? "#ffd23f" : "#555"))
    .attr("stroke-width", (d) => (d.nodeType === "politico" ? 1.5 : 2))
    .attr("filter", "url(#glow)");

  nodeEls
    .append("circle")
    .attr("class", "inner")
    .attr("r", (d) =>
      d.nodeType === "politico" ? Math.max(2.5, d.size * 0.25) : 0
    )
    .attr("fill", (d) => (d.nodeType === "politico" ? "#ffd23f" : "none"));

  nodeEls
    .filter((d) => d.nodeType === "caso")
    .append("rect")
    .attr("class", "inner")
    .attr("x", -3)
    .attr("y", -3)
    .attr("width", 6)
    .attr("height", 6)
    .attr("rx", 1)
    .attr("fill", "#666");

  nodeEls
    .append("text")
    .attr("y", (d) => d.size + 13)
    .text((d) => d.label);

  nodeEls
    .on("mouseover", (_e, d) => {
      if (!selectedId) highlight(d.id);
    })
    .on("mouseout", () => {
      if (!selectedId) applyPartyFilter();
    })
    .on("click", (e, d) => {
      e.stopPropagation();
      selectedId = d.id;
      highlight(d.id);
      showPanel(d);
    });

  svg.on("click", () => {
    selectedId = null;
    applyPartyFilter();
    closePanel();
  });

  sim = d3
    .forceSimulation(allNodes)
    .force(
      "link",
      d3
        .forceLink(links)
        .id((d: any) => d.id)
        .distance((d: any) => {
          if (d.type === "familiar" || d.type === "sucesion") return 55;
          return 90;
        })
        .strength(0.5)
    )
    .force(
      "charge",
      d3
        .forceManyBody()
        .strength((d: any) => (d.nodeType === "caso" ? -400 : -250))
    )
    .force("center", d3.forceCenter(0, 0).strength(0.05))
    .force(
      "collision",
      d3.forceCollide().radius((d: any) => d.size + 16)
    )
    .force("x", d3.forceX(0).strength(0.02))
    .force("y", d3.forceY(0).strength(0.02))
    .on("tick", () => {
      linkEls
        .attr("x1", (d: any) => d.source.x)
        .attr("y1", (d: any) => d.source.y)
        .attr("x2", (d: any) => d.target.x)
        .attr("y2", (d: any) => d.target.y);
      nodeEls.attr("transform", (d) => `translate(${d.x},${d.y})`);
    });

  document.getElementById("search")!.addEventListener("input", function () {
    const q = (this as HTMLInputElement).value.toLowerCase().trim();
    if (!q) {
      selectedId = null;
      resetHL();
      closePanel();
      return;
    }
    const match = allNodes.find((n) => n.label.toLowerCase().includes(q));
    if (match) {
      selectedId = match.id;
      highlight(match.id);
      showPanel(match);
    }
  });
}

function highlight(id: string) {
  const conn = new Set([id]);
  for (const l of links) {
    const s = typeof l.source === "object" ? (l.source as any).id : l.source;
    const t = typeof l.target === "object" ? (l.target as any).id : l.target;
    if (s === id) conn.add(t);
    if (t === id) conn.add(s);
  }

  linkEls
    .classed("hl", (l) => {
      const s = typeof l.source === "object" ? (l.source as any).id : l.source;
      const t = typeof l.target === "object" ? (l.target as any).id : l.target;
      return s === id || t === id;
    })
    .classed("dim", (l) => {
      const s = typeof l.source === "object" ? (l.source as any).id : l.source;
      const t = typeof l.target === "object" ? (l.target as any).id : l.target;
      return s !== id && t !== id;
    });

  nodeEls
    .classed("hl", (d) => d.id === id)
    .classed("dim", (d) => !conn.has(d.id));
}

function resetHL() {
  linkEls.classed("hl", false).classed("dim", false);
  nodeEls.classed("hl", false).classed("dim", false);
}

function applyPartyFilter() {
  linkEls.classed("hl", false).classed("dim", false);
  nodeEls.classed("hl", false).classed("dim", false);
  if (activePartyFilter.size === 0) return;

  const visibleIds = new Set<string>();
  for (const n of allNodes) {
    if (
      n.nodeType === "politico" &&
      (!n.party || activePartyFilter.has(n.party))
    ) {
      visibleIds.add(n.id);
    }
  }
  for (const l of links) {
    const s = typeof l.source === "object" ? (l.source as any).id : l.source;
    const t = typeof l.target === "object" ? (l.target as any).id : l.target;
    if (visibleIds.has(s)) visibleIds.add(t);
    if (visibleIds.has(t)) visibleIds.add(s);
  }

  nodeEls.classed("dim", (d) => !visibleIds.has(d.id));
  linkEls.classed("dim", (l) => {
    const s = typeof l.source === "object" ? (l.source as any).id : l.source;
    const t = typeof l.target === "object" ? (l.target as any).id : l.target;
    return !visibleIds.has(s) || !visibleIds.has(t);
  });
}

function toggleParty(chip: HTMLElement, party: string) {
  if (activePartyFilter.has(party)) {
    activePartyFilter.delete(party);
    chip.classList.remove("active");
  } else {
    activePartyFilter.add(party);
    chip.classList.add("active");
  }
  selectedId = null;
  closePanel();
  applyPartyFilter();
}

function resetPartyFilter() {
  activePartyFilter.clear();
  document
    .querySelectorAll(".party-chip")
    .forEach((c) => c.classList.remove("active"));
  selectedId = null;
  closePanel();
  applyPartyFilter();
}

function showPanel(d: GraphNode) {
  const p = document.getElementById("panel")!;
  const isCase = d.nodeType === "caso";

  let html = `<div class="node-type-badge ${isCase ? "badge-caso" : "badge-politico"}">${isCase ? "Caso" : "Politico"}</div>`;
  html += `<h2>${d.label}</h2>`;
  html += `<div class="meta">${isCase ? d.year || "" : d.role || ""}${d.monto ? " · " + d.monto : ""}</div>`;

  if (d.desc)
    html += `<p style="font-size:12px;color:var(--text-dim);line-height:1.6;margin-bottom:12px;">${d.desc}</p>`;

  if (d.tags && d.tags.length) {
    html += `<div class="info-tags">`;
    for (const t of d.tags) {
      let cls = "tag-blue";
      if (/preso|condenad|profugo|golpe|masacre|sentencia/i.test(t))
        cls = "tag-red";
      else if (/investigad|suspendid|censurad|inhabilitad/i.test(t))
        cls = "tag-orange";
      else if (/fallecid|indultad/i.test(t)) cls = "tag-blue";
      html += `<span class="tag ${cls}">${t}</span>`;
    }
    html += `</div>`;
  }

  const conns = links.filter((l) => {
    const s = typeof l.source === "object" ? (l.source as any).id : l.source;
    const t = typeof l.target === "object" ? (l.target as any).id : l.target;
    return s === d.id || t === d.id;
  });

  if (conns.length) {
    html += `<div class="info-section"><h4>${conns.length} Conexiones</h4>`;
    for (const l of conns) {
      const s = typeof l.source === "object" ? (l.source as any).id : l.source;
      const t = typeof l.target === "object" ? (l.target as any).id : l.target;
      const otherId = s === d.id ? t : s;
      const other = allNodes.find((n) => n.id === otherId);
      if (!other) continue;
      const lt = LINK_TYPES[l.type];
      html += `<div class="conn-row" data-nav-id="${otherId}">
        <div class="conn-dot" style="background:${lt?.color || "#555"}"></div>
        <span class="conn-name">${other.label}</span>
        <span class="conn-detail">${l.detail || lt?.label || ""}</span>
      </div>`;
    }
    html += `</div>`;
  }

  document.getElementById("panel-content")!.innerHTML = html;
  p.classList.add("open");

  p.querySelectorAll<HTMLElement>(".conn-row[data-nav-id]").forEach((row) => {
    row.addEventListener("click", () => {
      const navId = row.dataset.navId!;
      navTo(navId);
    });
  });
}

function navTo(id: string) {
  selectedId = id;
  const n = allNodes.find((x) => x.id === id);
  if (n) {
    highlight(id);
    showPanel(n);
  }
}

function closePanel() {
  document.getElementById("panel")!.classList.remove("open");
}

function toggleType(chip: HTMLElement, type: string) {
  if (activeTypes.has(type)) {
    activeTypes.delete(type);
    chip.classList.remove("active");
    chip.classList.add("inactive");
  } else {
    activeTypes.add(type);
    chip.classList.add("active");
    chip.classList.remove("inactive");
  }
  linkEls.attr("display", (d) =>
    activeTypes.has(d.type) ? "block" : "none"
  );
}

// Expose to global scope for inline event handlers
(window as any).launch = launch;
(window as any).closePanel = closePanel;
(window as any).resetPartyFilter = resetPartyFilter;
