export interface GraphLink {
  source: string;
  target: string;
  type: string;
  detail: string;
}

export const links: GraphLink[] = [
  { source: "toledo", target: "lava_jato", type: "condenado", detail: "Condenado 20 anos. US$31M en coimas." },
  { source: "toledo", target: "interoceanica", type: "condenado", detail: "Favorecio a Odebrecht en licitacion." },
  { source: "toledo", target: "ecoteva", type: "investigado", detail: "Lavado via offshore en Costa Rica." },
  { source: "alan_garcia", target: "lava_jato", type: "investigado", detail: "Investigado. Se suicido antes de detencion." },
  { source: "alan_garcia", target: "metro_lima", type: "investigado", detail: "Presunta colusion en licitacion Metro L1." },
  { source: "humala", target: "lava_jato", type: "investigado", detail: "En juicio oral por aportes ilicitos." },
  { source: "humala", target: "caso_humala", type: "investigado", detail: "US$3M de Odebrecht para campana 2011." },
  { source: "nadine", target: "caso_humala", type: "investigado", detail: "Coprocesada con Humala." },
  { source: "humala", target: "nadine", type: "familiar", detail: "Esposos" },
  { source: "ppk", target: "lava_jato", type: "investigado", detail: "Pagos de Odebrecht a Westfield Capital." },
  { source: "keiko", target: "cocteles", type: "investigado", detail: "US$1.2M Odebrecht + US$3.65M Credicorp." },
  { source: "keiko", target: "lava_jato", type: "financiamiento", detail: "Aportes ilicitos a campana 2011." },
  { source: "yoshiyama", target: "cocteles", type: "investigado", detail: "Receptor de US$1M de Odebrecht para FP." },
  { source: "villaran", target: "lava_jato", type: "investigado", detail: "US$3M de Odebrecht/OAS para campana No Revocatoria." },
  { source: "felix_moreno", target: "lava_jato", type: "condenado", detail: "Exgobernador Callao. Preso." },

  { source: "hinostroza", target: "cuellos_blancos", type: "investigado", detail: "Presunto cabecilla. Profugo en Espana." },
  { source: "chavarry", target: "cuellos_blancos", type: "condenado", detail: "Condenado por encubrimiento y obstruccion." },
  { source: "walter_rios", target: "cuellos_blancos", type: "investigado", detail: "Presunto cabecilla. Preso desde 2018." },
  { source: "chavarry", target: "lava_jato", type: "obstruccion", detail: "Removio fiscales Vela y Perez del caso." },
  { source: "benavides", target: "cuellos_blancos", type: "vinculo_politico", detail: "Investigada por presunta red de corrupcion en Fiscalia." },

  { source: "a_fujimori", target: "vladivideos", type: "responsable", detail: "Jefe de Estado durante el sistema de corrupcion." },
  { source: "montesinos", target: "vladivideos", type: "responsable", detail: "Operador del sistema. Grababa los sobornos." },
  { source: "a_fujimori", target: "montesinos", type: "vinculo_politico", detail: "Presidente - Asesor de inteligencia." },
  { source: "keiko", target: "a_fujimori", type: "familiar", detail: "Hija. Hereda base politica." },

  { source: "castillo", target: "golpe_2022", type: "responsable", detail: "Intento disolver Congreso. Detenido." },
  { source: "cerron", target: "castillo", type: "vinculo_politico", detail: "Lider del partido que llevo a Castillo al poder." },
  { source: "bermejo", target: "castillo", type: "vinculo_politico", detail: "Congresista de su entorno cercano." },
  { source: "boluarte", target: "castillo", type: "sucesion", detail: "Vicepresidenta. Asumio tras golpe." },
  { source: "boluarte", target: "masacres_protestas", type: "responsable", detail: "Presidenta durante represion. 60+ muertos." },
  { source: "boluarte", target: "caso_rolex", type: "investigado", detail: "Relojes no declarados de Oscorima." },
  { source: "oscorima", target: "caso_rolex", type: "investigado", detail: "Entrego Rolex y joyas a Boluarte." },

  { source: "jeri", target: "caso_yang", type: "investigado", detail: "Reuniones no declaradas con Yang." },
  { source: "jeri", target: "boluarte", type: "sucesion", detail: "Sucedio a Boluarte como presidente." },
  { source: "balcazar", target: "jeri", type: "sucesion", detail: "Sucedio a Jeri tras censura." },

  { source: "club_construccion", target: "lava_jato", type: "vinculo_politico", detail: "Cartel conectado al esquema Odebrecht." },

  { source: "cerron", target: "bermejo", type: "vinculo_politico", detail: "Ambos de Peru Libre, luego separados." },
  { source: "lopez_aliaga", target: "keiko", type: "vinculo_politico", detail: "Bloque conservador en Congreso (FP + RP)." },
];
