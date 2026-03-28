import { readdir, readFile } from "fs/promises";
import { join } from "path";
import Groq from "groq-sdk";
import { ElevenLabsClient } from "elevenlabs";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
const elevenlabs = new ElevenLabsClient({ apiKey: process.env.ELEVENLABS_API_KEY });

// --- RAG: load brain docs on startup ---
type Doc = { id: string; content: string };
let brainDocs: Doc[] = [];

async function loadBrainDocs() {
  const brainDir = join(import.meta.dir, "brain");
  const files = (await readdir(brainDir)).filter((f) => f.endsWith(".md"));
  brainDocs = await Promise.all(
    files.map(async (f) => ({
      id: f,
      content: await readFile(join(brainDir, f), "utf-8"),
    }))
  );
  console.log(`Loaded ${brainDocs.length} brain docs`);
}

function searchDocs(query: string, topK = 5): string {
  const terms = query.toLowerCase().split(/\s+/).filter((t) => t.length > 3);
  const scored = brainDocs.map((doc) => {
    const lower = doc.content.toLowerCase();
    const score = terms.reduce((s, t) => s + (lower.split(t).length - 1), 0);
    return { doc, score };
  });
  return scored
    .sort((a, b) => b.score - a.score)
    .slice(0, topK)
    .filter((r) => r.score > 0)
    .map((r) => r.doc.content.slice(0, 800))
    .join("\n\n---\n\n");
}

// --- Presentation context (loaded from file) ---
const contextPath = join(import.meta.dir, "maria-context.md");
const PRESENTATION_CONTEXT = await readFile(contextPath, "utf-8");

// --- Chat endpoint ---
async function handleChat(body: { message: string; voice?: boolean }): Promise<Response> {
  const { message, voice = true } = body;
  const context = searchDocs(message);

  const userPrompt = context
    ? `Contexto de documentos políticos peruanos:\n${context}\n\nPregunta/comentario: ${message}`
    : message;

  const response = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    max_tokens: 300,
    messages: [
      { role: "system", content: PRESENTATION_CONTEXT },
      { role: "user", content: userPrompt },
    ],
  });

  const text = response.choices[0]?.message?.content ?? "";

  if (!voice || !process.env.ELEVENLABS_API_KEY) {
    return Response.json({ text });
  }

  // ElevenLabs TTS
  try {
    const audioStream = await elevenlabs.textToSpeech.convert("cgSgspJ2msm6clMCkdW9", {
      text,
      model_id: "eleven_multilingual_v2",
      voice_settings: { stability: 0.5, similarity_boost: 0.8 },
    });

    const chunks: Buffer[] = [];
    for await (const chunk of audioStream) {
      chunks.push(Buffer.from(chunk));
    }
    const audioBuffer = Buffer.concat(chunks);
    const audioBase64 = audioBuffer.toString("base64");

    return Response.json({ text, audio: audioBase64 });
  } catch (e) {
    console.error("ElevenLabs error:", e);
    return Response.json({ text });
  }
}

// --- Serve HTML UI ---
const UI_HTML = `<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>María — AI Co-Presentadora</title>
<style>
  @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;700;800&family=DM+Sans:wght@300;400;500;600&display=swap');
  *{margin:0;padding:0;box-sizing:border-box}
  :root{
    --bg:#08080c;--surface:rgba(255,255,255,0.05);--border:rgba(255,255,255,0.1);
    --text:#f0eef5;--dim:#9994a8;--accent:#ff6b9d;--yellow:#ffd23f;
  }
  body{
    font-family:'DM Sans',sans-serif;background:var(--bg);color:var(--text);
    min-height:100vh;display:flex;flex-direction:column;align-items:center;
    justify-content:center;padding:40px 24px;
  }
  .badge{
    font-family:'JetBrains Mono',monospace;font-size:10px;font-weight:700;
    letter-spacing:3px;text-transform:uppercase;color:var(--accent);margin-bottom:24px;
  }
  h1{
    font-family:'JetBrains Mono',monospace;font-size:clamp(28px,5vw,52px);
    font-weight:800;letter-spacing:-1px;margin-bottom:8px;text-align:center;
  }
  h1 span{color:var(--accent);}
  .subtitle{font-size:14px;color:var(--dim);margin-bottom:48px;text-align:center;}
  .orb{
    width:140px;height:140px;border-radius:50%;
    background:radial-gradient(circle at 35% 35%, var(--accent), #8b00ff 60%, #08080c);
    box-shadow:0 0 60px rgba(255,107,157,0.4);
    margin-bottom:40px;cursor:pointer;
    display:flex;align-items:center;justify-content:center;
    transition:transform 0.2s, box-shadow 0.2s;
    position:relative;
  }
  .orb:hover{transform:scale(1.05);box-shadow:0 0 80px rgba(255,107,157,0.6);}
  .orb.listening{
    animation:pulse 1.2s ease-in-out infinite;
    box-shadow:0 0 80px rgba(255,107,157,0.8);
  }
  .orb.speaking{
    animation:breathe 0.8s ease-in-out infinite;
    box-shadow:0 0 100px rgba(255,107,157,0.9);
  }
  @keyframes pulse{0%,100%{transform:scale(1)}50%{transform:scale(1.08)}}
  @keyframes breathe{0%,100%{transform:scale(1.02)}50%{transform:scale(0.96)}}
  .orb-icon{font-size:48px;}
  .status{
    font-family:'JetBrains Mono',monospace;font-size:12px;color:var(--dim);
    margin-bottom:32px;height:20px;text-align:center;letter-spacing:1px;
  }
  .status.active{color:var(--accent);}
  .transcript{
    background:var(--surface);border:1px solid var(--border);border-radius:12px;
    padding:20px 24px;width:100%;max-width:600px;margin-bottom:16px;
    min-height:80px;font-size:14px;line-height:1.7;color:var(--text);
  }
  .transcript.you{border-color:rgba(255,210,63,0.3);}
  .transcript.maria{border-color:rgba(255,107,157,0.3);}
  .label{
    font-family:'JetBrains Mono',monospace;font-size:10px;font-weight:700;
    letter-spacing:2px;text-transform:uppercase;margin-bottom:8px;
  }
  .label.you{color:var(--yellow);}
  .label.maria{color:var(--accent);}
  .hint{font-size:12px;color:var(--dim);margin-top:32px;text-align:center;}
  kbd{
    background:var(--surface);border:1px solid var(--border);border-radius:4px;
    padding:2px 8px;font-family:'JetBrains Mono',monospace;font-size:11px;
  }
</style>
</head>
<body>
  <div class="badge">She.ships × PUCP</div>
  <h1>Hola, soy <span>María</span></h1>
  <p class="subtitle">Tu co-presentadora con opiniones fuertes sobre corrupción peruana</p>

  <div class="orb" id="orb" onclick="toggleListening()">
    <span class="orb-icon" id="orbIcon">🎙️</span>
  </div>
  <div class="status" id="status">Click para hablar</div>

  <div class="transcript you">
    <div class="label you">Tú</div>
    <div id="youText">...</div>
  </div>
  <div class="transcript maria">
    <div class="label maria">María</div>
    <div id="mariaText">Hola! Lista para hacer quedar mal a algunos políticos peruanos con datos. 🇵🇪</div>
  </div>

  <p class="hint">Presiona <kbd>Space</kbd> para hablar · <kbd>Esc</kbd> para cancelar</p>

<script>
  let recognition = null;
  let isListening = false;
  let currentAudio = null;

  const orb = document.getElementById('orb');
  const orbIcon = document.getElementById('orbIcon');
  const status = document.getElementById('status');
  const youText = document.getElementById('youText');
  const mariaText = document.getElementById('mariaText');

  function setStatus(text, active = false) {
    status.textContent = text;
    status.className = active ? 'status active' : 'status';
  }

  function setOrbState(state) {
    orb.className = 'orb' + (state ? ' ' + state : '');
    if (state === 'listening') orbIcon.textContent = '👂';
    else if (state === 'speaking') orbIcon.textContent = '💬';
    else orbIcon.textContent = '🎙️';
  }

  function setupRecognition() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setStatus('Navegador no soporta voz. Usa Chrome.');
      return null;
    }
    const r = new SpeechRecognition();
    r.lang = 'es-PE';
    r.continuous = false;
    r.interimResults = true;

    r.onresult = (e) => {
      const transcript = Array.from(e.results).map(r => r[0].transcript).join('');
      youText.textContent = transcript;
      if (e.results[e.results.length - 1].isFinal) {
        stopListening();
        askMaria(transcript);
      }
    };
    r.onerror = (e) => { setStatus('Error: ' + e.error); setOrbState(''); isListening = false; };
    r.onend = () => { if (isListening) { isListening = false; setOrbState(''); } };
    return r;
  }

  function toggleListening() {
    if (isListening) stopListening();
    else startListening();
  }

  function startListening() {
    if (currentAudio) { currentAudio.pause(); currentAudio = null; }
    if (!recognition) recognition = setupRecognition();
    if (!recognition) return;
    recognition.start();
    isListening = true;
    setOrbState('listening');
    setStatus('Escuchando...', true);
    youText.textContent = '...';
  }

  function stopListening() {
    if (recognition && isListening) recognition.stop();
    isListening = false;
    setOrbState('');
    setStatus('Procesando...', true);
  }

  async function askMaria(message) {
    setStatus('María está pensando...', true);
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message })
      });
      const data = await res.json();
      mariaText.textContent = data.text;

      if (data.audio) {
        setOrbState('speaking');
        setStatus('María está hablando...', true);
        const audioBytes = Uint8Array.from(atob(data.audio), c => c.charCodeAt(0));
        const blob = new Blob([audioBytes], { type: 'audio/mpeg' });
        const url = URL.createObjectURL(blob);
        currentAudio = new Audio(url);
        currentAudio.onended = () => { setOrbState(''); setStatus('Click para hablar'); URL.revokeObjectURL(url); };
        currentAudio.play();
      } else {
        setOrbState('');
        setStatus('Click para hablar');
      }
    } catch(e) {
      setStatus('Error al conectar con María');
      setOrbState('');
    }
  }

  document.addEventListener('keydown', (e) => {
    if (e.code === 'Space' && !isListening) { e.preventDefault(); startListening(); }
    if (e.code === 'Escape') { stopListening(); setStatus('Cancelado'); }
  });
</script>
</body>
</html>`;

// --- Main server ---
await loadBrainDocs();

Bun.serve({
  port: 3001,
  async fetch(req) {
    const url = new URL(req.url);

    if (url.pathname === "/api/chat" && req.method === "POST") {
      const body = await req.json();
      return handleChat(body);
    }

    if (url.pathname === "/" || url.pathname === "/maria") {
      return new Response(UI_HTML, { headers: { "Content-Type": "text/html; charset=utf-8" } });
    }

    return new Response("Not found", { status: 404 });
  },
});

console.log("María está lista en http://localhost:3001");
