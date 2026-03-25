---
name: feedback-preferencias
description: Preferencias y correcciones del usuario sobre el proyecto
type: feedback
---

**Memoria en carpeta brain del proyecto.**
Guardar todos los archivos de memoria en `D:\projects\political-graph\brain\` como `.md`.
**Why:** El usuario prefiere tener la memoria co-ubicada con el proyecto.
**How to apply:** Siempre escribir nuevas memorias en `D:\projects\political-graph\brain\` y actualizar el índice en MEMORY.md.

---

**Sin index.html separado.**
Todo el HTML debe estar embebido en `index.ts` como template literal.
**Why:** El usuario no quiere archivos HTML separados.
**How to apply:** Al hacer cambios de UI, editar directamente el string HTML dentro de `index.ts`.

---

**No pedir recarga manual.**
El servidor debe tener live reload automático.
**Why:** El usuario no quiere tener que recargar el browser manualmente.
**How to apply:** Siempre correr con `bun --watch run index.ts`.
