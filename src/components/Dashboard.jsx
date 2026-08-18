import { CITIES, TRIP_META, TOTAL_ESTIMATED_CRC } from "../data/itinerary.js";
import { formatCRC } from "../utils/format.js";
import CityCard from "./CityCard.jsx";

export default function Dashboard() {
  const activeCities = CITIES.filter((c) => c.nights > 0);
  const transitCities = CITIES.filter((c) => c.nights === 0);

  return (
    <div>
      <section className="max-w-6xl mx-auto px-4 pt-10 pb-8">
        <p className="chip mb-4">● {TRIP_META.days} días · {TRIP_META.nights} noches</p>
        <h1 className="text-3xl md:text-5xl font-display font-semibold text-frost leading-tight max-w-2xl">
          {TRIP_META.subtitle}, <em className="text-amber not-italic">de tren en tren.</em>
        </h1>
        <p className="text-slate2 mt-4 max-w-xl">
          Un cuaderno de ruta para {TRIP_META.travelers.join(" y ")}: castillos bávaros, aguas termales
          en Karlovy Vary y el Monte Pilatus bajo la nieve — con el presupuesto de cada parada a la mano.
        </p>
        <div className="mt-6 inline-flex items-baseline gap-2 bg-white/5 rounded-xl px-4 py-3 border border-white/10">
          <span className="font-mono text-xs uppercase tracking-wide text-slate2">Presupuesto estimado total</span>
          <span className="font-mono font-bold text-amber text-lg">{formatCRC(TOTAL_ESTIMATED_CRC)}</span>
        </div>
      </section>

      <div className="ridge-divider" />

      <section className="max-w-6xl mx-auto px-4 py-10">
        <h2 className="text-lg font-display font-semibold text-frost mb-1">Sedes principales</h2>
        <p className="text-slate2 text-sm mb-6">Ciudades donde hay al menos una noche de alojamiento.</p>
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
          {activeCities.map((city) => <CityCard key={city.id} city={city} />)}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 pb-16">
        <h2 className="text-lg font-display font-semibold text-frost mb-1">Paradas de paso</h2>
        <p className="text-slate2 text-sm mb-6">Sin alojamiento, pero con visitas puntuales el 30 de diciembre.</p>
        <div className="grid md:grid-cols-3 gap-5">
          {transitCities.map((city) => <CityCard key={city.id} city={city} />)}
        </div>
      </section>
    </div>
  );
}
