export function formatCRC(value) {
  if (value === null || value === undefined || isNaN(value)) return "₡0";
  return "₡" + Math.round(value).toLocaleString("es-CR");
}

export function formatDateEs(isoDate) {
  const d = new Date(isoDate + "T12:00:00");
  return d.toLocaleDateString("es-CR", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
}

// Suma minutos a una hora "HH:MM" y devuelve "HH:MM"
export function addMinutes(hhmm, minutes) {
  const [h, m] = hhmm.split(":").map(Number);
  const total = h * 60 + m + minutes;
  const wrapped = ((total % (24 * 60)) + 24 * 60) % (24 * 60);
  const hh = Math.floor(wrapped / 60).toString().padStart(2, "0");
  const mm = (wrapped % 60).toString().padStart(2, "0");
  return `${hh}:${mm}`;
}

// Recalcula en cascada la hora de cada bloque de un día a partir de una hora ancla.
// Cada bloque puede tener offsetMin (minutos desde el fin del bloque anterior)
// y durationMin (cuánto dura, para calcular el fin y encadenar el siguiente).
export function recalcDayBlocks(blocks, anchorTime) {
  let cursor = anchorTime;
  return blocks.map((b, i) => {
    if (i > 0) cursor = addMinutes(cursor, b.offsetMin || 0);
    const start = cursor;
    const end = b.durationMin ? addMinutes(start, b.durationMin) : null;
    if (end) cursor = end;
    return { ...b, start, end };
  });
}

export function haversineKm([lat1, lon1], [lat2, lon2]) {
  const toRad = (d) => (d * Math.PI) / 180;
  const R = 6371;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}
