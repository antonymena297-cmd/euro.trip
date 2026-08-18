import { useState } from "react";
import { CalendarClock, Clock3, RotateCcw } from "lucide-react";
import { DAYS, CITIES } from "../data/itinerary.js";
import { recalcDayBlocks, formatDateEs } from "../utils/format.js";
import { useLocalStorage } from "../hooks/useLocalStorage.js";

export default function ScheduleRecalculator() {
  const [dayIndex, setDayIndex] = useState(0);
  const [overrides, setOverrides] = useLocalStorage("rv_schedule_overrides", {});

  const day = DAYS[dayIndex];
  const city = CITIES.find((c) => c.id === day.cityId);
  const anchorBlock = day.blocks.find((b) => b.editable);
  const anchorTime = overrides[day.date] ?? anchorBlock?.defaultTime ?? "08:00";
  const blocks = recalcDayBlocks(day.blocks, anchorTime);

  function setAnchor(time) {
    setOverrides({ ...overrides, [day.date]: time });
  }
  function resetDay() {
    const next = { ...overrides };
    delete next[day.date];
    setOverrides(next);
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="flex items-center gap-2.5 mb-1">
        <CalendarClock className="text-amber" size={22} />
        <h1 className="text-2xl font-display font-semibold text-frost">Recalculadora de horarios</h1>
      </div>
      <p className="text-slate2 text-sm mb-6 max-w-xl">
        Cambiá la hora de llegada del vuelo o tren principal de cualquier día y el resto de las
        actividades se recalcula en cascada automáticamente.
      </p>

      <div className="flex gap-2 overflow-x-auto pb-2 mb-6 no-scrollbar">
        {DAYS.map((d, i) => (
          <button
            key={d.date}
            onClick={() => setDayIndex(i)}
            className={`shrink-0 px-3 py-2 rounded-lg text-xs font-mono transition-colors ${
              i === dayIndex ? "bg-pine text-amber" : "bg-white/5 text-slate2 hover:text-frost"
            }`}
          >
            {d.date.slice(8, 10)}/{d.date.slice(5, 7)}
          </button>
        ))}
      </div>

      <div className="card-lodge p-6">
        <p className="chip mb-2">{city?.name ?? "Ruta"}</p>
        <h2 className="text-lg font-display font-semibold text-frost">{day.title}</h2>
        <p className="text-sm text-slate2 mb-5">{formatDateEs(day.date)}</p>

        {anchorBlock && (
          <div className="flex items-center gap-3 bg-white/5 rounded-xl p-4 mb-6">
            <Clock3 size={18} className="text-amber shrink-0" />
            <div className="flex-1">
              <p className="text-xs font-mono uppercase tracking-wide text-slate2">{anchorBlock.label}</p>
              <input
                type="time"
                value={anchorTime}
                onChange={(e) => setAnchor(e.target.value)}
                className="bg-white/10 border border-white/20 rounded-lg px-3 py-1.5 mt-1 font-mono text-frost"
              />
            </div>
            <button onClick={resetDay} className="text-slate2 hover:text-amber flex items-center gap-1 text-xs">
              <RotateCcw size={13} /> Restablecer
            </button>
          </div>
        )}

        <ol className="relative pl-6">
          <div className="route-ribbon absolute left-[7px] top-1 bottom-1" />
          {blocks.map((b) => (
            <li key={b.key} className="relative pb-6 last:pb-0">
              <div className="absolute -left-6 top-0.5 w-3.5 h-3.5 rounded-full bg-amber border-2 border-night" />
              <div className="flex items-baseline gap-3">
                <span className="font-mono font-bold text-amber text-sm w-14 shrink-0">{b.start}</span>
                <div>
                  <p className="text-sm text-frost">{b.label}</p>
                  {b.end && <p className="text-xs text-slate2 font-mono">hasta {b.end}</p>}
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
