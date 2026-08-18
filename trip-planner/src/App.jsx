import { useState } from "react";
import Navbar from "./components/Navbar.jsx";
import Dashboard from "./components/Dashboard.jsx";
import SavingsTracker from "./components/SavingsTracker.jsx";
import MapView from "./components/MapView.jsx";
import ScheduleRecalculator from "./components/ScheduleRecalculator.jsx";
import Gallery from "./components/Gallery.jsx";
import ExportImport from "./components/ExportImport.jsx";

export default function App() {
  const [tab, setTab] = useState("dashboard");

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar active={tab} onChange={setTab} />

      <main className="flex-1">
        {tab === "dashboard" && <Dashboard />}
        {tab === "savings" && <SavingsTracker />}
        {tab === "map" && <MapView />}
        {tab === "schedule" && <ScheduleRecalculator />}
        {tab === "gallery" && <Gallery />}
      </main>

      <footer className="border-t border-white/10 mt-6">
        <div className="max-w-6xl mx-auto px-4 py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-slate2 font-mono">Ruta Invernal 2027–2028 · datos guardados en este navegador</p>
          <ExportImport />
        </div>
      </footer>
    </div>
  );
}
