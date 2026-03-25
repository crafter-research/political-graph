// SSE clients for live reload
const clients = new Set<ReadableStreamDefaultController>();

const LIVE_RELOAD = `<script>
  (function() {
    const es = new EventSource('/reload');
    es.onerror = function() { es.close(); setTimeout(function() { location.reload(); }, 800); };
  })();
<\/script>`;

const landingHtml = `<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Grafo Político Perú</title>
<style>
@import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700;800&family=DM+Sans:wght@300;400;500;600;700&display=swap');
*{margin:0;padding:0;box-sizing:border-box}
:root{
  --bg:#08080c;--surface:rgba(255,255,255,0.04);--surface2:rgba(255,255,255,0.07);
  --border:rgba(255,255,255,0.08);--text:#f0eef5;--text-dim:#9994a8;--text-muted:#5c5770;
  --yellow:#ffd23f;--red:#ff4757;--blue:#70a1ff;--orange:#ffa502;--green:#2ed573;
}
body{
  font-family:'DM Sans',sans-serif;
  background:var(--bg);color:var(--text);
  min-height:100vh;
  display:flex;flex-direction:column;align-items:center;justify-content:center;
  padding:40px 24px;
}
.logo{
  font-family:'JetBrains Mono',monospace;
  font-size:11px;font-weight:800;letter-spacing:4px;text-transform:uppercase;
  color:var(--yellow);margin-bottom:48px;
}
h1{
  font-family:'JetBrains Mono',monospace;
  font-size:clamp(32px,6vw,64px);font-weight:800;
  color:var(--text);letter-spacing:-1px;line-height:1.1;
  text-align:center;max-width:700px;margin-bottom:20px;
}
h1 span{color:var(--yellow);}
.sub{
  font-size:16px;color:var(--text-dim);
  max-width:480px;text-align:center;line-height:1.7;
  margin-bottom:48px;
}
.stats{
  display:flex;gap:40px;margin-bottom:52px;flex-wrap:wrap;justify-content:center;
}
.stat{text-align:center;}
.stat-n{
  font-family:'JetBrains Mono',monospace;
  font-size:36px;font-weight:800;color:var(--yellow);
  display:block;line-height:1;margin-bottom:6px;
}
.stat-l{font-size:11px;color:var(--text-muted);text-transform:uppercase;letter-spacing:2px;}
.cta{
  display:inline-flex;align-items:center;gap:10px;
  padding:14px 40px;
  background:var(--yellow);color:#08080c;
  font-family:'JetBrains Mono',monospace;
  font-size:12px;font-weight:800;letter-spacing:2px;text-transform:uppercase;
  border-radius:6px;text-decoration:none;
  transition:transform 0.15s,box-shadow 0.15s;
  box-shadow:0 0 40px rgba(255,210,63,0.2);
}
.cta:hover{transform:scale(1.04);box-shadow:0 0 60px rgba(255,210,63,0.35);}
.tags{display:flex;gap:8px;flex-wrap:wrap;justify-content:center;margin-top:48px;}
.tag{
  font-size:10px;font-weight:600;padding:4px 10px;border-radius:3px;
  border:1px solid var(--border);color:var(--text-muted);
}
.tag-r{background:rgba(255,71,87,0.08);border-color:rgba(255,71,87,0.2);color:var(--red);}
.tag-b{background:rgba(112,161,255,0.08);border-color:rgba(112,161,255,0.2);color:var(--blue);}
.tag-g{background:rgba(46,213,115,0.08);border-color:rgba(46,213,115,0.2);color:var(--green);}
.disclaimer{
  position:fixed;bottom:20px;
  font-family:'JetBrains Mono',monospace;
  font-size:9px;letter-spacing:1px;color:var(--text-muted);
}
</style>
</head>
<body>
<div class="logo">Grafo Político</div>
<h1>El mapa del poder <span>y la corrupción</span> en Perú</h1>
<p class="sub">
  Visualización interactiva de las relaciones entre políticos y casos de corrupción.
  Data basada en investigaciones fiscales, juicios y fuentes públicas verificadas.
</p>
<div class="stats">
  <div class="stat"><span class="stat-n">46</span><span class="stat-l">Políticos</span></div>
  <div class="stat"><span class="stat-n">13</span><span class="stat-l">Casos</span></div>
  <div class="stat"><span class="stat-n">43</span><span class="stat-l">Conexiones</span></div>
  <div class="stat"><span class="stat-n">26</span><span class="stat-l">Años cubiertos</span></div>
</div>
<a class="cta" href="/graph">Explorar grafo →</a>
<div class="tags">
  <span class="tag tag-r">Lava Jato</span>
  <span class="tag tag-r">Vladivideos</span>
  <span class="tag tag-r">Cuellos Blancos</span>
  <span class="tag tag-b">Elecciones 2026</span>
  <span class="tag tag-b">35 Partidos</span>
  <span class="tag tag-g">Fuentes verificadas</span>
</div>
<div class="disclaimer">PROTOTIPO · DATA ILUSTRATIVA BASADA EN FUENTES PÚBLICAS</div>
${LIVE_RELOAD}
</body>
</html>`;

const graphHtml = `<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Grafo Político Perú</title>
<script src="https://cdnjs.cloudflare.com/ajax/libs/d3/7.8.5/d3.min.js"><\/script>
<style>
@import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700;800&family=DM+Sans:wght@300;400;500;600;700&display=swap');

*{margin:0;padding:0;box-sizing:border-box}
:root{
  --bg:#08080c;
  --surface:rgba(255,255,255,0.04);
  --surface2:rgba(255,255,255,0.07);
  --border:rgba(255,255,255,0.08);
  --text:#f0eef5;
  --text-dim:#9994a8;
  --text-muted:#5c5770;
  --yellow:#ffd23f;
  --yellow-dim:rgba(255,210,63,0.12);
  --case-fill:#1a1a1a;
  --case-stroke:#444;
  --link-default:rgba(255,255,255,0.08);
  --red:#ff4757;
  --green:#2ed573;
  --blue:#70a1ff;
  --orange:#ffa502;
  --pink:#ff6b81;
  --cyan:#7bed9f;
}

body{
  font-family:'DM Sans',sans-serif;
  background:var(--bg);
  color:var(--text);
  overflow:hidden;
  height:100vh;
  user-select:none;
}

/* TOP BAR */
.topbar{
  position:fixed;top:0;left:0;right:0;z-index:100;
  height:52px;
  display:flex;align-items:center;justify-content:space-between;
  padding:0 20px;
  background:rgba(8,8,12,0.9);
  backdrop-filter:blur(20px);
  border-bottom:1px solid var(--border);
}

.topbar-left{display:flex;align-items:center;gap:16px;flex-shrink:0;}

.filter-bar{
  flex:1;
  display:flex;align-items:center;gap:6px;
  overflow-x:auto;
  padding:0 16px;
  scrollbar-width:none;
  min-width:0;
}
.filter-bar::-webkit-scrollbar{display:none;}

.filter-bar-label{
  font-family:'JetBrains Mono',monospace;
  font-size:9px;font-weight:700;
  letter-spacing:2px;text-transform:uppercase;
  color:var(--text-muted);
  white-space:nowrap;flex-shrink:0;
}

.filter-sep{
  width:1px;height:18px;
  background:var(--border);
  flex-shrink:0;margin:0 6px;
}

.chip-inline{display:flex;gap:4px;flex-shrink:0;}

.logo{
  font-family:'JetBrains Mono',monospace;
  font-size:11px;font-weight:800;
  letter-spacing:3px;text-transform:uppercase;
  color:var(--yellow);
}

.logo-sub{
  font-size:11px;font-weight:400;
  color:var(--text-muted);
  border-left:1px solid var(--border);
  padding-left:16px;
}

.search-wrap{position:relative;}
.search-wrap input{
  background:var(--surface);
  border:1px solid var(--border);
  color:var(--text);
  font-family:'DM Sans',sans-serif;
  font-size:13px;
  padding:7px 14px 7px 32px;
  border-radius:6px;
  width:280px;
  outline:none;
  transition:border-color 0.2s, background 0.2s;
}
.search-wrap input:focus{border-color:var(--yellow);background:var(--surface2);}
.search-wrap input::placeholder{color:var(--text-muted);}
.search-icon{position:absolute;left:10px;top:50%;transform:translateY(-50%);color:var(--text-muted);font-size:14px;}

/* SIDEBAR LEFT */
.sidebar{
  position:fixed;top:52px;left:0;bottom:0;z-index:90;
  width:220px;
  background:rgba(8,8,12,0.85);
  backdrop-filter:blur(20px);
  border-right:1px solid var(--border);
  padding:16px 14px;
  overflow-y:auto;
}

.sidebar h3{
  font-family:'JetBrains Mono',monospace;
  font-size:9px;font-weight:700;
  letter-spacing:2px;text-transform:uppercase;
  color:var(--text-muted);
  margin:16px 0 8px;
}
.sidebar h3:first-child{margin-top:0;}

.legend-item{
  display:flex;align-items:center;gap:8px;
  padding:5px 8px;
  border-radius:5px;
  font-size:12px;
  color:var(--text-dim);
  cursor:default;
}

.legend-dot{
  width:10px;height:10px;border-radius:50%;flex-shrink:0;
}

.legend-ring{
  width:10px;height:10px;border-radius:50%;flex-shrink:0;
  background:transparent;
  border:2px solid;
}

.link-chip{
  display:inline-flex;align-items:center;gap:5px;
  padding:3px 8px;
  border-radius:20px;
  font-size:10px;font-weight:600;
  cursor:pointer;
  border:1px solid var(--border);
  background:var(--surface);
  color:var(--text-muted);
  white-space:nowrap;flex-shrink:0;
  transition:all 0.15s;
}
.link-chip:hover{background:var(--surface2);color:var(--text-dim);}
.link-chip.active{background:var(--surface2);color:var(--text);border-color:rgba(255,255,255,0.15);}
.link-chip.inactive{opacity:0.3;}
.link-chip .lc-dot{width:6px;height:6px;border-radius:50%;flex-shrink:0;}

/* STATS BAR */
.statsbar{
  position:fixed;bottom:0;left:220px;right:0;z-index:90;
  height:40px;
  display:flex;align-items:center;gap:28px;
  padding:0 20px;
  background:rgba(8,8,12,0.9);
  backdrop-filter:blur(20px);
  border-top:1px solid var(--border);
  font-size:11px;
}
.statsbar .stat-val{
  font-family:'JetBrains Mono',monospace;
  font-weight:700;
  color:var(--yellow);
  margin-right:4px;
}
.statsbar .stat-lbl{color:var(--text-muted);}

/* INFO PANEL */
.info-panel{
  position:fixed;top:52px;right:0;bottom:40px;z-index:95;
  width:320px;
  background:rgba(8,8,12,0.92);
  backdrop-filter:blur(24px);
  border-left:1px solid var(--border);
  padding:20px;
  overflow-y:auto;
  transform:translateX(100%);
  transition:transform 0.3s cubic-bezier(0.4,0,0.2,1);
}
.info-panel.open{transform:translateX(0);}

.info-panel .close{
  position:absolute;top:14px;right:14px;
  background:var(--surface);border:1px solid var(--border);
  color:var(--text-dim);cursor:pointer;
  width:28px;height:28px;border-radius:6px;
  display:flex;align-items:center;justify-content:center;
  font-size:14px;transition:background 0.15s;
}
.info-panel .close:hover{background:var(--surface2);}

.info-panel .node-type-badge{
  display:inline-block;
  font-family:'JetBrains Mono',monospace;
  font-size:9px;font-weight:700;
  letter-spacing:1.5px;text-transform:uppercase;
  padding:3px 8px;border-radius:3px;
  margin-bottom:10px;
}
.badge-politico{background:var(--yellow-dim);color:var(--yellow);}
.badge-caso{background:rgba(255,71,87,0.12);color:var(--red);}

.info-panel h2{font-size:20px;font-weight:700;margin-bottom:4px;line-height:1.2;}
.info-panel .meta{font-size:12px;color:var(--text-dim);margin-bottom:16px;line-height:1.5;}

.info-tags{display:flex;flex-wrap:wrap;gap:4px;margin-bottom:16px;}
.tag{
  font-size:10px;font-weight:600;
  padding:3px 8px;border-radius:3px;
}
.tag-red{background:rgba(255,71,87,0.12);color:var(--red);}
.tag-orange{background:rgba(255,165,2,0.12);color:var(--orange);}
.tag-green{background:rgba(46,213,115,0.12);color:var(--green);}
.tag-blue{background:rgba(112,161,255,0.12);color:var(--blue);}

.info-section{margin-top:16px;padding-top:16px;border-top:1px solid var(--border);}
.info-section h4{
  font-family:'JetBrains Mono',monospace;
  font-size:9px;font-weight:700;
  letter-spacing:2px;text-transform:uppercase;
  color:var(--text-muted);
  margin-bottom:10px;
}

.conn-row{
  display:flex;align-items:center;gap:8px;
  padding:6px 0;font-size:12px;
  cursor:pointer;
  transition:opacity 0.15s;
}
.conn-row:hover{opacity:0.7;}
.conn-dot{width:6px;height:6px;border-radius:50%;flex-shrink:0;}
.conn-name{color:var(--text);font-weight:500;flex:1;}
.conn-detail{color:var(--text-muted);font-size:10px;text-align:right;max-width:120px;}

/* CANVAS */
svg{
  position:fixed;
  top:52px;left:220px;
  width:calc(100% - 220px);
  height:calc(100vh - 92px);
  cursor:grab;
}
svg:active{cursor:grabbing;}

.link-line{
  stroke-opacity:0.2;
  transition:stroke-opacity 0.3s;
}
.link-line.hl{stroke-opacity:0.8;}
.link-line.dim{stroke-opacity:0.03;}

.node-g{cursor:pointer;}
.node-g .outer{transition:r 0.2s, stroke-opacity 0.3s, fill-opacity 0.3s;}
.node-g .inner{pointer-events:none;}
.node-g text{
  font-family:'DM Sans',sans-serif;
  font-size:10px;
  fill:var(--text-muted);
  text-anchor:middle;
  pointer-events:none;
  transition:fill 0.3s, font-size 0.2s;
}
.node-g.hl text{fill:var(--text);font-weight:600;font-size:11px;}
.node-g.dim text{fill:transparent;}
.node-g.dim .outer{fill-opacity:0.03!important;stroke-opacity:0.1!important;}

/* INTRO */

.pulse-dot{
  animation:pulse 2s infinite;
}
@keyframes pulse{
  0%,100%{opacity:0.6;transform:scale(1);}
  50%{opacity:1;transform:scale(1.15);}
}

/* PARTY CHIPS */
.party-chip{
  display:inline-flex;align-items:center;
  padding:3px 8px;
  border-radius:20px;
  font-size:10px;font-weight:600;
  cursor:pointer;
  border:1px solid var(--border);
  background:var(--surface);
  color:var(--text-muted);
  white-space:nowrap;
  transition:background 0.15s, border-color 0.15s, color 0.15s;
  user-select:none;
}
.party-chip:hover{background:var(--surface2);color:var(--text-dim);}
.party-chip.active{
  background:rgba(255,210,63,0.15);
  border-color:rgba(255,210,63,0.5);
  color:var(--yellow);
}
.chip-reset{
  display:inline-flex;align-items:center;
  padding:3px 7px;
  border-radius:20px;
  font-size:10px;font-weight:700;
  cursor:pointer;
  border:1px solid var(--border);
  background:transparent;
  color:var(--text-muted);
  white-space:nowrap;flex-shrink:0;
  transition:all 0.15s;
  font-family:'JetBrains Mono',monospace;
}
.chip-reset:hover{background:var(--surface);color:var(--text);}
</style>
</head>
<body>

<div class="topbar">
  <div class="topbar-left">
    <div class="logo">Grafo Político</div>
  </div>
  <div class="filter-bar">
    <span class="filter-bar-label">Partido</span>
    <span class="chip-reset" onclick="resetPartyFilter()">✕</span>
    <div id="party-chips" class="chip-inline"></div>
    <div class="filter-sep"></div>
    <span class="filter-bar-label">Vínculos</span>
    <div id="filter-container" class="chip-inline"></div>
  </div>
  <div class="search-wrap">
    <span class="search-icon">⌕</span>
    <input id="search" type="text" placeholder="Buscar político o caso..." />
  </div>
</div>

<div class="sidebar" id="sidebar">
  <h3>Nodos</h3>
  <div class="legend-item">
    <div class="legend-dot" style="background:var(--yellow)"></div> Político / Candidato
  </div>
  <div class="legend-item">
    <div class="legend-ring" style="border-color:#666"></div> Caso / Escándalo
  </div>

  <h3>Fuentes</h3>
  <div style="font-size:11px;color:var(--text-muted);line-height:1.6;padding:0 8px;">
    Infogob · JNE Declara+<br>
    Ojo Público (Lava Jato)<br>
    IDL Reporteros<br>
    Proética · Convoca<br>
    datosabiertos.gob.pe<br>
    Poder Judicial · OSCE
  </div>
</div>

<div class="info-panel" id="panel">
  <button class="close" onclick="closePanel()">✕</button>
  <div id="panel-content"></div>
</div>

<div class="statsbar">
  <div><span class="stat-val" id="s-pol">0</span><span class="stat-lbl">Políticos</span></div>
  <div><span class="stat-val" id="s-cas">0</span><span class="stat-lbl">Casos</span></div>
  <div><span class="stat-val" id="s-con">0</span><span class="stat-lbl">Conexiones</span></div>
  <div><span class="stat-val" id="s-era">0</span><span class="stat-lbl">Años cubiertos</span></div>
  <div style="margin-left:auto;color:var(--text-muted);font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:1px;">
    PROTOTIPO · DATA ILUSTRATIVA BASADA EN FUENTES PÚBLICAS
  </div>
</div>

<svg id="canvas"></svg>

<script>
// ============ DATA MODEL ============

const LINK_TYPES = {
  investigado: { color: "#ff4757", label: "Investigado/Procesado", dash: "none" },
  condenado: { color: "#ff6348", label: "Condenado", dash: "none" },
  financiamiento: { color: "#ffa502", label: "Financiamiento ilícito", dash: "6,4" },
  vinculo_politico: { color: "#70a1ff", label: "Vínculo político", dash: "none" },
  obstruccion: { color: "#ff6b81", label: "Obstrucción / Encubrimiento", dash: "4,3" },
  familiar: { color: "#7bed9f", label: "Vínculo familiar", dash: "none" },
  sucesion: { color: "#a4b0be", label: "Sucesión presidencial", dash: "8,4" },
  responsable: { color: "#ff4757", label: "Responsable directo", dash: "none" }
};

// --- CASOS (dark nodes) ---
const cases = [
  { id: "lava_jato", label: "Caso Lava Jato", desc: "Megaesquema de sobornos de Odebrecht. US$29M en coimas en Perú entre 2005-2014. Involucra a 4 expresidentes.", year: "2016-presente", monto: "US$29M+" },
  { id: "cocteles", label: "Caso Cócteles", desc: "Investigación por lavado de activos por aportes de Odebrecht (US$1.2M) y Credicorp (US$3.65M) a campañas de Fuerza Popular.", year: "2017-presente", monto: "US$4.85M" },
  { id: "interoceanica", label: "Caso Interoceánica", desc: "Sobornos de US$31M a Alejandro Toledo para favorecer a Odebrecht en la licitación de la carretera Interoceánica Sur.", year: "2016-presente", monto: "US$31M" },
  { id: "metro_lima", label: "Caso Metro de Lima", desc: "Colusión para favorecer a Odebrecht en la licitación de la Línea 1 del Metro de Lima durante el segundo gobierno de Alan García.", year: "2017-presente" },
  { id: "cuellos_blancos", label: "Cuellos Blancos del Puerto", desc: "Red de corrupción en el Poder Judicial y Ministerio Público. Negociación de puestos, rebajas de penas y tráfico de influencias.", year: "2018-presente" },
  { id: "vladivideos", label: "Vladivideos", desc: "Sistema de corrupción y espionaje dirigido por Vladimiro Montesinos con videos que mostraban sobornos a políticos, jueces y medios.", year: "2000-2001" },
  { id: "ecoteva", label: "Caso Ecoteva", desc: "Lavado de activos a través de una offshore costarricense vinculada a Alejandro Toledo y su suegra Eva Fernenbug.", year: "2013-presente" },
  { id: "club_construccion", label: "Club de la Construcción", desc: "Cártel de empresas constructoras que se repartían obras públicas pagando coimas a funcionarios del MTC.", year: "2017-presente" },
  { id: "golpe_2022", label: "Golpe de Estado 2022", desc: "Pedro Castillo intentó disolver el Congreso, instaurar gobierno de emergencia y convocar Constituyente. Fue detenido horas después.", year: "Dic 2022" },
  { id: "masacres_protestas", label: "Masacres durante protestas", desc: "Represión policial y militar durante protestas post-golpe. Masacres de Ayacucho y Juliaca. Más de 60 muertos civiles.", year: "Dic 2022 - Feb 2023" },
  { id: "caso_rolex", label: "Caso Rolex", desc: "Investigación a Dina Boluarte por no declarar relojes Rolex y joyas recibidas del gobernador de Ayacucho Wilfredo Oscorima.", year: "2024-presente" },
  { id: "caso_yang", label: "Caso Zhihua Yang", desc: "Reuniones no declaradas entre el presidente del Congreso José Jerí y el empresario chino Zhihua Yang, bajo escrutinio gubernamental.", year: "Feb 2026" },
  { id: "caso_humala", label: "Caso Humala-Heredia", desc: "Aportes ilícitos de Odebrecht y del gobierno venezolano a las campañas de Ollanta Humala. US$3M de Odebrecht.", year: "2017-presente", monto: "US$3M+" },
];

// --- POLÍTICOS (yellow nodes) ---
const politicians = [
  // Expresidentes
  { id: "toledo", label: "Alejandro Toledo", role: "Expresidente (2001-2006)", size: 18, tags: ["Condenado", "Preso en Barbadillo"] },
  { id: "alan_garcia", label: "Alan García †", role: "Expresidente (2006-2011)", size: 17, tags: ["Fallecido", "Se suicidó antes de detención"] },
  { id: "humala", label: "Ollanta Humala", role: "Expresidente (2011-2016)", size: 16, tags: ["En juicio oral"] },
  { id: "ppk", label: "Pedro Pablo Kuczynski", role: "Expresidente (2016-2018)", size: 15, tags: ["Investigado", "Arresto domiciliario"] },
  { id: "vizcarra", label: "Martín Vizcarra", role: "Expresidente (2018-2020)", size: 14, tags: ["Inhabilitado"] },
  { id: "castillo", label: "Pedro Castillo", role: "Expresidente (2021-2022)", size: 16, tags: ["Preso en Barbadillo", "Golpe de Estado"] },
  { id: "boluarte", label: "Dina Boluarte", role: "Expresidenta (2022-2026)", size: 16, tags: ["Investigada", "Masacres", "Caso Rolex"] },
  { id: "jeri", label: "José Jerí", role: "Expresidente (2026)", size: 12, tags: ["Censurado"] },
  { id: "balcazar", label: "José M. Balcázar", role: "Presidente actual (2026)", size: 12, tags: ["Presidente de transición"] },
  { id: "a_fujimori", label: "Alberto Fujimori †", role: "Expresidente (1990-2000)", size: 20, tags: ["Fallecido", "Fue condenado 25 años", "Indultado"] },

  // Candidatos 2026
  { id: "keiko", label: "Keiko Fujimori", role: "Candidata 2026 · Fuerza Popular", size: 20, party: "Fuerza Popular", tags: ["Investigada Lava Jato", "Caso Cócteles"] },
  { id: "lopez_aliaga", label: "Rafael López Aliaga", role: "Candidato 2026 · Renovación Popular", size: 18, party: "Renovación Popular", tags: ["Alcalde de Lima"] },
  { id: "lopez_chau", label: "Alfonso López Chau", role: "Candidato 2026 · Ahora Nación", size: 14, party: "Ahora Nación" },
  { id: "atencio", label: "Ronald Atencio Sotomayor", role: "Candidato 2026 · Alianza Electoral Venceremos", size: 11, party: "Alianza Electoral Venceremos" },
  { id: "acuña", label: "César Acuña Peralta", role: "Candidato 2026 · Alianza para el Progreso", size: 16, party: "Alianza para el Progreso", tags: ["157 vehículos declarados", "Sentencia civil alimentos", "Controla Universidad César Vallejo"] },
  { id: "williams", label: "José Daniel Williams Zapata", role: "Candidato 2026 · Avanza País", size: 13, party: "Avanza País" },
  { id: "paz_de_la_barra", label: "Álvaro Paz de la Barra", role: "Candidato 2026 · Fe en el Perú", size: 12, party: "Fe en el Perú" },
  { id: "molinelli", label: "Fiorella Molinelli Aristondo", role: "Candidata 2026 · Fuerza y Libertad", size: 12, party: "Fuerza y Libertad", tags: ["Ministra Desarrollo Social 2017-2018", "Presidenta EsSalud 2018-2021"] },
  { id: "sanchez_palomino", label: "Roberto Sánchez Palomino", role: "Candidato 2026 · Juntos por el Perú", size: 11, party: "Juntos por el Perú" },
  { id: "belaunde_llosa", label: "Rafael Belaunde Llosa", role: "Candidato 2026 · Libertad Popular", size: 12, party: "Libertad Popular" },
  { id: "valderrama", label: "Pitter Valderrama Peña", role: "Candidato 2026 · Partido Aprista Peruano", size: 13, party: "Partido Aprista Peruano" },
  { id: "belmont", label: "Ricardo Belmont Cassinelli", role: "Candidato 2026 · Partido Cívico Obras", size: 12, party: "Partido Cívico Obras" },
  { id: "nieto_montesinos", label: "Jorge Nieto Montesinos", role: "Candidato 2026 · Partido del Buen Gobierno", size: 12, party: "Partido del Buen Gobierno" },
  { id: "carrasco", label: "Charlie Carrasco Salazar", role: "Candidato 2026 · Partido Demócrata Unido Perú", size: 11, party: "Partido Demócrata Unido Perú" },
  { id: "gonzales_castillo", label: "Alex Gonzales Castillo", role: "Candidato 2026 · Partido Demócrata Verde", size: 11, party: "Partido Demócrata Verde" },
  { id: "masse", label: "Armando Masse Fernández", role: "Candidato 2026 · Partido Democrático Federal", size: 11, party: "Partido Democrático Federal" },
  { id: "forsyth", label: "George Forsyth", role: "Candidato 2026 · Somos Perú", size: 13, party: "Somos Perú" },
  { id: "olivera", label: "Luis Fernando Olivera Vega", role: "Candidato 2026 · Frente de la Esperanza 2021", size: 12, party: "Frente de la Esperanza 2021" },
  { id: "guevara", label: "Mesías Guevara Amasifuen", role: "Candidato 2026 · Partido Morado", size: 12, party: "Partido Morado" },
  { id: "alvarez_loayza", label: "Carlos Álvarez Loayza", role: "Candidato 2026 · País para Todos", size: 11, party: "País para Todos" },
  { id: "caller", label: "Herbert Caller Gutiérrez", role: "Candidato 2026 · Partido Patriótico del Perú", size: 11, party: "Partido Patriótico del Perú" },
  { id: "lescano", label: "Yonhy Lescano Ancieta", role: "Candidato 2026 · Cooperación Popular", size: 13, party: "Cooperación Popular" },
  { id: "bermejo", label: "Guillermo Bermejo", role: "Candidato 2026 · Voces del Pueblo", size: 11, party: "Voces del Pueblo", tags: ["Sentencia terrorismo"] },
  { id: "cerron", label: "Vladimir Cerrón", role: "Candidato 2026 · Perú Libre", size: 15, party: "Perú Libre", tags: ["Candidato presidencial", "Sentencias anuladas/absuelto 2024-25", "Colusión · Negociación incompatible"] },
  { id: "grozo", label: "Wolfgang Grozo Costa", role: "Candidato 2026 · Integridad Democrática", size: 13, party: "Integridad Democrática" },
  { id: "diez_canseco", label: "Francisco Diez-Canseco Távara", role: "Candidato 2026 · Perú Acción", size: 12, party: "Perú Acción" },
  { id: "vizcarra_mario", label: "Mario Vizcarra Cornejo", role: "Candidato 2026 · Perú Primero", size: 12, party: "Perú Primero" },
  { id: "chirinos", label: "Walter Chirinos Purizaga", role: "Candidato 2026 · Partido PRIN", size: 11, party: "Partido PRIN" },
  { id: "espa", label: "Alfonso Espá y Garcés-Álvear", role: "Candidato 2026 · Partido SICREO", size: 11, party: "Partido SICREO" },
  { id: "jaico", label: "Carlos Jaico Carranza", role: "Candidato 2026 · Perú Moderno", size: 12, party: "Perú Moderno" },
  { id: "luna_galvez", label: "José León Luna Gálvez", role: "Candidato 2026 · Podemos Perú", size: 13, party: "Podemos Perú" },
  { id: "perez_tello", label: "María Soledad Pérez Tello", role: "Candidata 2026 · Primero la Gente", size: 12, party: "Primero la Gente" },
  { id: "jaimes", label: "Paul Jaimes Blanco", role: "Candidato 2026 · Progresemos", size: 11, party: "Progresemos" },
  { id: "ortiz_villano", label: "Antonio Ortiz Villano", role: "Candidato 2026 · Salvemos al Perú", size: 11, party: "Salvemos al Perú" },
  { id: "fernandez_bazan", label: "Rosario Fernández Bazán", role: "Candidata 2026 · Un Camino Diferente", size: 12, party: "Un Camino Diferente" },
  { id: "chiabra", label: "Roberto Chiabra León", role: "Candidato 2026 · Unidad Nacional", size: 13, party: "Unidad Nacional" },

  // Vicepresidentes y fórmulas 2026
  { id: "galarreta", label: "Luis Galarreta Velarde", role: "1er VP 2026 · Fuerza Popular", size: 11, party: "Fuerza Popular", tags: ["Secretario General FP 2020-2024"] },
  { id: "torres_miguel", label: "Miguel Torres Morales", role: "2do VP 2026 · Fuerza Popular", size: 10, party: "Fuerza Popular" },
  { id: "violeta", label: "Gilbert Violeta López", role: "1er VP 2026 · Fuerza y Libertad", size: 10, party: "Fuerza y Libertad", tags: ["Fundador Partido Contigo 2011-2021"] },
  { id: "altuve", label: "Fernan Altuve-Febres", role: "1er VP 2026 · Avanza País", size: 11, party: "Avanza País", tags: ["Congresista Perú 2000 (era Fujimori)"] },
  { id: "tumi", label: "Jessica Tumi Rivas", role: "1er VP 2026 · Alianza para el Progreso", size: 10, party: "Alianza para el Progreso" },
  { id: "soto_alejandro", label: "Alejandro Soto Reyes", role: "2do VP 2026 · Alianza para el Progreso", size: 11, party: "Alianza para el Progreso", tags: ["3 sentencias difamación (suspendidas)"] },
  { id: "villanueva_luis", label: "Luis Villanueva Carbajal", role: "1er VP 2026 · Ahora Nación", size: 10, party: "Ahora Nación", tags: ["Director EsSalud 2018-2023"] },
  { id: "buendia", label: "Ruth Buendía Mestoquiari", role: "2da VP 2026 · Ahora Nación", size: 10, party: "Ahora Nación", tags: ["Dirigente AIDESEP", "Derechos indígenas"] },
  { id: "rivera_elena", label: "Elena Rivera Huaman", role: "1er VP 2026 · Alianza Electoral Venceremos", size: 10, party: "Alianza Electoral Venceremos" },
  { id: "quintanilla_a", label: "Alberto Quintanilla Chacón", role: "2do VP 2026 · Alianza Electoral Venceremos", size: 10, party: "Alianza Electoral Venceremos", tags: ["Ex-Frente Amplio", "6 títulos universitarios"] },

  // Actores judiciales / otros
  { id: "montesinos", label: "Vladimiro Montesinos", role: "Exasesor de inteligencia", size: 18, tags: ["Preso", "Base Naval Callao"] },
  { id: "hinostroza", label: "César Hinostroza", role: "Exjuez supremo", size: 13, tags: ["España", "Extradición pendiente"] },
  { id: "chavarry", label: "Pedro Chávarry", role: "Exfiscal de la Nación", size: 12, tags: ["Condenado", "Destituido"] },
  { id: "walter_rios", label: "Walter Ríos", role: "Expresidente Corte del Callao", size: 11, tags: ["Preso"] },
  { id: "nadine", label: "Nadine Heredia", role: "Exprimera dama", size: 12, tags: ["En juicio oral"] },
  { id: "yoshiyama", label: "Jaime Yoshiyama", role: "Exsecretario gral FP", size: 11, tags: ["Investigado lavado"] },
  { id: "villarán", label: "Susana Villarán", role: "Exalcaldesa de Lima", size: 12, tags: ["Investigada lavado"] },
  { id: "felix_moreno", label: "Félix Moreno", role: "Exgobernador del Callao", size: 10, tags: ["Preso"] },
  { id: "benavides", label: "Patricia Benavides", role: "Exfiscal de la Nación", size: 11, tags: ["Suspendida", "Investigada"] },
  { id: "oscorima", label: "Wilfredo Oscorima", role: "Gobernador de Ayacucho", size: 10, tags: ["Investigado"] },
];

// --- LINKS ---
const links = [
  // LAVA JATO connections
  { source: "toledo", target: "lava_jato", type: "condenado", detail: "Condenado 20 años. US$31M en coimas." },
  { source: "toledo", target: "interoceanica", type: "condenado", detail: "Favoreció a Odebrecht en licitación." },
  { source: "toledo", target: "ecoteva", type: "investigado", detail: "Lavado vía offshore en Costa Rica." },
  { source: "alan_garcia", target: "lava_jato", type: "investigado", detail: "Investigado. Se suicidó antes de detención." },
  { source: "alan_garcia", target: "metro_lima", type: "investigado", detail: "Presunta colusión en licitación Metro L1." },
  { source: "humala", target: "lava_jato", type: "investigado", detail: "En juicio oral por aportes ilícitos." },
  { source: "humala", target: "caso_humala", type: "investigado", detail: "US$3M de Odebrecht para campaña 2011." },
  { source: "nadine", target: "caso_humala", type: "investigado", detail: "Coprocesada con Humala." },
  { source: "humala", target: "nadine", type: "familiar", detail: "Esposos" },
  { source: "ppk", target: "lava_jato", type: "investigado", detail: "Pagos de Odebrecht a Westfield Capital." },
  { source: "keiko", target: "cocteles", type: "investigado", detail: "US$1.2M Odebrecht + US$3.65M Credicorp." },
  { source: "keiko", target: "lava_jato", type: "financiamiento", detail: "Aportes ilícitos a campaña 2011." },
  { source: "yoshiyama", target: "cocteles", type: "investigado", detail: "Receptor de US$1M de Odebrecht para FP." },
  { source: "villarán", target: "lava_jato", type: "investigado", detail: "US$3M de Odebrecht/OAS para campaña No Revocatoria." },
  { source: "felix_moreno", target: "lava_jato", type: "condenado", detail: "Exgobernador Callao. Preso." },

  // CUELLOS BLANCOS
  { source: "hinostroza", target: "cuellos_blancos", type: "investigado", detail: "Presunto cabecilla. Prófugo en España." },
  { source: "chavarry", target: "cuellos_blancos", type: "condenado", detail: "Condenado por encubrimiento y obstrucción." },
  { source: "walter_rios", target: "cuellos_blancos", type: "investigado", detail: "Presunto cabecilla. Preso desde 2018." },
  { source: "chavarry", target: "lava_jato", type: "obstruccion", detail: "Removió fiscales Vela y Pérez del caso." },
  { source: "benavides", target: "cuellos_blancos", type: "vinculo_politico", detail: "Investigada por presunta red de corrupción en Fiscalía." },

  // VLADIVIDEOS
  { source: "a_fujimori", target: "vladivideos", type: "responsable", detail: "Jefe de Estado durante el sistema de corrupción." },
  { source: "montesinos", target: "vladivideos", type: "responsable", detail: "Operador del sistema. Grababa los sobornos." },
  { source: "a_fujimori", target: "montesinos", type: "vinculo_politico", detail: "Presidente – Asesor de inteligencia." },
  { source: "keiko", target: "a_fujimori", type: "familiar", detail: "Hija. Hereda base política." },

  // GOLPE Y PROTESTAS
  { source: "castillo", target: "golpe_2022", type: "responsable", detail: "Intentó disolver Congreso. Detenido." },
  { source: "cerron", target: "castillo", type: "vinculo_politico", detail: "Líder del partido que llevó a Castillo al poder." },
  { source: "bermejo", target: "castillo", type: "vinculo_politico", detail: "Congresista de su entorno cercano." },
  { source: "boluarte", target: "castillo", type: "sucesion", detail: "Vicepresidenta. Asumió tras golpe." },
  { source: "boluarte", target: "masacres_protestas", type: "responsable", detail: "Presidenta durante represión. 60+ muertos." },
  { source: "boluarte", target: "caso_rolex", type: "investigado", detail: "Relojes no declarados de Oscorima." },
  { source: "oscorima", target: "caso_rolex", type: "investigado", detail: "Entregó Rolex y joyas a Boluarte." },

  // CASO YANG / SUCESIÓN 2026
  { source: "jeri", target: "caso_yang", type: "investigado", detail: "Reuniones no declaradas con Yang." },
  { source: "jeri", target: "boluarte", type: "sucesion", detail: "Sucedió a Boluarte como presidente." },
  { source: "balcazar", target: "jeri", type: "sucesion", detail: "Sucedió a Jerí tras censura." },

  // CLUB DE LA CONSTRUCCIÓN
  { source: "club_construccion", target: "lava_jato", type: "vinculo_politico", detail: "Cártel conectado al esquema Odebrecht." },

  // Cross-links políticos
  { source: "cerron", target: "bermejo", type: "vinculo_politico", detail: "Ambos de Perú Libre, luego separados." },
  { source: "lopez_aliaga", target: "keiko", type: "vinculo_politico", detail: "Bloque conservador en Congreso (FP + RP)." },

  // FÓRMULAS 2026 — Fuerza Popular
  { source: "galarreta", target: "keiko", type: "vinculo_politico", detail: "1er Vicepresidente. Secretario General FP 2020-2024." },
  { source: "torres_miguel", target: "keiko", type: "vinculo_politico", detail: "2do Vicepresidente Fuerza Popular." },

  // FÓRMULAS 2026 — Fuerza y Libertad
  { source: "violeta", target: "molinelli", type: "vinculo_politico", detail: "1er Vicepresidente. Fundador Partido Contigo." },

  // FÓRMULAS 2026 — Avanza País
  { source: "altuve", target: "williams", type: "vinculo_politico", detail: "1er Vicepresidente Avanza País." },
  { source: "altuve", target: "vladivideos", type: "vinculo_politico", detail: "Congresista Perú 2000 durante era Fujimori-Vladivideos." },

  // FÓRMULAS 2026 — Alianza para el Progreso
  { source: "tumi", target: "acuña", type: "vinculo_politico", detail: "1er Vicepresidenta Alianza para el Progreso." },
  { source: "soto_alejandro", target: "acuña", type: "vinculo_politico", detail: "2do Vicepresidente. Tres sentencias por difamación." },

  // FÓRMULAS 2026 — Ahora Nación
  { source: "villanueva_luis", target: "lopez_chau", type: "vinculo_politico", detail: "1er Vicepresidente. Ex-director EsSalud." },
  { source: "buendia", target: "lopez_chau", type: "vinculo_politico", detail: "2da Vicepresidenta. Líder indígena AIDESEP." },

  // FÓRMULAS 2026 — Alianza Electoral Venceremos
  { source: "rivera_elena", target: "atencio", type: "vinculo_politico", detail: "1er Vicepresidenta Alianza Electoral Venceremos." },
  { source: "quintanilla_a", target: "atencio", type: "vinculo_politico", detail: "2do Vicepresidente. Ex-Frente Amplio." },

  // Conexiones históricas adicionales
  { source: "molinelli", target: "ppk", type: "vinculo_politico", detail: "Ministra de Desarrollo Social en gobierno de PPK (2017-2018)." },
  { source: "villanueva_luis", target: "vizcarra", type: "vinculo_politico", detail: "Director EsSalud durante gobierno de Vizcarra (2018-2021)." },
];

// ============ BUILD ============

const allNodes = [
  ...cases.map(c => ({ ...c, nodeType: "caso", size: c.size || 16 })),
  ...politicians.map(p => ({ ...p, nodeType: "politico", size: p.size || 12 }))
];

let activeTypes = new Set(Object.keys(LINK_TYPES));
let activePartyFilter = new Set();
let selectedId = null;
let sim, linkEls, nodeEls;

function init() {
  // Build party chips
  const parties = [...new Set(politicians.filter(p => p.party).map(p => p.party))].sort();
  const chipWrap = document.getElementById("party-chips");
  parties.forEach(party => {
    const chip = document.createElement("span");
    chip.className = "party-chip";
    chip.textContent = party;
    chip.dataset.party = party;
    chip.onclick = () => toggleParty(chip, party);
    chipWrap.appendChild(chip);
  });

  // Build link type filters
  const fc = document.getElementById("filter-container");
  Object.entries(LINK_TYPES).forEach(([key, val]) => {
    const chip = document.createElement("span");
    chip.className = "link-chip active";
    chip.dataset.type = key;
    chip.innerHTML = \`<span class="lc-dot" style="background:\${val.color}"></span>\${val.label}\`;
    chip.onclick = () => toggleType(chip, key);
    fc.appendChild(chip);
  });

  // Stats
  document.getElementById("s-pol").textContent = politicians.length;
  document.getElementById("s-cas").textContent = cases.length;
  document.getElementById("s-con").textContent = links.length;
  document.getElementById("s-era").textContent = "2000–2026";

  // SVG
  const svg = d3.select("#canvas");
  const W = svg.node().clientWidth;
  const H = svg.node().clientHeight;

  const defs = svg.append("defs");
  const glow = defs.append("filter").attr("id","glow");
  glow.append("feGaussianBlur").attr("stdDeviation","4").attr("result","b");
  const m = glow.append("feMerge");
  m.append("feMergeNode").attr("in","b");
  m.append("feMergeNode").attr("in","SourceGraphic");

  const g = svg.append("g");
  const zoom = d3.zoom().scaleExtent([0.2,6]).on("zoom", e => g.attr("transform", e.transform));
  svg.call(zoom);
  svg.call(zoom.transform, d3.zoomIdentity.translate(W/2, H/2).scale(0.75));

  // Links
  linkEls = g.append("g").selectAll("line")
    .data(links).join("line")
    .attr("class","link-line")
    .attr("stroke", d => LINK_TYPES[d.type]?.color || "#555")
    .attr("stroke-width", d => d.type==="condenado" || d.type==="responsable" ? 2.5 : 1.5)
    .attr("stroke-dasharray", d => LINK_TYPES[d.type]?.dash || "none");

  // Nodes
  nodeEls = g.append("g").selectAll("g")
    .data(allNodes).join("g")
    .attr("class","node-g")
    .call(d3.drag()
      .on("start",(e,d)=>{if(!e.active)sim.alphaTarget(0.3).restart();d.fx=d.x;d.fy=d.y;})
      .on("drag",(e,d)=>{d.fx=e.x;d.fy=e.y;})
      .on("end",(e,d)=>{if(!e.active)sim.alphaTarget(0);d.fx=null;d.fy=null;})
    );

  // Outer circle
  nodeEls.append("circle").attr("class","outer")
    .attr("r", d => d.size)
    .attr("fill", d => d.nodeType==="politico" ? "rgba(255,210,63,0.1)" : "rgba(60,60,60,0.4)")
    .attr("fill-opacity", d => d.nodeType==="politico" ? 0.15 : 0.6)
    .attr("stroke", d => d.nodeType==="politico" ? "#ffd23f" : "#555")
    .attr("stroke-width", d => d.nodeType==="politico" ? 1.5 : 2)
    .attr("filter","url(#glow)");

  // Inner dot
  nodeEls.append("circle").attr("class","inner")
    .attr("r", d => d.nodeType==="politico" ? Math.max(2.5, d.size*0.25) : 0)
    .attr("fill", d => d.nodeType==="politico" ? "#ffd23f" : "none");

  // Case icon (small square for cases)
  nodeEls.filter(d => d.nodeType==="caso").append("rect")
    .attr("class","inner")
    .attr("x",-3).attr("y",-3).attr("width",6).attr("height",6)
    .attr("rx",1)
    .attr("fill","#666");

  // Labels
  nodeEls.append("text")
    .attr("y", d => d.size + 13)
    .text(d => d.label);

  // Interactions
  nodeEls.on("mouseover", (e,d) => { if(!selectedId) highlight(d.id); })
    .on("mouseout", () => { if(!selectedId) applyPartyFilter(); })
    .on("click", (e,d) => { e.stopPropagation(); selectedId = d.id; highlight(d.id); showPanel(d); });

  svg.on("click", () => { selectedId = null; applyPartyFilter(); closePanel(); });

  // Simulation
  sim = d3.forceSimulation(allNodes)
    .force("link", d3.forceLink(links).id(d=>d.id).distance(d => {
      if(d.type==="familiar" || d.type==="sucesion") return 55;
      return 90;
    }).strength(0.5))
    .force("charge", d3.forceManyBody().strength(d => d.nodeType==="caso" ? -400 : -250))
    .force("center", d3.forceCenter(0,0).strength(0.05))
    .force("collision", d3.forceCollide().radius(d => d.size + 16))
    .force("x", d3.forceX(0).strength(0.02))
    .force("y", d3.forceY(0).strength(0.02))
    .on("tick", () => {
      linkEls.attr("x1",d=>d.source.x).attr("y1",d=>d.source.y)
        .attr("x2",d=>d.target.x).attr("y2",d=>d.target.y);
      nodeEls.attr("transform",d=>\`translate(\${d.x},\${d.y})\`);
    });

  // Search
  document.getElementById("search").addEventListener("input", function(){
    const q = this.value.toLowerCase().trim();
    if(!q){ selectedId=null; resetHL(); closePanel(); return; }
    const match = allNodes.find(n => n.label.toLowerCase().includes(q));
    if(match){ selectedId=match.id; highlight(match.id); showPanel(match); }
  });
}

function highlight(id) {
  const conn = new Set([id]);
  links.forEach(l => {
    const s = typeof l.source==="object"?l.source.id:l.source;
    const t = typeof l.target==="object"?l.target.id:l.target;
    if(s===id) conn.add(t);
    if(t===id) conn.add(s);
  });

  linkEls.classed("hl", l => {
    const s=typeof l.source==="object"?l.source.id:l.source;
    const t=typeof l.target==="object"?l.target.id:l.target;
    return s===id||t===id;
  }).classed("dim", l => {
    const s=typeof l.source==="object"?l.source.id:l.source;
    const t=typeof l.target==="object"?l.target.id:l.target;
    return s!==id&&t!==id;
  });

  nodeEls.classed("hl", d=>d.id===id).classed("dim", d=>!conn.has(d.id));
}

function resetHL() {
  linkEls.classed("hl",false).classed("dim",false);
  nodeEls.classed("hl",false).classed("dim",false);
}

function applyPartyFilter() {
  linkEls.classed("hl",false).classed("dim",false);
  nodeEls.classed("hl",false).classed("dim",false);
  if(activePartyFilter.size === 0) return;

  const visibleIds = new Set();
  allNodes.forEach(n => {
    if(n.nodeType === "politico" && (!n.party || activePartyFilter.has(n.party))) {
      visibleIds.add(n.id);
    }
  });
  // Include cases connected to visible politicians
  links.forEach(l => {
    const s = typeof l.source==="object"?l.source.id:l.source;
    const t = typeof l.target==="object"?l.target.id:l.target;
    if(visibleIds.has(s)) visibleIds.add(t);
    if(visibleIds.has(t)) visibleIds.add(s);
  });

  nodeEls.classed("dim", d => !visibleIds.has(d.id));
  linkEls.classed("dim", l => {
    const s=typeof l.source==="object"?l.source.id:l.source;
    const t=typeof l.target==="object"?l.target.id:l.target;
    return !visibleIds.has(s)||!visibleIds.has(t);
  });
}

function toggleParty(chip, party) {
  if(activePartyFilter.has(party)) {
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
  document.querySelectorAll(".party-chip").forEach(c => c.classList.remove("active"));
  selectedId = null;
  closePanel();
  applyPartyFilter();
}

function showPanel(d) {
  const p = document.getElementById("panel");
  const isCase = d.nodeType==="caso";

  let html = \`<div class="node-type-badge \${isCase?"badge-caso":"badge-politico"}">\${isCase?"Caso":"Político"}</div>\`;
  html += \`<h2>\${d.label}</h2>\`;
  html += \`<div class="meta">\${isCase ? (d.year||"") : (d.role||"")}\${d.monto ? " · "+d.monto : ""}</div>\`;

  if(d.desc) html += \`<p style="font-size:12px;color:var(--text-dim);line-height:1.6;margin-bottom:12px;">\${d.desc}</p>\`;

  if(d.tags && d.tags.length) {
    html += \`<div class="info-tags">\`;
    d.tags.forEach(t => {
      let cls = "tag-blue";
      if(/preso|condenad|prófugo|golpe|masacre|sentencia/i.test(t)) cls = "tag-red";
      else if(/investigad|suspendid|censurad|inhabilitad/i.test(t)) cls = "tag-orange";
      else if(/fallecid|indultad/i.test(t)) cls = "tag-blue";
      html += \`<span class="tag \${cls}">\${t}</span>\`;
    });
    html += \`</div>\`;
  }

  // Connections
  const conns = links.filter(l => {
    const s=typeof l.source==="object"?l.source.id:l.source;
    const t=typeof l.target==="object"?l.target.id:l.target;
    return s===d.id||t===d.id;
  });

  if(conns.length) {
    html += \`<div class="info-section"><h4>\${conns.length} Conexiones</h4>\`;
    conns.forEach(l => {
      const s=typeof l.source==="object"?l.source.id:l.source;
      const t=typeof l.target==="object"?l.target.id:l.target;
      const otherId = s===d.id?t:s;
      const other = allNodes.find(n=>n.id===otherId);
      if(!other) return;
      const lt = LINK_TYPES[l.type];
      html += \`<div class="conn-row" onclick="navTo('\${otherId}')">
        <div class="conn-dot" style="background:\${lt?.color||'#555'}"></div>
        <span class="conn-name">\${other.label}</span>
        <span class="conn-detail">\${l.detail||lt?.label||""}</span>
      </div>\`;
    });
    html += \`</div>\`;
  }

  document.getElementById("panel-content").innerHTML = html;
  p.classList.add("open");
}

function navTo(id) {
  selectedId = id;
  const n = allNodes.find(x=>x.id===id);
  if(n){ highlight(id); showPanel(n); }
}

function closePanel() {
  document.getElementById("panel").classList.remove("open");
}

function toggleType(chip, type) {
  if(activeTypes.has(type)) {
    activeTypes.delete(type);
    chip.classList.remove("active");
    chip.classList.add("inactive");
  } else {
    activeTypes.add(type);
    chip.classList.add("active");
    chip.classList.remove("inactive");
  }
  linkEls.attr("display", d => activeTypes.has(d.type) ? "block" : "none");
}

init();
<\/script>
${LIVE_RELOAD}
</body>
</html>`;

const server = Bun.serve({
  port: 3000,
  fetch(req) {
    const url = new URL(req.url);

    if (url.pathname === "/reload") {
      let ctrl: ReadableStreamDefaultController;
      const stream = new ReadableStream({
        start(c) { ctrl = c; clients.add(c); },
        cancel() { clients.delete(ctrl); },
      });
      return new Response(stream, {
        headers: {
          "Content-Type": "text/event-stream",
          "Cache-Control": "no-cache",
          "Connection": "keep-alive",
        },
      });
    }

    if (url.pathname === "/graph") {
      return new Response(graphHtml, {
        headers: { "Content-Type": "text/html; charset=utf-8" },
      });
    }

    return new Response(landingHtml, {
      headers: { "Content-Type": "text/html; charset=utf-8" },
    });
  },
});

console.log(`Landing → http://localhost:${server.port}`);
console.log(`Grafo   → http://localhost:${server.port}/graph`);
