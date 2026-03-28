import type { Link } from './types';

export const links: Link[] = [
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

  // FAMILIA ACUÑA
  { source: "virgilio_acuña", target: "acuña", type: "familiar", detail: "Hermanos. Virgilio candidato por partido rival (Dem. Federal)." },
  { source: "virgilio_acuña", target: "masse", type: "vinculo_politico", detail: "Comparten fórmula en Partido Democrático Federal." },

  // VPs con antecedentes vinculados a su presidente
  { source: "hancco", target: "belmont", type: "vinculo_politico", detail: "VP2 de Belmont. Condena por contrabando 2017 (suspendida)." },
  { source: "hancco", target: "caso_contrabando", type: "condenado", detail: "3 años 6 meses pena suspendida. Tribunal Juliaca 2017." },
  { source: "murazzo", target: "gonzales_castillo", type: "vinculo_politico", detail: "VP de Gonzales Castillo (Dem. Verde)." },
  { source: "murazzo", target: "caso_desaparicion_forzada", type: "investigado", detail: "Proceso Exp. 00125-2023 por hechos de 1992. En casación." },
  { source: "carcovich", target: "caller", type: "vinculo_politico", detail: "VP de Caller (Partido Patriótico). Absuelto de homicidio calificado." },

  // MARIO VIZCARRA - PECULADO
  { source: "vizcarra_mario", target: "caso_peculado_regional", type: "condenado", detail: "Peculado (2005). Rehabilitado." },
  { source: "cerron", target: "caso_peculado_regional", type: "investigado", detail: "Gobernador Regional Junín. Colusión y neg. incompatible (sentencias anuladas/absueltas 2024-25)." },

  // NIETO MONTESINOS - ex-Ministro
  { source: "nieto_montesinos", target: "alan_garcia", type: "vinculo_politico", detail: "Ministro del Interior y Defensa en el segundo gobierno de García (2006-2011)." },

  // ALTUVE - ERA FUJIMORI
  { source: "altuve", target: "a_fujimori", type: "vinculo_politico", detail: "Congresista 2000-2001 bajo Perú 2000 (partido de Fujimori)." },

  // MOLINELLI - gobiernos PPK/Vizcarra
  { source: "molinelli", target: "vizcarra", type: "vinculo_politico", detail: "Presidenta EsSalud durante gobierno Vizcarra (2018-2021)." },

  // QUINTANILLA - historial izquierda
  { source: "quintanilla_a", target: "cerron", type: "vinculo_politico", detail: "Historial en izquierda: Frente Amplio (2016-2019), Partido Socialista." },

  // PEREZ TELLO - ex-Ministra
  { source: "perez_tello", target: "ppk", type: "vinculo_politico", detail: "Ministra de Justicia en gobierno PPK." },

  // NUEVA FAMILIA VP
  { source: "soto_alejandro", target: "caso_peculado_regional", type: "vinculo_politico", detail: "Presidente del Congreso 2023. Vinculado a gestión Acuña-APP." },
];
