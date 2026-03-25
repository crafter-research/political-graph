# political-graph

Grafo interactivo de relaciones entre politicos peruanos y casos de corrupcion. 69 nodos, 37 conexiones, 112 documentos de respaldo.

Nodos amarillos = politicos. Nodos oscuros = casos. Cada conexion tiene tipo (investigado, sentenciado, obstruccion, vinculo politico) y detalle especifico.

Incluye hojas de vida de candidatos 2026 (JNE), declaraciones juradas, y documentos de contexto extraidos de fuentes publicas.

## Datos

- **Casos**: Lava Jato, Cuellos Blancos, Caso Rolex, Club de la Construccion, y mas
- **Politicos**: Keiko Fujimori, Dina Boluarte, Pedro Castillo, Alan Garcia, Ollanta Humala, Alberto Fujimori, y mas
- **Fuentes**: JNE (hojas de vida), Fiscalia, medios verificados
- **Brain**: 112 documentos markdown con contexto, declaraciones juradas, y PDFs convertidos

## Correr

```bash
bun install
bun run index.ts
```

Abre `http://localhost:3000`. Busqueda, filtros por tipo, zoom, panel de detalle al hacer click.

## Licencia

AGPL-3.0

---

Proyecto de [Crafter Research](https://research.crafter.ing).
