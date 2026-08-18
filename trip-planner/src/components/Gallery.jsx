import { useState } from "react";
import { Images, ChevronLeft, ChevronRight, X } from "lucide-react";
import { CITIES } from "../data/itinerary.js";

// Unsplash Source no requiere API key: genera una imagen relacionada con la
// búsqueda de texto. Si una imagen no carga, el <img onError> la oculta.
function unsplashUrl(query, seed) {
  return `https://source.unsplash.com/600x450/?${encodeURIComponent(query)}&sig=${seed}`;
}

export default function Gallery() {
  const [lightbox, setLightbox] = useState(null); // { images, index }

  const items = CITIES.flatMap((city) =>
    city.gallery.map((keyword, i) => ({
      cityId: city.id,
      cityName: city.name,
      keyword,
      src: unsplashUrl(keyword, `${city.id}-${i}`)
    }))
  );

  function openAt(index) {
    setLightbox({ index });
  }
  function close() {
    setLightbox(null);
  }
  function step(delta) {
    setLightbox((lb) => ({ index: (lb.index + delta + items.length) % items.length }));
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="flex items-center gap-2.5 mb-1">
        <Images className="text-amber" size={22} />
        <h1 className="text-2xl font-display font-semibold text-frost">Galería visual</h1>
      </div>
      <p className="text-slate2 text-sm mb-6 max-w-xl">
        Fotografías de referencia por parada del itinerario (vía Unsplash, sin necesidad de API key).
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {items.map((it, i) => (
          <button
            key={`${it.cityId}-${i}`}
            onClick={() => openAt(i)}
            className="group relative rounded-xl overflow-hidden aspect-[4/3] border border-white/10"
          >
            <img
              src={it.src}
              alt={`${it.cityName} — ${it.keyword}`}
              loading="lazy"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              onError={(e) => { e.currentTarget.style.display = "none"; }}
            />
            <span className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-night/90 to-transparent text-frost text-xs font-medium px-2.5 py-2">
              {it.cityName}
            </span>
          </button>
        ))}
      </div>

      {lightbox && (
        <div className="fixed inset-0 z-50 bg-night/95 flex items-center justify-center p-4" onClick={close}>
          <button onClick={close} className="absolute top-5 right-5 text-frost hover:text-amber"><X size={26} /></button>
          <button onClick={(e) => { e.stopPropagation(); step(-1); }} className="absolute left-4 md:left-10 text-frost hover:text-amber">
            <ChevronLeft size={32} />
          </button>
          <img
            src={items[lightbox.index].src}
            alt={items[lightbox.index].cityName}
            onClick={(e) => e.stopPropagation()}
            className="max-h-[80vh] max-w-[85vw] rounded-xl border border-white/10 object-contain"
          />
          <button onClick={(e) => { e.stopPropagation(); step(1); }} className="absolute right-4 md:right-10 text-frost hover:text-amber">
            <ChevronRight size={32} />
          </button>
          <p className="absolute bottom-6 text-frost font-mono text-xs">{items[lightbox.index].cityName}</p>
        </div>
      )}
    </div>
  );
}
