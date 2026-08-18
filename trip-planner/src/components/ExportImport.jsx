import { useRef } from "react";
import { Download, Upload } from "lucide-react";

const KEYS = ["rv_goal_crc", "rv_contributions", "rv_schedule_overrides"];

export default function ExportImport() {
  const fileRef = useRef(null);

  function exportJSON() {
    const data = {};
    KEYS.forEach((k) => {
      const raw = window.localStorage.getItem(k);
      if (raw !== null) data[k] = JSON.parse(raw);
    });
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `ruta-invernal-respaldo-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  function triggerImport() {
    fileRef.current?.click();
  }

  function handleFile(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const data = JSON.parse(reader.result);
        KEYS.forEach((k) => {
          if (data[k] !== undefined) window.localStorage.setItem(k, JSON.stringify(data[k]));
        });
        window.location.reload();
      } catch {
        alert("El archivo no es un respaldo válido de Ruta Invernal.");
      }
    };
    reader.readAsText(file);
    e.target.value = "";
  }

  return (
    <div className="flex items-center gap-2">
      <button onClick={exportJSON} className="btn-ghost !px-3 !py-1.5 text-xs">
        <Download size={13} /> Exportar respaldo
      </button>
      <button onClick={triggerImport} className="btn-ghost !px-3 !py-1.5 text-xs">
        <Upload size={13} /> Importar
      </button>
      <input ref={fileRef} type="file" accept="application/json" onChange={handleFile} className="hidden" />
    </div>
  );
}
