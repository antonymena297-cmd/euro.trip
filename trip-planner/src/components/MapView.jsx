import { useState, useMemo, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from "react-leaflet";
import L from "leaflet";
import { LocateFixed, ExternalLink, TramFront, ArrowRight } from "lucide-react";
import { CITIES, LEGS, DAYS } from "../data/itinerary.js";
import { formatCRC } from "../utils/format.js";

// Icono por defecto de Leaflet (evita el bug de rutas rotas con bundlers)
const cityIcon = new L.DivIcon({
  className: "",
  html: `<div style="width:14px;height:14px;border-radius:50%;background:#E3A857;border:2px solid #0F1B2D;box-shadow:0 0 0 2px rgba(227,168,87,.35)"></div>`,
  iconSize: [14, 14],
  iconAnchor: [7, 7]
});
const meIcon = new L.DivIcon({
  className: "",
  html: `<div style="width:16px;height:16px;border-radius:50%;background:#C1523B;border:3px solid white;box-shadow:0 0 0 6px rgba(193,82,59,.3)"></div>`,
  iconSize: [16, 16],
  iconAnchor: [8, 8]
});

function FlyTo({ coords }) {
  const map = useMap();
  useEffect(() => { if (coords) map.flyTo(coords, 8, { duration: 1 }); }, [coords]);
  return null;
}

function findNextLeg() {
  const today = new Date().toISOString().slice(0, 10);
  const upcoming = DAYS.find((d) => d.date >= today) || DAYS[0];
  const idx = DAYS.indexOf(upcoming);
  const relatedLeg = LEGS.find((l) => l.date === upcoming.date && l.from_coords && l.to_coords);
  return { day: upcoming, leg: relatedLeg, dayIndex: idx };
}

export default function MapView() {
  const [me, setMe] = useState(null);
  const [geoError, setGeoError] = useState(null);
  const [focusCoords, setFocusCoords] = useState(null);
  const { day, leg } = useMemo(findNextLeg, []);

  function activateGPS() {
    if (!navigator.geolocation) { setGeoError("Este navegador no soporta geolocalización."); return; }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const coords = [pos.coords.latitude, pos.coords.longitude];
        setMe(coords);
        setFocusCoords(coords);
        setGeoError(null);
      },
      () => setGeoError("No se pudo obtener tu ubicación. Revisá los permisos del navegador."),
      { enableHighAccuracy: true, timeout: 8000 }
    );
  }

  function gmapsLink(from, to) {
    if (!from || !to) return null;
    return `https://www.google.com/maps/dir/?api=1&origin=${from[0]},${from[1]}&destination=${to[0]},${to[1]}&travelmode=transit`;
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-display font-semibold text-frost mb-1">Mapa y navegación</h1>
      <p className="text-slate2 text-sm mb-6 max-w-xl">
        Ubicá tu posición GPS y mirá hacia dónde sigue el itinerario. Cada tramo entre ciudades
        tiene un botón directo para abrir la ruta en Google Maps.
      </p>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 card-lodge overflow-hidden">
          <div className="h-[420px] md:h-[520px]">
            <MapContainer center={[48.5, 10.5]} zoom={6} scrollWheelZoom style={{ height: "100%", width: "100%" }}>
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {CITIES.map((c) => (
                <Marker key={c.id} position={c.coords} icon={cityIcon}>
                  <Popup>
                    <strong>{c.name}</strong><br />{c.country}<br />{c.dateRange}
                  </Popup>
                </Marker>
              ))}
              {LEGS.filter((l) => l.from_coords && l.to_coords).map((l) => (
                <Polyline key={l.id} positions={[l.from_coords, l.to_coords]} pathOptions={{ color: "#8CA0AE", weight: 2, dashArray: "6 8" }} />
              ))}
              {leg && (
                <Polyline positions={[leg.from_coords, leg.to_coords]} pathOptions={{ color: "#E3A857", weight: 4 }} />
              )}
              {me && <Marker position={me} icon={meIcon}><Popup>Tu ubicación actual</Popup></Marker>}
              <FlyTo coords={focusCoords} />
            </MapContainer>
          </div>
        </div>

        <div className="space-y-4">
          <div className="card-lodge p-5">
            <button onClick={activateGPS} className="btn-primary w-full justify-center">
              <LocateFixed size={16} /> Activar mi ubicación GPS
            </button>
            {geoError && <p className="text-ember text-xs mt-2">{geoError}</p>}
            {me && <p className="text-slate2 text-xs mt-2 font-mono">{me[0].toFixed(4)}, {me[1].toFixed(4)}</p>}
          </div>

          <div className="card-lodge p-5">
            <p className="font-mono text-[10px] uppercase tracking-wide text-slate2 mb-1">Siguiente en el itinerario</p>
            <p className="font-display font-semibold text-frost">{day.title}</p>
            <p className="text-xs text-slate2 mt-1">{day.weekday} · {day.date}</p>
            {leg && (
              <div className="mt-3 pt-3 border-t border-white/10">
                <p className="text-sm text-frost flex items-center gap-1.5">
                  <TramFront size={14} className="text-amber" /> {leg.from} <ArrowRight size={12} /> {leg.to}
                </p>
                <p className="text-xs text-slate2 mt-1">{leg.mode}{leg.duration ? ` · ${leg.duration}` : ""}</p>
                {leg.priceCRC != null && <p className="text-xs font-mono text-amber mt-1">{formatCRC(leg.priceCRC)}</p>}
                <a
                  href={gmapsLink(me || leg.from_coords, leg.to_coords)}
                  target="_blank" rel="noreferrer"
                  className="btn-ghost mt-3 w-full justify-center !py-2 text-xs"
                >
                  Abrir ruta en Google Maps <ExternalLink size={13} />
                </a>
              </div>
            )}
          </div>

          <div className="card-lodge p-5">
            <p className="font-mono text-[10px] uppercase tracking-wide text-slate2 mb-2">Todos los trayectos</p>
            <ul className="space-y-2 max-h-64 overflow-y-auto pr-1">
              {LEGS.map((l) => (
                <li key={l.id} className="text-xs border-b border-white/5 pb-2 last:border-0">
                  <p className="text-frost">{l.from} → {l.to}</p>
                  <div className="flex items-center justify-between mt-0.5">
                    <span className="text-slate2">{l.mode}{l.duration ? ` · ${l.duration}` : ""}</span>
                    {l.from_coords && l.to_coords && (
                      <a href={gmapsLink(l.from_coords, l.to_coords)} target="_blank" rel="noreferrer" className="text-amber hover:underline">
                        Ver ruta
                      </a>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
