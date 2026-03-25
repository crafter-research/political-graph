export interface PoliticianNode {
  id: string;
  label: string;
  role: string;
  size: number;
  party?: string;
  tags?: string[];
}

export const politicians: PoliticianNode[] = [
  { id: "toledo", label: "Alejandro Toledo", role: "Expresidente (2001-2006)", size: 18, tags: ["Condenado", "Preso en Barbadillo"] },
  { id: "alan_garcia", label: "Alan García †", role: "Expresidente (2006-2011)", size: 17, tags: ["Fallecido", "Se suicidó antes de detención"] },
  { id: "humala", label: "Ollanta Humala", role: "Expresidente (2011-2016)", size: 16, tags: ["En juicio oral"] },
  { id: "ppk", label: "Pedro Pablo Kuczynski", role: "Expresidente (2016-2018)", size: 15, tags: ["Investigado", "Arresto domiciliario"] },
  { id: "vizcarra", label: "Martín Vizcarra", role: "Expresidente (2018-2020)", size: 14, tags: ["Inhabilitado"] },
  { id: "castillo", label: "Pedro Castillo", role: "Expresidente (2021-2022)", size: 16, tags: ["Preso en Barbadillo", "Golpe de Estado"] },
  { id: "boluarte", label: "Dina Boluarte", role: "Expresidenta (2022-2026)", size: 16, tags: ["Investigada", "Masacres", "Caso Rolex"] },
  { id: "jeri", label: "José Jerí", role: "Expresidente (2026)", size: 12, tags: ["Censurado"] },
  { id: "balcazar", label: "José M. Balcázar", role: "Presidente actual (2026)", size: 12, tags: ["Presidente de transición"] },
  { id: "a_fujimori", label: "Alberto Fujimori †", role: "Expresidente (1990-2000)", size: 20, tags: ["Fallecido", "Fue condenado 25 años", "Indultado"] },

  { id: "keiko", label: "Keiko Fujimori", role: "Candidata 2026 · Fuerza Popular", size: 20, party: "Fuerza Popular", tags: ["Investigada Lava Jato", "Caso Cócteles"] },
  { id: "lopez_aliaga", label: "Rafael López Aliaga", role: "Candidato 2026 · Renovación Popular", size: 18, party: "Renovación Popular", tags: ["Alcalde de Lima"] },
  { id: "lopez_chau", label: "Alfonso López Chau", role: "Candidato 2026 · Ahora Nación", size: 14, party: "Ahora Nación" },
  { id: "atencio", label: "Ronald Atencio Sotomayor", role: "Candidato 2026 · Alianza Electoral Venceremos", size: 11, party: "Alianza Electoral Venceremos" },
  { id: "acuna", label: "César Acuña Peralta", role: "Candidato 2026 · Alianza para el Progreso", size: 16, party: "Alianza para el Progreso" },
  { id: "williams", label: "José Daniel Williams Zapata", role: "Candidato 2026 · Avanza País", size: 13, party: "Avanza País" },
  { id: "paz_de_la_barra", label: "Álvaro Paz de la Barra", role: "Candidato 2026 · Fe en el Perú", size: 12, party: "Fe en el Perú" },
  { id: "molinelli", label: "Fiorella Molinelli Aristondo", role: "Candidata 2026 · Fuerza y Libertad", size: 12, party: "Fuerza y Libertad" },
  { id: "sanchez_palomino", label: "Roberto Sánchez Palomino", role: "Candidato 2026 · Juntos por el Perú", size: 11, party: "Juntos por el Perú" },
  { id: "belaunde_llosa", label: "Rafael Belaunde Llosa", role: "Candidato 2026 · Libertad Popular", size: 12, party: "Libertad Popular" },
  { id: "valderrama", label: "Pitter Valderrama Peña", role: "Candidato 2026 · Partido Aprista Peruano", size: 13, party: "Partido Aprista Peruano" },
  { id: "belmont", label: "Ricardo Belmont Cassinelli", role: "Candidato 2026 · Partido Cívico Obras", size: 12, party: "Partido Cívico Obras" },
  { id: "nieto_montesinos", label: "Jorge Nieto Montesinos", role: "Candidato 2026 · Partido del Buen Gobierno", size: 12, party: "Partido del Buen Gobierno" },
  { id: "carrasco", label: "Charlie Carrasco Salazar", role: "Candidato 2026 · Partido Demócrata Unido Perú", size: 11, party: "Partido Demócrata Unido Perú" },
  { id: "gonzales_castillo", label: "Alex Gonzales Castillo", role: "Candidato 2026 · Partido Demócrata Verde", size: 11, party: "Partido Demócrata Verde" },
  { id: "masse", label: "Armando Masse Fernández", role: "Candidato 2026 · Partido Democrático Federal", size: 11, party: "Partido Democrático Federal" },
  { id: "forsyth", label: "George Forsyth", role: "Candidato 2026 · Somos Perú", size: 13, party: "Somos Perú" },
  { id: "olivera", label: "Luis Fernando Olivera Vega", role: "Candidato 2026 · Frente de la Esperanza 2021", size: 12, party: "Frente de la Esperanza 2021" },
  { id: "guevara", label: "Mesías Guevara Amasifuén", role: "Candidato 2026 · Partido Morado", size: 12, party: "Partido Morado" },
  { id: "alvarez_loayza", label: "Carlos Álvarez Loayza", role: "Candidato 2026 · País para Todos", size: 11, party: "País para Todos" },
  { id: "caller", label: "Herbert Caller Gutiérrez", role: "Candidato 2026 · Partido Patriótico del Perú", size: 11, party: "Partido Patriótico del Perú" },
  { id: "lescano", label: "Yonhy Lescano Ancieta", role: "Candidato 2026 · Cooperación Popular", size: 13, party: "Cooperación Popular" },
  { id: "bermejo", label: "Guillermo Bermejo", role: "Candidato 2026 · Voces del Pueblo", size: 11, party: "Voces del Pueblo", tags: ["Sentencia terrorismo"] },
  { id: "cerron", label: "Vladimir Cerrón", role: "Fundador Perú Libre", size: 15, party: "Perú Libre", tags: ["Prófugo", "Sentencia corrupción"] },
  { id: "grozo", label: "Wolfgang Grozo Costa", role: "Candidato 2026 · Integridad Democrática", size: 13, party: "Integridad Democrática" },
  { id: "diez_canseco", label: "Francisco Diez-Canseco Távara", role: "Candidato 2026 · Perú Acción", size: 12, party: "Perú Acción" },
  { id: "vizcarra_mario", label: "Mario Vizcarra Cornejo", role: "Candidato 2026 · Perú Primero", size: 12, party: "Perú Primero" },
  { id: "chirinos", label: "Walter Chirinos Purizaga", role: "Candidato 2026 · Partido PRIN", size: 11, party: "Partido PRIN" },
  { id: "espa", label: "Alfonso Espá y Garcés-Álvear", role: "Candidato 2026 · Partido SICREO", size: 11, party: "Partido SICREO" },
  { id: "jaico", label: "Carlos Jaico Carranza", role: "Candidato 2026 · Perú Moderno", size: 12, party: "Perú Moderno" },
  { id: "luna_galvez", label: "José León Luna Gálvez", role: "Candidato 2026 · Podemos Perú", size: 13, party: "Podemos Perú" },
  { id: "perez_tello", label: "María Soledad Pérez Tello", role: "Candidata 2026 · Primero la Gente", size: 12, party: "Primero la Gente" },
  { id: "jaimes", label: "Paul Jaimes Blanco", role: "Candidato 2026 · Progresemos", size: 11, party: "Progresemos" },
  { id: "ortiz_villano", label: "Antonio Ortiz Villano", role: "Candidato 2026 · Salvemos al Perú", size: 11, party: "Salvemos al Perú" },
  { id: "fernandez_bazan", label: "Rosario Fernández Bazán", role: "Candidata 2026 · Un Camino Diferente", size: 12, party: "Un Camino Diferente" },
  { id: "chiabra", label: "Roberto Chiabra León", role: "Candidato 2026 · Unidad Nacional", size: 13, party: "Unidad Nacional" },

  { id: "montesinos", label: "Vladimiro Montesinos", role: "Exasesor de inteligencia", size: 18, tags: ["Preso", "Base Naval Callao"] },
  { id: "hinostroza", label: "César Hinostroza", role: "Exjuez supremo", size: 13, tags: ["España", "Extradición pendiente"] },
  { id: "chavarry", label: "Pedro Chávarry", role: "Exfiscal de la Nación", size: 12, tags: ["Condenado", "Destituido"] },
  { id: "walter_rios", label: "Walter Ríos", role: "Expresidente Corte del Callao", size: 11, tags: ["Preso"] },
  { id: "nadine", label: "Nadine Heredia", role: "Exprimera dama", size: 12, tags: ["En juicio oral"] },
  { id: "yoshiyama", label: "Jaime Yoshiyama", role: "Exsecretario gral FP", size: 11, tags: ["Investigado lavado"] },
  { id: "villaran", label: "Susana Villarán", role: "Exalcaldesa de Lima", size: 12, tags: ["Investigada lavado"] },
  { id: "felix_moreno", label: "Félix Moreno", role: "Exgobernador del Callao", size: 10, tags: ["Preso"] },
  { id: "benavides", label: "Patricia Benavides", role: "Exfiscal de la Nación", size: 11, tags: ["Suspendida", "Investigada"] },
  { id: "oscorima", label: "Wilfredo Oscorima", role: "Gobernador de Ayacucho", size: 10, tags: ["Investigado"] },
];
