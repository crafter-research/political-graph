export interface CaseNode {
  id: string;
  label: string;
  desc: string;
  year: string;
  monto?: string;
  size?: number;
}

export const cases: CaseNode[] = [
  { id: "lava_jato", label: "Caso Lava Jato", desc: "Megaesquema de sobornos de Odebrecht. US$29M en coimas en Perú entre 2005-2014. Involucra a 4 expresidentes.", year: "2016-presente", monto: "US$29M+" },
  { id: "cocteles", label: "Caso Cócteles", desc: "Investigación por lavado de activos por aportes de Odebrecht (US$1.2M) y Credicorp (US$3.65M) a campañas de Fuerza Popular.", year: "2017-presente", monto: "US$4.85M" },
  { id: "interoceanica", label: "Caso Interoceánica", desc: "Sobornos de US$31M a Alejandro Toledo para favorecer a Odebrecht en la licitación de la carretera Interoceánica Sur.", year: "2016-presente", monto: "US$31M" },
  { id: "metro_lima", label: "Caso Metro de Lima", desc: "Colusión para favorecer a Odebrecht en la licitación de la Línea 1 del Metro de Lima durante el segundo gobierno de Alan García.", year: "2017-presente" },
  { id: "cuellos_blancos", label: "Cuellos Blancos del Puerto", desc: "Red de corrupción en el Poder Judicial y Ministerio Público. Negociación de puestos, rebajas de penas y tráfico de influencias.", year: "2018-presente" },
  { id: "vladivideos", label: "Vladivideos", desc: "Sistema de corrupción y espionaje dirigido por Vladimiro Montesinos con videos que mostraban sobornos a políticos, jueces y medios.", year: "2000-2001" },
  { id: "ecoteva", label: "Caso Ecoteva", desc: "Lavado de activos a través de una offshore costarricense vinculada a Alejandro Toledo y su suegra Eva Fernenbug.", year: "2013-presente" },
  { id: "club_construccion", label: "Club de la Construcción", desc: "Cártel de empresas constructoras que se repartían obras públicas pagando coimas a funcionarios del MTC.", year: "2017-presente" },
  { id: "golpe_2022", label: "Golpe de Estado 2022", desc: "Pedro Castillo intentó disolver el Congreso, instaurar gobierno de emergencia y convocar Constituyente. Fue detenido horas después.", year: "Dic 2022" },
  { id: "masacres_protestas", label: "Masacres durante protestas", desc: "Represión policial y militar durante protestas post-golpe. Masacres de Ayacucho y Juliaca. Más de 60 muertos civiles.", year: "Dic 2022 - Feb 2023" },
  { id: "caso_rolex", label: "Caso Rolex", desc: "Investigación a Dina Boluarte por no declarar relojes Rolex y joyas recibidas del gobernador de Ayacucho Wilfredo Oscorima.", year: "2024-presente" },
  { id: "caso_yang", label: "Caso Zhihua Yang", desc: "Reuniones no declaradas entre el presidente del Congreso José Jerí y el empresario chino Zhihua Yang, bajo escrutinio gubernamental.", year: "Feb 2026" },
  { id: "caso_humala", label: "Caso Humala-Heredia", desc: "Aportes ilícitos de Odebrecht y del gobierno venezolano a las campañas de Ollanta Humala. US$3M de Odebrecht.", year: "2017-presente", monto: "US$3M+" },
];
