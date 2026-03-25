# political-graph

Grafo interactivo de relaciones entre políticos peruanos y casos de corrupción. 69 nodos, 37 conexiones, 112 documentos de respaldo.

Nodos amarillos = políticos. Nodos oscuros = casos. Cada conexión tiene tipo (investigado, sentenciado, obstrucción, vínculo político) y detalle específico.

Incluye hojas de vida de candidatos 2026 (JNE), declaraciones juradas, y documentos de contexto extraídos de fuentes públicas.

## Datos

- **Casos**: Lava Jato, Cuellos Blancos, Caso Rolex, Club de la Construcción, y más
- **Políticos**: Keiko Fujimori, Dina Boluarte, Pedro Castillo, Alan García, Ollanta Humala, Alberto Fujimori, y más
- **Fuentes**: JNE (hojas de vida), Fiscalía, medios verificados
- **Brain**: 112 documentos markdown con contexto, declaraciones juradas, y PDFs convertidos

## Correr

```bash
bun install
bun run index.ts
```

Abre `http://localhost:3000`. Búsqueda, filtros por tipo, zoom, panel de detalle al hacer click.

## Licencia

AGPL-3.0

---

Proyecto de [Crafter Research](https://research.crafter.ing).
