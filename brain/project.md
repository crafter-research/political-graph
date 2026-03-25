---
name: project-context
description: Contexto general del proyecto Grafo Político Perú
type: project
---

Grafo político interactivo de Perú con D3.js, servido con Bun.

**Stack:** Bun + TypeScript. Todo el HTML/CSS/JS está embebido en `index.ts` como template literal.

**Correr:** `bun --watch run index.ts` → live reload automático en `http://localhost:3000`

**Why:** El HTML está en `index.ts` (no hay `index.html` separado) porque el usuario prefiere todo en un solo archivo TypeScript.

**How to apply:** Al hacer cambios en el grafo, editar `index.ts` directamente.
