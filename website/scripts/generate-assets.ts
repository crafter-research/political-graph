import sharp from "sharp";
import { mkdirSync } from "fs";
import { join } from "path";

const OUT = join(import.meta.dir, "..", "public");
mkdirSync(OUT, { recursive: true });

const BG = "#08080c";
const YELLOW = "#ffd23f";
const RED = "#ff4757";
const BLUE = "#70a1ff";
const ORANGE = "#ffa502";
const GREEN = "#7bed9f";
const TEXT = "#f0eef5";
const MUTED = "#5c5770";

function graphSvg(w: number, h: number, scale: number) {
  const cx = w / 2;
  const cy = h / 2;
  const r = 28 * scale;

  const nodes = [
    { x: cx, y: cy, r: r, fill: `${YELLOW}18`, stroke: YELLOW, sw: 2.5 * scale, inner: r * 0.3, innerFill: YELLOW },
    { x: cx - 120 * scale, y: cy - 80 * scale, r: 18 * scale, fill: `${YELLOW}10`, stroke: YELLOW, sw: 1.5 * scale, inner: 4 * scale, innerFill: YELLOW },
    { x: cx + 140 * scale, y: cy - 60 * scale, r: 16 * scale, fill: "#1a1a1a99", stroke: "#555", sw: 2 * scale, inner: 0, innerFill: "" },
    { x: cx + 100 * scale, y: cy + 90 * scale, r: 20 * scale, fill: `${YELLOW}10`, stroke: YELLOW, sw: 1.5 * scale, inner: 5 * scale, innerFill: YELLOW },
    { x: cx - 160 * scale, y: cy + 60 * scale, r: 14 * scale, fill: "#1a1a1a99", stroke: "#555", sw: 2 * scale, inner: 0, innerFill: "" },
    { x: cx - 60 * scale, y: cy + 120 * scale, r: 12 * scale, fill: "#1a1a1a99", stroke: "#555", sw: 2 * scale, inner: 0, innerFill: "" },
    { x: cx + 180 * scale, y: cy + 30 * scale, r: 10 * scale, fill: `${YELLOW}10`, stroke: YELLOW, sw: 1 * scale, inner: 2.5 * scale, innerFill: YELLOW },
    { x: cx - 40 * scale, y: cy - 130 * scale, r: 15 * scale, fill: "#1a1a1a99", stroke: "#555", sw: 2 * scale, inner: 0, innerFill: "" },
  ];

  const links = [
    { from: 0, to: 1, color: GREEN, opacity: 0.4 },
    { from: 0, to: 2, color: RED, opacity: 0.5 },
    { from: 0, to: 3, color: BLUE, opacity: 0.4 },
    { from: 0, to: 4, color: ORANGE, opacity: 0.4 },
    { from: 1, to: 7, color: RED, opacity: 0.3 },
    { from: 3, to: 5, color: BLUE, opacity: 0.3 },
    { from: 3, to: 6, color: GREEN, opacity: 0.3 },
    { from: 1, to: 4, color: ORANGE, opacity: 0.25 },
    { from: 2, to: 6, color: RED, opacity: 0.25 },
  ];

  const linksSvg = links
    .map(
      (l) =>
        `<line x1="${nodes[l.from].x}" y1="${nodes[l.from].y}" x2="${nodes[l.to].x}" y2="${nodes[l.to].y}" stroke="${l.color}" stroke-width="${1.5 * scale}" opacity="${l.opacity}"/>`
    )
    .join("\n    ");

  const nodesSvg = nodes
    .map((n) => {
      let s = `<circle cx="${n.x}" cy="${n.y}" r="${n.r}" fill="${n.fill}" stroke="${n.stroke}" stroke-width="${n.sw}" filter="url(#glow)"/>`;
      if (n.inner > 0) {
        s += `\n      <circle cx="${n.x}" cy="${n.y}" r="${n.inner}" fill="${n.innerFill}"/>`;
      } else {
        s += `\n      <rect x="${n.x - 3 * scale}" y="${n.y - 3 * scale}" width="${6 * scale}" height="${6 * scale}" rx="${1 * scale}" fill="#666"/>`;
      }
      return s;
    })
    .join("\n    ");

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
  <defs>
    <filter id="glow">
      <feGaussianBlur stdDeviation="${4 * scale}" result="b"/>
      <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
    <radialGradient id="bg-grad" cx="50%" cy="50%" r="60%">
      <stop offset="0%" stop-color="${YELLOW}" stop-opacity="0.03"/>
      <stop offset="100%" stop-color="${BG}" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="${BG}"/>
  <rect width="${w}" height="${h}" fill="url(#bg-grad)"/>
  <g>
    ${linksSvg}
  </g>
  <g>
    ${nodesSvg}
  </g>
  <text x="${w / 2}" y="${h - 50 * scale}" text-anchor="middle" font-family="monospace" font-size="${11 * scale}" font-weight="800" letter-spacing="${3 * scale}" fill="${YELLOW}" text-transform="uppercase">GRAFO POLITICO</text>
  <text x="${w / 2}" y="${h - 28 * scale}" text-anchor="middle" font-family="sans-serif" font-size="${9 * scale}" fill="${MUTED}">Relaciones entre politicos y casos de corrupcion en Peru</text>
  <text x="${w - 20 * scale}" y="${h - 12 * scale}" text-anchor="end" font-family="monospace" font-size="${7 * scale}" fill="${MUTED}" opacity="0.5">crafter research</text>
</svg>`;
}

function faviconSvg(size: number) {
  const s = size;
  const c = s / 2;
  const r = s * 0.4;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${s}" height="${s}" viewBox="0 0 ${s} ${s}">
  <rect width="${s}" height="${s}" rx="${s * 0.15}" fill="${BG}"/>
  <circle cx="${c}" cy="${c}" r="${r}" fill="none" stroke="${YELLOW}" stroke-width="${s * 0.06}"/>
  <circle cx="${c}" cy="${c}" r="${r * 0.3}" fill="${YELLOW}"/>
  <line x1="${c}" y1="${c}" x2="${c - r * 0.7}" y2="${c - r * 0.7}" stroke="${RED}" stroke-width="${s * 0.04}" opacity="0.7"/>
  <line x1="${c}" y1="${c}" x2="${c + r * 0.8}" y2="${c - r * 0.5}" stroke="${BLUE}" stroke-width="${s * 0.04}" opacity="0.7"/>
  <line x1="${c}" y1="${c}" x2="${c - r * 0.3}" y2="${c + r * 0.8}" stroke="${ORANGE}" stroke-width="${s * 0.04}" opacity="0.7"/>
  <circle cx="${c - r * 0.7}" cy="${c - r * 0.7}" r="${s * 0.06}" fill="#1a1a1a" stroke="#666" stroke-width="${s * 0.02}"/>
  <circle cx="${c + r * 0.8}" cy="${c - r * 0.5}" r="${s * 0.06}" fill="#1a1a1a" stroke="#666" stroke-width="${s * 0.02}"/>
  <circle cx="${c - r * 0.3}" cy="${c + r * 0.8}" r="${s * 0.06}" fill="#1a1a1a" stroke="#666" stroke-width="${s * 0.02}"/>
</svg>`;
}

async function main() {
  console.log("Generating OG image (1200x630)...");
  await sharp(Buffer.from(graphSvg(1200, 630, 1)))
    .png({ quality: 90 })
    .toFile(join(OUT, "og.png"));

  console.log("Generating Twitter OG image (1200x600)...");
  await sharp(Buffer.from(graphSvg(1200, 600, 1)))
    .png({ quality: 90 })
    .toFile(join(OUT, "og-twitter.png"));

  console.log("Generating favicon sizes...");
  const sizes = [16, 32, 48];
  const buffers: Buffer[] = [];
  for (const size of sizes) {
    const buf = await sharp(Buffer.from(faviconSvg(size * 4)))
      .resize(size, size)
      .png()
      .toBuffer();
    buffers.push(buf);
  }

  // ICO format: header + entries + image data
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // ICO type
  header.writeUInt16LE(sizes.length, 4); // count

  let offset = 6 + sizes.length * 16;
  const entries: Buffer[] = [];
  for (let i = 0; i < sizes.length; i++) {
    const entry = Buffer.alloc(16);
    entry.writeUInt8(sizes[i] === 256 ? 0 : sizes[i], 0); // width
    entry.writeUInt8(sizes[i] === 256 ? 0 : sizes[i], 1); // height
    entry.writeUInt8(0, 2); // color palette
    entry.writeUInt8(0, 3); // reserved
    entry.writeUInt16LE(1, 4); // planes
    entry.writeUInt16LE(32, 6); // bits per pixel
    entry.writeUInt32LE(buffers[i].length, 8); // size
    entry.writeUInt32LE(offset, 12); // offset
    offset += buffers[i].length;
    entries.push(entry);
  }

  const ico = Buffer.concat([header, ...entries, ...buffers]);
  await Bun.write(join(OUT, "favicon.ico"), ico);

  // Also update the SVG favicon
  await Bun.write(join(OUT, "favicon.svg"), faviconSvg(32));

  console.log("Done! Generated:");
  console.log("  public/og.png (1200x630)");
  console.log("  public/og-twitter.png (1200x600)");
  console.log("  public/favicon.ico (16/32/48)");
  console.log("  public/favicon.svg");
}

main().catch(console.error);
