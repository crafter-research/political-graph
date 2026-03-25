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
  { id: "alan_garcia", label: "Alan Garcia †", role: "Expresidente (2006-2011)", size: 17, tags: ["Fallecido", "Se suicido antes de detencion"] },
  { id: "humala", label: "Ollanta Humala", role: "Expresidente (2011-2016)", size: 16, tags: ["En juicio oral"] },
  { id: "ppk", label: "Pedro Pablo Kuczynski", role: "Expresidente (2016-2018)", size: 15, tags: ["Investigado", "Arresto domiciliario"] },
  { id: "vizcarra", label: "Martin Vizcarra", role: "Expresidente (2018-2020)", size: 14, tags: ["Inhabilitado"] },
  { id: "castillo", label: "Pedro Castillo", role: "Expresidente (2021-2022)", size: 16, tags: ["Preso en Barbadillo", "Golpe de Estado"] },
  { id: "boluarte", label: "Dina Boluarte", role: "Expresidenta (2022-2026)", size: 16, tags: ["Investigada", "Masacres", "Caso Rolex"] },
  { id: "jeri", label: "Jose Jeri", role: "Expresidente (2026)", size: 12, tags: ["Censurado"] },
  { id: "balcazar", label: "Jose M. Balcazar", role: "Presidente actual (2026)", size: 12, tags: ["Presidente de transicion"] },
  { id: "a_fujimori", label: "Alberto Fujimori †", role: "Expresidente (1990-2000)", size: 20, tags: ["Fallecido", "Fue condenado 25 anos", "Indultado"] },

  { id: "keiko", label: "Keiko Fujimori", role: "Candidata 2026 · Fuerza Popular", size: 20, party: "Fuerza Popular", tags: ["Investigada Lava Jato", "Caso Cocteles"] },
  { id: "lopez_aliaga", label: "Rafael Lopez Aliaga", role: "Candidato 2026 · Renovacion Popular", size: 18, party: "Renovacion Popular", tags: ["Alcalde de Lima"] },
  { id: "lopez_chau", label: "Alfonso Lopez Chau", role: "Candidato 2026 · Ahora Nacion", size: 14, party: "Ahora Nacion" },
  { id: "atencio", label: "Ronald Atencio Sotomayor", role: "Candidato 2026 · Alianza Electoral Venceremos", size: 11, party: "Alianza Electoral Venceremos" },
  { id: "acuna", label: "Cesar Acuna Peralta", role: "Candidato 2026 · Alianza para el Progreso", size: 16, party: "Alianza para el Progreso" },
  { id: "williams", label: "Jose Daniel Williams Zapata", role: "Candidato 2026 · Avanza Pais", size: 13, party: "Avanza Pais" },
  { id: "paz_de_la_barra", label: "Alvaro Paz de la Barra", role: "Candidato 2026 · Fe en el Peru", size: 12, party: "Fe en el Peru" },
  { id: "molinelli", label: "Fiorella Molinelli Aristondo", role: "Candidata 2026 · Fuerza y Libertad", size: 12, party: "Fuerza y Libertad" },
  { id: "sanchez_palomino", label: "Roberto Sanchez Palomino", role: "Candidato 2026 · Juntos por el Peru", size: 11, party: "Juntos por el Peru" },
  { id: "belaunde_llosa", label: "Rafael Belaunde Llosa", role: "Candidato 2026 · Libertad Popular", size: 12, party: "Libertad Popular" },
  { id: "valderrama", label: "Pitter Valderrama Pena", role: "Candidato 2026 · Partido Aprista Peruano", size: 13, party: "Partido Aprista Peruano" },
  { id: "belmont", label: "Ricardo Belmont Cassinelli", role: "Candidato 2026 · Partido Civico Obras", size: 12, party: "Partido Civico Obras" },
  { id: "nieto_montesinos", label: "Jorge Nieto Montesinos", role: "Candidato 2026 · Partido del Buen Gobierno", size: 12, party: "Partido del Buen Gobierno" },
  { id: "carrasco", label: "Charlie Carrasco Salazar", role: "Candidato 2026 · Partido Democrata Unido Peru", size: 11, party: "Partido Democrata Unido Peru" },
  { id: "gonzales_castillo", label: "Alex Gonzales Castillo", role: "Candidato 2026 · Partido Democrata Verde", size: 11, party: "Partido Democrata Verde" },
  { id: "masse", label: "Armando Masse Fernandez", role: "Candidato 2026 · Partido Democratico Federal", size: 11, party: "Partido Democratico Federal" },
  { id: "forsyth", label: "George Forsyth", role: "Candidato 2026 · Somos Peru", size: 13, party: "Somos Peru" },
  { id: "olivera", label: "Luis Fernando Olivera Vega", role: "Candidato 2026 · Frente de la Esperanza 2021", size: 12, party: "Frente de la Esperanza 2021" },
  { id: "guevara", label: "Mesias Guevara Amasifuen", role: "Candidato 2026 · Partido Morado", size: 12, party: "Partido Morado" },
  { id: "alvarez_loayza", label: "Carlos Alvarez Loayza", role: "Candidato 2026 · Pais para Todos", size: 11, party: "Pais para Todos" },
  { id: "caller", label: "Herbert Caller Gutierrez", role: "Candidato 2026 · Partido Patriotico del Peru", size: 11, party: "Partido Patriotico del Peru" },
  { id: "lescano", label: "Yonhy Lescano Ancieta", role: "Candidato 2026 · Cooperacion Popular", size: 13, party: "Cooperacion Popular" },
  { id: "bermejo", label: "Guillermo Bermejo", role: "Candidato 2026 · Voces del Pueblo", size: 11, party: "Voces del Pueblo", tags: ["Sentencia terrorismo"] },
  { id: "cerron", label: "Vladimir Cerron", role: "Fundador Peru Libre", size: 15, party: "Peru Libre", tags: ["Profugo", "Sentencia corrupcion"] },
  { id: "grozo", label: "Wolfgang Grozo Costa", role: "Candidato 2026 · Integridad Democratica", size: 13, party: "Integridad Democratica" },
  { id: "diez_canseco", label: "Francisco Diez-Canseco Tavara", role: "Candidato 2026 · Peru Accion", size: 12, party: "Peru Accion" },
  { id: "vizcarra_mario", label: "Mario Vizcarra Cornejo", role: "Candidato 2026 · Peru Primero", size: 12, party: "Peru Primero" },
  { id: "chirinos", label: "Walter Chirinos Purizaga", role: "Candidato 2026 · Partido PRIN", size: 11, party: "Partido PRIN" },
  { id: "espa", label: "Alfonso Espa y Garces-Alvear", role: "Candidato 2026 · Partido SICREO", size: 11, party: "Partido SICREO" },
  { id: "jaico", label: "Carlos Jaico Carranza", role: "Candidato 2026 · Peru Moderno", size: 12, party: "Peru Moderno" },
  { id: "luna_galvez", label: "Jose Leon Luna Galvez", role: "Candidato 2026 · Podemos Peru", size: 13, party: "Podemos Peru" },
  { id: "perez_tello", label: "Maria Soledad Perez Tello", role: "Candidata 2026 · Primero la Gente", size: 12, party: "Primero la Gente" },
  { id: "jaimes", label: "Paul Jaimes Blanco", role: "Candidato 2026 · Progresemos", size: 11, party: "Progresemos" },
  { id: "ortiz_villano", label: "Antonio Ortiz Villano", role: "Candidato 2026 · Salvemos al Peru", size: 11, party: "Salvemos al Peru" },
  { id: "fernandez_bazan", label: "Rosario Fernandez Bazan", role: "Candidata 2026 · Un Camino Diferente", size: 12, party: "Un Camino Diferente" },
  { id: "chiabra", label: "Roberto Chiabra Leon", role: "Candidato 2026 · Unidad Nacional", size: 13, party: "Unidad Nacional" },

  { id: "montesinos", label: "Vladimiro Montesinos", role: "Exasesor de inteligencia", size: 18, tags: ["Preso", "Base Naval Callao"] },
  { id: "hinostroza", label: "Cesar Hinostroza", role: "Exjuez supremo", size: 13, tags: ["Espana", "Extradicion pendiente"] },
  { id: "chavarry", label: "Pedro Chavarry", role: "Exfiscal de la Nacion", size: 12, tags: ["Condenado", "Destituido"] },
  { id: "walter_rios", label: "Walter Rios", role: "Expresidente Corte del Callao", size: 11, tags: ["Preso"] },
  { id: "nadine", label: "Nadine Heredia", role: "Exprimera dama", size: 12, tags: ["En juicio oral"] },
  { id: "yoshiyama", label: "Jaime Yoshiyama", role: "Exsecretario gral FP", size: 11, tags: ["Investigado lavado"] },
  { id: "villaran", label: "Susana Villaran", role: "Exalcaldesa de Lima", size: 12, tags: ["Investigada lavado"] },
  { id: "felix_moreno", label: "Felix Moreno", role: "Exgobernador del Callao", size: 10, tags: ["Preso"] },
  { id: "benavides", label: "Patricia Benavides", role: "Exfiscal de la Nacion", size: 11, tags: ["Suspendida", "Investigada"] },
  { id: "oscorima", label: "Wilfredo Oscorima", role: "Gobernador de Ayacucho", size: 10, tags: ["Investigado"] },
];
