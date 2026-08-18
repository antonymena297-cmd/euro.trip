import { Mountain, Wallet, Map as MapIcon, CalendarClock, Images, LayoutGrid } from "lucide-react";

const TABS = [
  { id: "dashboard", label: "Ciudades", icon: LayoutGrid },
  { id: "savings", label: "Ahorro", icon: Wallet },
  { id: "map", label: "Mapa", icon: MapIcon },
  { id: "schedule", label: "Horarios", icon: CalendarClock },
  { id: "gallery", label: "Galería", icon: Images }
];

export default function Navbar({ active, onChange }) {
  return (
    <header className="sticky top-0 z-40 bg-night/90 backdrop-blur border-b border-white/10">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-amber to-ember grid place-items-center rotate-[-4deg] shadow-lodge">
              <Mountain size={18} className="text-night" strokeWidth={2.5} />
            </div>
            <div className="leading-tight">
              <p className="font-display font-semibold text-frost text-sm md:text-base">Ruta Invernal</p>
              <p className="font-mono text-[10px] uppercase tracking-wider text-slate2">27 dic — 5 ene</p>
            </div>
          </div>
          <nav className="flex gap-1 overflow-x-auto no-scrollbar">
            {TABS.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => onChange(id)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs md:text-sm font-medium whitespace-nowrap transition-colors ${
                  active === id ? "bg-pine text-amber" : "text-slate2 hover:text-frost"
                }`}
              >
                <Icon size={15} />
                <span className="hidden sm:inline">{label}</span>
              </button>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}
