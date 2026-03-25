export interface CaseNode {
  id: string;
  label: string;
  desc: string;
  year: string;
  monto?: string;
  size?: number;
}

export const cases: CaseNode[] = [
  { id: "lava_jato", label: "Caso Lava Jato", desc: "Megaesquema de sobornos de Odebrecht. US$29M en coimas en Peru entre 2005-2014. Involucra a 4 expresidentes.", year: "2016-presente", monto: "US$29M+" },
  { id: "cocteles", label: "Caso Cocteles", desc: "Investigacion por lavado de activos por aportes de Odebrecht (US$1.2M) y Credicorp (US$3.65M) a campanas de Fuerza Popular.", year: "2017-presente", monto: "US$4.85M" },
  { id: "interoceanica", label: "Caso Interoceanica", desc: "Sobornos de US$31M a Alejandro Toledo para favorecer a Odebrecht en la licitacion de la carretera Interoceanica Sur.", year: "2016-presente", monto: "US$31M" },
  { id: "metro_lima", label: "Caso Metro de Lima", desc: "Colusion para favorecer a Odebrecht en la licitacion de la Linea 1 del Metro de Lima durante el segundo gobierno de Alan Garcia.", year: "2017-presente" },
  { id: "cuellos_blancos", label: "Cuellos Blancos del Puerto", desc: "Red de corrupcion en el Poder Judicial y Ministerio Publico. Negociacion de puestos, rebajas de penas y trafico de influencias.", year: "2018-presente" },
  { id: "vladivideos", label: "Vladivideos", desc: "Sistema de corrupcion y espionaje dirigido por Vladimiro Montesinos con videos que mostraban sobornos a politicos, jueces y medios.", year: "2000-2001" },
  { id: "ecoteva", label: "Caso Ecoteva", desc: "Lavado de activos a traves de una offshore costarricense vinculada a Alejandro Toledo y su suegra Eva Fernenbug.", year: "2013-presente" },
  { id: "club_construccion", label: "Club de la Construccion", desc: "Cartel de empresas constructoras que se repartian obras publicas pagando coimas a funcionarios del MTC.", year: "2017-presente" },
  { id: "golpe_2022", label: "Golpe de Estado 2022", desc: "Pedro Castillo intento disolver el Congreso, instaurar gobierno de emergencia y convocar Constituyente. Fue detenido horas despues.", year: "Dic 2022" },
  { id: "masacres_protestas", label: "Masacres durante protestas", desc: "Represion policial y militar durante protestas post-golpe. Masacres de Ayacucho y Juliaca. Mas de 60 muertos civiles.", year: "Dic 2022 - Feb 2023" },
  { id: "caso_rolex", label: "Caso Rolex", desc: "Investigacion a Dina Boluarte por no declarar relojes Rolex y joyas recibidas del gobernador de Ayacucho Wilfredo Oscorima.", year: "2024-presente" },
  { id: "caso_yang", label: "Caso Zhihua Yang", desc: "Reuniones no declaradas entre el presidente del Congreso Jose Jeri y el empresario chino Zhihua Yang, bajo escrutinio gubernamental.", year: "Feb 2026" },
  { id: "caso_humala", label: "Caso Humala-Heredia", desc: "Aportes ilicitos de Odebrecht y del gobierno venezolano a las campanas de Ollanta Humala. US$3M de Odebrecht.", year: "2017-presente", monto: "US$3M+" },
];
