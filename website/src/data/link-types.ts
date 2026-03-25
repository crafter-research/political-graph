export const LINK_TYPES: Record<
  string,
  { color: string; label: string; dash: string }
> = {
  investigado: { color: "#ff4757", label: "Investigado/Procesado", dash: "none" },
  condenado: { color: "#ff6348", label: "Condenado", dash: "none" },
  financiamiento: { color: "#ffa502", label: "Financiamiento ilícito", dash: "6,4" },
  vinculo_politico: { color: "#70a1ff", label: "Vínculo político", dash: "none" },
  obstruccion: { color: "#ff6b81", label: "Obstrucción / Encubrimiento", dash: "4,3" },
  familiar: { color: "#7bed9f", label: "Vínculo familiar", dash: "none" },
  sucesion: { color: "#a4b0be", label: "Sucesión presidencial", dash: "8,4" },
  responsable: { color: "#ff4757", label: "Responsable directo", dash: "none" },
};
