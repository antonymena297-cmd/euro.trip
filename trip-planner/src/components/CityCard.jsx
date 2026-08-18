import { useState } from "react";
import { BedDouble, UtensilsCrossed, Ticket, Calculator, Bus, MapPin } from "lucide-react";
import { formatCRC } from "../utils/format.js";
import { BUDGET_ITEMS } from "../data/itinerary.js";

const SUBTABS = [
  { id: "hospedaje", label: "Hospedaje", icon: BedDouble },
  { id: "comida", label: "Comida", icon: UtensilsCrossed },
  { id: "actividades", label: "Actividades", icon: Ticket },
  { id: "resumen", label: "Resumen", icon: Calculator }
];

export default function CityCard({ city }) {
  const [tab, setTab] = useState("hospedaje");
  const cityBudgetItems = BUDGET_ITEMS.filter((b) => b.cityId === city.id);
  const activitiesCost = city.activities.reduce((s, a) => s + (a.priceCRC || 0), 0);
  const lodgingCost = city.lodging?.priceCRC || 0;
  const foodCost = city.food?.budgetCRC || 0;
  const transportCost = cityBudgetItems
    .filter((b) => b.category === "Vuelos y transporte base")
    .reduce((s, b) => s + b.amountCRC, 0);
  const total = lodgingCost + foodCost + activitiesCost + transportCost;

  return (
    <div className="card-lodge overflow-hidden">
      <div className="px-5 pt-5 pb-4 border-b border-white/10">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="chip mb-2"><MapPin size={12} /> {city.country}</p>
            <h3 className="text-xl font-display font-semibold text-frost">{city.name}</h3>
            <p className="text-sm text-slate2 mt-0.5">{city.dateRange}</p>
          </div>
          <div className="text-right">
            <p className="font-mono text-[10px] uppercase tracking-wider text-slate2">Total ciudad</p>
            <p className="font-mono font-bold text-amber text-lg">{formatCRC(total)}</p>
          </div>
        </div>
      </div>

      <div className="flex gap-1 px-3 pt-3">
        {SUBTABS.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setTab(id)}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              tab === id ? "bg-pine text-amber" : "text-slate2 hover:text-frost"
            }`}
          >
            <Icon size={13} /> {label}
          </button>
        ))}
      </div>

      <div className="p-5 min-h-[180px]">
        {tab === "hospedaje" && (
          city.lodging ? (
            <div className="space-y-2 text-sm">
              <p className="font-semibold text-frost">{city.lodging.name}</p>
              <p className="text-slate2">{city.lodging.address}</p>
              <div className="grid grid-cols-2 gap-3 mt-3 font-mono text-xs">
                <div className="bg-white/5 rounded-lg p-2.5">
                  <p className="text-slate2 uppercase tracking-wide text-[10px]">Check-in</p>
                  <p className="text-frost mt-0.5">{city.lodging.checkin}</p>
                </div>
                <div className="bg-white/5 rounded-lg p-2.5">
                  <p className="text-slate2 uppercase tracking-wide text-[10px]">Check-out</p>
                  <p className="text-frost mt-0.5">{city.lodging.checkout}</p>
                </div>
              </div>
              <p className="text-amber font-mono font-semibold pt-2">{formatCRC(city.lodging.priceCRC)}</p>
              <p className="text-slate2 text-xs">{city.lodging.priceNote}</p>
            </div>
          ) : (
            <p className="text-slate2 text-sm">Ciudad de paso — sin alojamiento asignado.</p>
          )
        )}

        {tab === "comida" && (
          <div className="space-y-3 text-sm">
            <div className="flex items-center justify-between bg-white/5 rounded-lg p-3">
              <span className="text-slate2">Presupuesto estimado</span>
              <span className="font-mono font-semibold text-amber">{formatCRC(city.food.budgetCRC)}</span>
            </div>
            <p className="text-slate2 text-xs">{city.food.note}</p>
            <p className="text-slate2 text-xs flex items-start gap-1.5 pt-1"><Bus size={13} className="mt-0.5 shrink-0" /> {city.localTransport}</p>
          </div>
        )}

        {tab === "actividades" && (
          <ul className="space-y-3">
            {city.activities.map((a) => (
              <li key={a.name} className="flex justify-between gap-3 border-b border-white/5 pb-2.5 last:border-0">
                <div>
                  <p className="text-sm font-medium text-frost">{a.name}</p>
                  <p className="text-xs text-slate2 mt-0.5">{a.desc}</p>
                  <p className="text-[10px] font-mono text-slate2 uppercase tracking-wide mt-1">{a.duration}</p>
                </div>
                <span className="font-mono text-sm text-amber whitespace-nowrap">
                  {a.priceCRC ? formatCRC(a.priceCRC) : "Gratis"}
                </span>
              </li>
            ))}
          </ul>
        )}

        {tab === "resumen" && (
          <div className="space-y-2 text-sm">
            <Row label="Hospedaje" value={lodgingCost} />
            <Row label="Comida" value={foodCost} />
            <Row label="Actividades" value={activitiesCost} />
            {transportCost > 0 && <Row label="Transporte asociado" value={transportCost} />}
            <div className="flex justify-between pt-3 mt-2 border-t border-white/10 font-semibold">
              <span className="text-frost">Total</span>
              <span className="font-mono text-amber">{formatCRC(total)}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function Row({ label, value }) {
  return (
    <div className="flex justify-between">
      <span className="text-slate2">{label}</span>
      <span className="font-mono text-frost">{formatCRC(value)}</span>
    </div>
  );
}
