import { readFileSync } from "fs";
import { join } from "path";

const html = readFileSync(join(import.meta.dir, "index.html"), "utf-8");

const server = Bun.serve({
  port: 3000,
  fetch(req) {
    return new Response(html, {
      headers: { "Content-Type": "text/html; charset=utf-8" },
    });
  },
});

console.log(`Grafo Político running at http://localhost:${server.port}`);
