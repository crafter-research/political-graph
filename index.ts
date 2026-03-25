import { readFileSync, watch } from "fs";
import { join } from "path";

const htmlPath = join(import.meta.dir, "index.html");

function getHtml() {
  const raw = readFileSync(htmlPath, "utf-8");
  // Inject live-reload script before </body>
  return raw.replace(
    "</body>",
    `<script>
      const es = new EventSource('/reload');
      es.onmessage = () => location.reload();
    </script></body>`
  );
}

// SSE clients
const clients = new Set<ReadableStreamDefaultController>();

// Watch for file changes
watch(htmlPath, () => {
  for (const ctrl of clients) {
    try { ctrl.enqueue("data: reload\n\n"); } catch {}
  }
});

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

    return new Response(getHtml(), {
      headers: { "Content-Type": "text/html; charset=utf-8" },
    });
  },
});

console.log(`Grafo Político running at http://localhost:${server.port}`);
console.log("Live reload activo — el browser recarga solo al guardar cambios.");
