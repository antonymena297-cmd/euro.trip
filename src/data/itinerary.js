// Datos extraídos de "Plan de Viaje por Europa" (Anthony Mena Quirós)
// Ruta: Alemania – República Checa – Suiza · 27 dic 2027 – 5 ene 2028
// Todos los montos en colones (₡) salvo que se indique lo contrario.

export const TRIP_META = {
  title: "Ruta Invernal 2027–2028",
  subtitle: "Alemania · República Checa · Suiza",
  travelers: ["Anthony", "Nati"],
  startDate: "2027-12-27",
  endDate: "2028-01-05",
  nights: 9,
  days: 10,
  exchangeRates: { CHF: 585, note: "1 CHF ≈ ₡585 (tipo de cambio estimado del documento original)" }
};

// ---------------------------------------------------------------------------
// CIUDADES / SEDES — cada una alimenta una tarjeta del dashboard
// ---------------------------------------------------------------------------
export const CITIES = [
  {
    id: "munich",
    name: "Múnich",
    country: "Alemania",
    coords: [48.1351, 11.5820],
    dateRange: "28 – 29 dic. 2027 (+ noche del 2 ene. de regreso)",
    nights: 2,
    lodging: {
      name: "Por definir (hotel/Airbnb)",
      address: "Por definir",
      checkin: "27 dic. 2027 (tarde/noche)",
      checkout: "30 dic. 2027 (mañana)",
      priceCRC: 102000,
      priceNote: "≈ $200 USD por 2 noches (documento original)"
    },
    food: { budgetCRC: 132000, note: "≈ €240 estimados para Múnich" },
    activities: [
      { name: "Recorrido por el centro de Múnich", priceCRC: 0, duration: "Medio día", desc: "Zonas principales, lugares turísticos e históricos." },
      { name: "Allianz Arena", priceCRC: 20900, duration: "2 – 3 h", desc: "Entrada 19 EUR x 2 personas." },
      { name: "Castillo de Neuschwanstein", priceCRC: 0, duration: "2 – 3 h", desc: "Visita exterior gratuita; excursión de día completo desde Múnich." },
      { name: "Palacio de Linderhof", priceCRC: 12100, duration: "1 – 2 h", desc: "Entrada 11 EUR x 2 personas." }
    ],
    localTransport: "S-Bahn / U-Bahn de Múnich — pase diario recomendado para moverse entre el centro y Allianz Arena.",
    gallery: ["munich skyline marienplatz", "neuschwanstein castle winter", "allianz arena munich"]
  },
  {
    id: "regensburg",
    name: "Ratisbona",
    country: "Alemania",
    coords: [49.0134, 12.1016],
    dateRange: "30 dic. 2027 (visita de paso)",
    nights: 0,
    lodging: null,
    food: { budgetCRC: 0, note: "Incluido dentro del presupuesto de tránsito del día" },
    activities: [
      { name: "Catedral de Ratisbona", priceCRC: 0, duration: "45 – 60 min", desc: "Parada principal antes de continuar hacia Furth im Wald." }
    ],
    localTransport: "Llegada en tren desde Múnich (DB Pass) — 1 h 30 min.",
    gallery: ["regensburg cathedral germany"]
  },
  {
    id: "furth",
    name: "Furth im Wald",
    country: "Alemania",
    coords: [49.3129, 12.8397],
    dateRange: "30 dic. 2027 (conexión)",
    nights: 0,
    lodging: null,
    food: { budgetCRC: 0, note: "Punto de conexión, sin gasto asignado" },
    activities: [
      { name: "Punto de conexión fronterizo", priceCRC: 0, duration: "Tránsito", desc: "Enlace ferroviario entre Alemania y República Checa." }
    ],
    localTransport: "Desde Ratisbona — 1 h 10 min. Hacia Pilsen — 1 h 10 min.",
    gallery: ["furth im wald bavarian forest"]
  },
  {
    id: "pilsen",
    name: "Pilsen",
    country: "República Checa",
    coords: [49.7384, 13.3736],
    dateRange: "30 dic. 2027 (visita de paso)",
    nights: 0,
    lodging: null,
    food: { budgetCRC: 0, note: "Incluido dentro del presupuesto de tránsito del día" },
    activities: [
      { name: "Catedral de Pilsen", priceCRC: 0, duration: "45 – 60 min", desc: "Visita antes de continuar hacia Karlovy Vary." }
    ],
    localTransport: "Desde Furth im Wald — 1 h 10 min. Hacia Karlovy Vary — 1 h 15 min.",
    gallery: ["pilsen czech republic cathedral"]
  },
  {
    id: "karlovy-vary",
    name: "Karlovy Vary",
    country: "República Checa",
    coords: [50.2306, 12.8722],
    dateRange: "31 dic. 2027 – 1 ene. 2028",
    nights: 2,
    lodging: {
      name: "Por definir (hotel/Airbnb)",
      address: "Por definir",
      checkin: "30 dic. 2027 (noche)",
      checkout: "2 ene. 2028 (mañana)",
      priceCRC: 102000,
      priceNote: "≈ $200 USD (tal como aparece en el documento original — verificar número de noches)"
    },
    food: { budgetCRC: 25500, note: "≈ $50 USD" },
    activities: [
      { name: "Circuito de aguas termales", priceCRC: 30800, duration: "2 h", desc: "≈ 28 EUR/hora x 2 personas." },
      { name: "Recorrido por el centro histórico", priceCRC: 0, duration: "Medio día", desc: "Miradores, colonnades y zonas turísticas." },
      { name: "Celebración de Año Nuevo", priceCRC: 0, duration: "Noche del 31 dic.", desc: "Fin de año en el centro de la ciudad." }
    ],
    localTransport: "Ciudad caminable; el circuito termal y el centro histórico están a poca distancia del alojamiento.",
    gallery: ["karlovy vary colonnade winter", "karlovy vary thermal spa"]
  },
  {
    id: "zurich",
    name: "Zúrich",
    country: "Suiza",
    coords: [47.3769, 8.5417],
    dateRange: "Tránsito 3 ene. y 5 ene. 2028",
    nights: 0,
    lodging: {
      name: "Por definir (hotel/Airbnb, ciudad de tránsito)",
      address: "Por definir",
      checkin: "—",
      checkout: "—",
      priceCRC: 114240,
      priceNote: "≈ $224 USD (2 noches, tal como aparece en el documento original)"
    },
    food: { budgetCRC: 25500, note: "≈ $50 USD" },
    activities: [
      { name: "Llegada / salida internacional", priceCRC: 0, duration: "Variable", desc: "Punto de entrada y salida de Suiza; conexión en tren hacia Lucerna." }
    ],
    localTransport: "Tren Zúrich HB → Lucerna (ida y vuelta ≈ 50 CHF por persona).",
    gallery: ["zurich switzerland lake winter"]
  },
  {
    id: "lucerna",
    name: "Lucerna",
    country: "Suiza",
    coords: [47.0502, 8.3093],
    dateRange: "3 – 4 ene. 2028",
    nights: 2,
    lodging: {
      name: "Por definir (hotel/Airbnb)",
      address: "Por definir",
      checkin: "3 ene. 2028",
      checkout: "5 ene. 2028",
      priceCRC: 76500,
      priceNote: "≈ $150 USD (1 noche, documento original)"
    },
    food: { budgetCRC: 51000, note: "≈ $100 USD" },
    activities: [
      { name: "Recorrido por el centro y el lago", priceCRC: 0, duration: "Medio día", desc: "Casco histórico de Lucerna y orillas del lago." },
      { name: "Excursión al Monte Pilatus", priceCRC: 104000, duration: "Día completo", desc: "Telecabina + teleférico Dragon Ride, Kriens → Pilatus Kulm. Tarifa completa 72–78 CHF/persona (36–39 CHF con Swiss Travel Pass / Half Fare Card)." }
    ],
    localTransport: "Bus local #1 Lucerna → Kriens Zentrum (≈ 3.80 CHF por tramo).",
    gallery: ["lucerne switzerland chapel bridge", "mount pilatus cable car snow"]
  }
];

// ---------------------------------------------------------------------------
// TRAYECTOS / TRENES — usados en el módulo de mapa y navegación
// ---------------------------------------------------------------------------
export const LEGS = [
  { id: "cr-zurich", from: "Costa Rica", to: "Zúrich", date: "2027-12-27", mode: "Vuelo", duration: null, priceCRC: 1114000, priceNote: "2 pasajeros" },
  { id: "zurich-munich", from: "Zúrich", to: "Múnich", date: "2027-12-27", mode: "Tren (DB Pass)", duration: null, priceCRC: 225000, priceNote: "443 EUR + DB Pass, 2 pasajeros" },
  { id: "munich-regensburg", from: "Múnich", to: "Ratisbona", date: "2027-12-30", mode: "Tren (DB Pass)", duration: "1h 30min", from_coords: [48.1351, 11.5820], to_coords: [49.0134, 12.1016] },
  { id: "regensburg-furth", from: "Ratisbona", to: "Furth im Wald", date: "2027-12-30", mode: "Tren (DB Pass)", duration: "1h 10min", from_coords: [49.0134, 12.1016], to_coords: [49.3129, 12.8397] },
  { id: "furth-pilsen", from: "Furth im Wald", to: "Pilsen", date: "2027-12-30", mode: "Tren", duration: "1h 10min", from_coords: [49.3129, 12.8397], to_coords: [49.7384, 13.3736], priceCRC: 25425, priceNote: "Alemania–Praga i/v, 50 EUR" },
  { id: "pilsen-kv", from: "Pilsen", to: "Karlovy Vary", date: "2027-12-30", mode: "Tren / bus", duration: "1h 15min", from_coords: [49.7384, 13.3736], to_coords: [50.2306, 12.8722] },
  { id: "kv-munich", from: "Karlovy Vary", to: "Múnich", date: "2028-01-02", mode: "Tren (vía Pilsen, Furth im Wald, Ratisbona)", duration: "5h 05min", from_coords: [50.2306, 12.8722], to_coords: [48.1351, 11.5820] },
  { id: "munich-zurich", from: "Múnich", to: "Zúrich", date: "2028-01-03", mode: "Tren", duration: "3h 32min", from_coords: [48.1351, 11.5820], to_coords: [47.3769, 8.5417] },
  { id: "zurich-lucerna", from: "Zúrich", to: "Lucerna", date: "2028-01-03", mode: "Tren (SBB)", duration: null, from_coords: [47.3769, 8.5417], to_coords: [47.0502, 8.3093], priceCRC: 50000, priceNote: "Ida y vuelta, 2 pasajeros" },
  { id: "lucerna-kriens", from: "Lucerna", to: "Kriens Zentrum", date: "2028-01-04", mode: "Bus local #1", duration: null, from_coords: [47.0502, 8.3093], to_coords: [47.0333, 8.2833], priceNote: "3.80 CHF por tramo" },
  { id: "kriens-pilatus", from: "Kriens", to: "Pilatus Kulm", date: "2028-01-04", mode: "Telecabina + Dragon Ride", duration: null, from_coords: [47.0333, 8.2833], to_coords: [46.9789, 8.2510], priceCRC: 104000, priceNote: "2 pasajeros, tarifa completa" },
  { id: "lucerna-zurich-cr", from: "Lucerna", to: "Zúrich → Costa Rica", date: "2028-01-05", mode: "Tren + vuelo", duration: null, from_coords: [47.0502, 8.3093], to_coords: [47.3769, 8.5417] }
];

// ---------------------------------------------------------------------------
// ITINERARIO DÍA A DÍA — usado por el recalculador de horarios
// ---------------------------------------------------------------------------
export const DAYS = [
  { date: "2027-12-27", weekday: "Lunes", title: "Llegada a Suiza y traslado a Múnich", cityId: "munich",
    blocks: [
      { key: "arrival", label: "Llegada del vuelo a Suiza", offsetMin: 0, editable: true, defaultTime: "10:00" },
      { key: "transfer", label: "Traslado Suiza → Múnich", offsetMin: 0, durationMin: 240 },
      { key: "checkin", label: "Check-in alojamiento en Múnich", offsetMin: 30 },
      { key: "rest", label: "Descanso tras el viaje internacional", offsetMin: 60 }
    ] },
  { date: "2027-12-28", weekday: "Martes", title: "Múnich: centro y Allianz Arena", cityId: "munich",
    blocks: [
      { key: "start", label: "Salida del alojamiento", offsetMin: 0, editable: true, defaultTime: "09:00" },
      { key: "tour", label: "Recorrido por el centro de Múnich", offsetMin: 0, durationMin: 180 },
      { key: "arena", label: "Visita a la Allianz Arena", offsetMin: 30, durationMin: 150 },
      { key: "return", label: "Regreso al alojamiento", offsetMin: 30 }
    ] },
  { date: "2027-12-29", weekday: "Miércoles", title: "Neuschwanstein y Linderhof", cityId: "munich",
    blocks: [
      { key: "start", label: "Salida hacia Baviera", offsetMin: 0, editable: true, defaultTime: "08:00" },
      { key: "neuschwanstein", label: "Castillo de Neuschwanstein", offsetMin: 90, durationMin: 150 },
      { key: "linderhof", label: "Palacio de Linderhof", offsetMin: 45, durationMin: 90 },
      { key: "return", label: "Regreso a Múnich", offsetMin: 90 }
    ] },
  { date: "2027-12-30", weekday: "Jueves", title: "Múnich → Ratisbona → Furth im Wald → Pilsen → Karlovy Vary", cityId: "karlovy-vary",
    blocks: [
      { key: "start", label: "Salida de Múnich", offsetMin: 0, editable: true, defaultTime: "07:30" },
      { key: "regensburg", label: "Ratisbona: Catedral", offsetMin: 90, durationMin: 60 },
      { key: "furth", label: "Furth im Wald (conexión)", offsetMin: 70, durationMin: 15 },
      { key: "pilsen", label: "Pilsen: Catedral", offsetMin: 70, durationMin: 60 },
      { key: "kv", label: "Llegada a Karlovy Vary", offsetMin: 75 }
    ] },
  { date: "2027-12-31", weekday: "Viernes", title: "Karlovy Vary y celebración de Año Nuevo", cityId: "karlovy-vary",
    blocks: [
      { key: "start", label: "Salida del alojamiento", offsetMin: 0, editable: true, defaultTime: "09:30" },
      { key: "thermal", label: "Aguas termales", offsetMin: 0, durationMin: 120 },
      { key: "walk", label: "Centro histórico y miradores", offsetMin: 30, durationMin: 180 },
      { key: "nye", label: "Celebración de Año Nuevo", offsetMin: 240 }
    ] },
  { date: "2028-01-01", weekday: "Sábado", title: "Segundo día en Karlovy Vary", cityId: "karlovy-vary",
    blocks: [
      { key: "start", label: "Salida del alojamiento", offsetMin: 0, editable: true, defaultTime: "10:00" },
      { key: "explore", label: "Recorrido libre por la ciudad", offsetMin: 0, durationMin: 240 },
      { key: "rest", label: "Actividades recreativas / descanso", offsetMin: 30 }
    ] },
  { date: "2028-01-02", weekday: "Domingo", title: "Regreso a Múnich", cityId: "munich",
    blocks: [
      { key: "start", label: "Salida de Karlovy Vary", offsetMin: 0, editable: true, defaultTime: "08:00" },
      { key: "route", label: "Pilsen → Furth im Wald → Ratisbona", offsetMin: 0, durationMin: 230 },
      { key: "munich", label: "Llegada a Múnich", offsetMin: 75 },
      { key: "checkin", label: "Check-in alojamiento", offsetMin: 30 }
    ] },
  { date: "2028-01-03", weekday: "Lunes", title: "Múnich → Zúrich → Lucerna", cityId: "lucerna",
    blocks: [
      { key: "start", label: "Salida de Múnich", offsetMin: 0, editable: true, defaultTime: "08:30" },
      { key: "zurich", label: "Llegada a Zúrich", offsetMin: 212 },
      { key: "lucerna", label: "Tren Zúrich → Lucerna", offsetMin: 20, durationMin: 45 },
      { key: "checkin", label: "Check-in en Lucerna", offsetMin: 15 },
      { key: "walk", label: "Recorrido ligero por el centro", offsetMin: 45, durationMin: 90 }
    ] },
  { date: "2028-01-04", weekday: "Martes", title: "Excursión al Monte Pilatus", cityId: "lucerna",
    blocks: [
      { key: "start", label: "Salida hacia Kriens", offsetMin: 0, editable: true, defaultTime: "09:00" },
      { key: "kriens", label: "Traslado Lucerna → Kriens (bus #1)", offsetMin: 0, durationMin: 20 },
      { key: "gondola", label: "Telecabina + Dragon Ride", offsetMin: 10, durationMin: 40 },
      { key: "summit", label: "Pilatus Kulm: vistas y actividades", offsetMin: 5, durationMin: 150 },
      { key: "return", label: "Regreso a Lucerna", offsetMin: 60 }
    ] },
  { date: "2028-01-05", weekday: "Miércoles", title: "Regreso a Costa Rica", cityId: "zurich",
    blocks: [
      { key: "start", label: "Salida de Lucerna", offsetMin: 0, editable: true, defaultTime: "07:00" },
      { key: "zurich", label: "Traslado a Zúrich", offsetMin: 0, durationMin: 45 },
      { key: "airport", label: "Traslado al aeropuerto", offsetMin: 20, durationMin: 30 },
      { key: "flight", label: "Vuelo de regreso a Costa Rica", offsetMin: 120 }
    ] }
];

// ---------------------------------------------------------------------------
// PRESUPUESTO MAESTRO — Tabla 7 del documento (2 personas), en colones (₡)
// ---------------------------------------------------------------------------
export const BUDGET_ITEMS = [
  { category: "Vuelos y transporte base", concept: "Vuelo Costa Rica – Suiza (2 pax)", cityId: null, amountCRC: 1114000, originalAmount: "₡1,114,000" },
  { category: "Vuelos y transporte base", concept: "Suiza – Múnich + DB Pass", cityId: "munich", amountCRC: 225000, originalAmount: "443 EUR" },
  { category: "Vuelos y transporte base", concept: "Alemania – Praga (ida y vuelta)", cityId: "pilsen", amountCRC: 25425, originalAmount: "50 EUR" },
  { category: "Vuelos y transporte base", concept: "Tren Zúrich – Lucerna (2 pax)", cityId: "lucerna", amountCRC: 50000, originalAmount: "₡50,000" },
  { category: "Vuelos y transporte base", concept: "Monte Pilatus (pases, 2 pax)", cityId: "lucerna", amountCRC: 104000, originalAmount: "₡104,000" },
  { category: "Atracciones y entradas", concept: "Allianz Arena (Múnich)", cityId: "munich", amountCRC: 20900, originalAmount: "38 EUR (19 x 2)" },
  { category: "Atracciones y entradas", concept: "Palacio de Linderhof", cityId: "munich", amountCRC: 12100, originalAmount: "22 EUR (11 x 2)" },
  { category: "Atracciones y entradas", concept: "Castillo de Neuschwanstein (exterior)", cityId: "munich", amountCRC: 0, originalAmount: "Gratuito" },
  { category: "Atracciones y entradas", concept: "Karlovy Vary — circuito termal", cityId: "karlovy-vary", amountCRC: 30800, originalAmount: "56 EUR (28/h x 2h)" },
  { category: "Alojamiento", concept: "Múnich (2 noches)", cityId: "munich", amountCRC: 102000, originalAmount: "$200 USD" },
  { category: "Alojamiento", concept: "Karlovy Vary (3 noches, según documento)", cityId: "karlovy-vary", amountCRC: 102000, originalAmount: "$200 USD" },
  { category: "Alojamiento", concept: "Zúrich (2 noches: 2 y 4 ene.)", cityId: "zurich", amountCRC: 114240, originalAmount: "$224 USD" },
  { category: "Alojamiento", concept: "Lucerna (1 noche: 3 ene.)", cityId: "lucerna", amountCRC: 76500, originalAmount: "$150 USD" },
  { category: "Alimentación", concept: "Múnich", cityId: "munich", amountCRC: 132000, originalAmount: "240 EUR" },
  { category: "Alimentación", concept: "Karlovy Vary", cityId: "karlovy-vary", amountCRC: 25500, originalAmount: "$50 USD" },
  { category: "Alimentación", concept: "Zúrich", cityId: "zurich", amountCRC: 25500, originalAmount: "$50 USD" },
  { category: "Alimentación", concept: "Lucerna", cityId: "lucerna", amountCRC: 51000, originalAmount: "$100 USD" },
  { category: "Conectividad", concept: "Internet eSIM / SIM (2 pax)", cityId: null, amountCRC: 37290, originalAmount: "67.80 EUR (33.90 x 2)" }
];

export const BUDGET_NOTE = "Los montos y noches de alojamiento se transcriben tal como aparecen en el documento original (algunas cifras, como las noches de Karlovy Vary y Zúrich, tienen inconsistencias frente al itinerario día a día — revísalas y ajústalas manualmente si es necesario).";

export const TOTAL_ESTIMATED_CRC = BUDGET_ITEMS.reduce((sum, i) => sum + i.amountCRC, 0);
