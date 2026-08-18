import { useState, useMemo } from "react";
import { Plus, Trash2, PiggyBank, Pencil } from "lucide-react";
import { useLocalStorage } from "../hooks/useLocalStorage.js";
import { formatCRC } from "../utils/format.js";
import { TOTAL_ESTIMATED_CRC, TRIP_META, BUDGET_NOTE } from "../data/itinerary.js";

export default function SavingsTracker() {
  const [goal, setGoal] = useLocalStorage("rv_goal_crc", TOTAL_ESTIMATED_CRC);
  const [contributions, setContributions] = useLocalStorage("rv_contributions", []);
  const [editingGoal, setEditingGoal] = useState(false);
  const [goalDraft, setGoalDraft] = useState(goal);

  const [name, setName] = useState(TRIP_META.travelers[0]);
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");

  const saved = useMemo(() => contributions.reduce((s, c) => s + c.amount, 0), [contributions]);
  const pct = goal > 0 ? Math.min(100, Math.round((saved / goal) * 100)) : 0;
  const pending = Math.max(0, goal - saved);

  function addContribution(e) {
    e.preventDefault();
    const value = Number(amount);
    if (!value || value <= 0) return;
    setContributions([
      { id: crypto.randomUUID(), name, amount: value, note, date: new Date().toISOString() },
      ...contributions
    ]);
    setAmount("");
    setNote("");
  }

  function removeContribution(id) {
    setContributions(contributions.filter((c) => c.id !== id));
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="flex items-center gap-2.5 mb-1">
        <PiggyBank className="text-amber" size={22} />
        <h1 className="text-2xl font-display font-semibold text-frost">Meta de ahorro</h1>
      </div>
      <p className="text-slate2 text-sm mb-6 max-w-xl">{BUDGET_NOTE}</p>

      <div className="card-lodge p-6">
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="font-mono text-xs uppercase tracking-wide text-slate2">Meta total</p>
            {editingGoal ? (
              <form
                onSubmit={(e) => { e.preventDefault(); setGoal(Number(goalDraft) || goal); setEditingGoal(false); }}
                className="flex items-center gap-2 mt-1"
              >
                <input
                  autoFocus
                  type="number"
                  value={goalDraft}
                  onChange={(e) => setGoalDraft(e.target.value)}
                  className="bg-white/10 border border-white/20 rounded-lg px-2 py-1 font-mono text-frost w-40"
                />
                <button className="btn-primary !px-3 !py-1.5 text-xs">Guardar</button>
              </form>
            ) : (
              <div className="flex items-center gap-2">
                <p className="text-2xl font-mono font-bold text-frost">{formatCRC(goal)}</p>
                <button onClick={() => { setGoalDraft(goal); setEditingGoal(true); }} className="text-slate2 hover:text-amber">
                  <Pencil size={14} />
                </button>
              </div>
            )}
          </div>
          <div className="text-right">
            <p className="font-mono text-xs uppercase tracking-wide text-slate2">Ahorrado</p>
            <p className="text-2xl font-mono font-bold text-amber">{formatCRC(saved)}</p>
          </div>
        </div>

        <div className="h-3 rounded-full bg-white/10 overflow-hidden mt-4">
          <div
            className="h-full bg-gradient-to-r from-pine-light to-amber transition-all duration-500"
            style={{ width: `${pct}%` }}
          />
        </div>
        <div className="flex justify-between mt-2 text-xs font-mono text-slate2">
          <span>{pct}% completado</span>
          <span>Pendiente: {formatCRC(pending)}</span>
        </div>
      </div>

      <form onSubmit={addContribution} className="card-lodge p-6 mt-6">
        <p className="font-display font-semibold text-frost mb-4">+ Agregar aporte</p>
        <div className="grid sm:grid-cols-4 gap-3">
          <select value={name} onChange={(e) => setName(e.target.value)} className="bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-sm">
            {TRIP_META.travelers.map((t) => <option key={t}>{t}</option>)}
          </select>
          <input
            type="number" placeholder="Monto (₡)" value={amount} onChange={(e) => setAmount(e.target.value)}
            className="bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-sm font-mono sm:col-span-1"
          />
          <input
            type="text" placeholder="Nota (opcional)" value={note} onChange={(e) => setNote(e.target.value)}
            className="bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-sm sm:col-span-2"
          />
        </div>
        <button className="btn-primary mt-4"><Plus size={16} /> Registrar aporte</button>
      </form>

      <div className="mt-6">
        <p className="font-display font-semibold text-frost mb-3">Historial de aportes</p>
        {contributions.length === 0 ? (
          <p className="text-slate2 text-sm">Todavía no hay aportes registrados. El primero que agreguen aparecerá aquí.</p>
        ) : (
          <ul className="space-y-2">
            {contributions.map((c) => (
              <li key={c.id} className="card-lodge px-4 py-3 flex items-center justify-between">
                <div>
                  <p className="text-sm text-frost"><span className="font-semibold">{c.name}</span> {c.note && `· ${c.note}`}</p>
                  <p className="text-xs font-mono text-slate2">{new Date(c.date).toLocaleString("es-CR")}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-mono text-amber font-semibold">{formatCRC(c.amount)}</span>
                  <button onClick={() => removeContribution(c.id)} className="text-slate2 hover:text-ember">
                    <Trash2 size={15} />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
