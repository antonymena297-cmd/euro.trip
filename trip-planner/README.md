# Ruta Invernal · Trip Planner & Savings Tracker

App de planificación de viaje para dos personas (Anthony & Nati), generada a partir del
PDF "Plan de Viaje por Europa" (Alemania · República Checa · Suiza, 27 dic 2027 – 5 ene 2028).

React + Vite + Tailwind CSS + React-Leaflet (OpenStreetMap, sin API key paga) + Lucide icons.
Toda la data del usuario (meta de ahorro, aportes, horarios editados) se guarda en `localStorage`
del navegador, con exportación/importación en JSON de respaldo.

## 1. Requisitos

- Node.js 18+ y npm.

## 2. Instalación local

```bash
npm install
npm run dev
```

Abrí `http://localhost:5173`.

> Este `npm install` genera un `package-lock.json`. Subilo al repo junto con el resto del
> código (no está en `.gitignore`) — así los builds son reproducibles, tanto los tuyos
> como los que corre GitHub Actions.

## 3. Estructura del proyecto

```
src/
  data/itinerary.js        ← toda la info del PDF: ciudades, trenes, horarios, presupuesto
  components/
    Dashboard.jsx           ← pantalla principal, tarjetas por ciudad
    CityCard.jsx             ← hospedaje / comida / actividades / resumen financiero
    SavingsTracker.jsx        ← meta de ahorro + aportes + historial
    MapView.jsx                ← mapa Leaflet, GPS, ruta al siguiente destino
    ScheduleRecalculator.jsx    ← recalculo en cascada de horarios por día
    Gallery.jsx                  ← galería de fotos por ciudad (Unsplash Source)
    ExportImport.jsx              ← respaldo/restauración en JSON
  hooks/useLocalStorage.js
  utils/format.js            ← formato de colones, fechas y suma de horas
```

## 4. Datos que debés completar

El PDF original no incluye nombre/dirección de hoteles ni Airbnbs específicos, así que
esos campos quedan marcados como **"Por definir"** en `src/data/itinerary.js` dentro de
cada `lodging`. Edita ese archivo directamente para completarlos (no hace falta tocar
ningún otro componente).

También hay dos inconsistencias del documento original que se transcribieron tal cual,
señaladas con una nota en la app:

- La tabla maestra de presupuesto dice "Karlovy Vary (3 noches)" pero el itinerario día a
  día muestra 2 noches (31 dic. y 1 ene.).
- La tabla maestra asigna "Zúrich (2 noches: 2 y 4 de enero)" aunque el itinerario ubica el
  alojamiento esas noches en Múnich y Lucerna respectivamente.

Ajustá los montos en `BUDGET_ITEMS` (dentro de `itinerary.js`) si querés corregirlas.

## 5. Desplegar gratis en GitHub Pages (despliegue automático con GitHub Actions)

El proyecto ya incluye `.github/workflows/deploy.yml`: cada vez que hagas `git push` a
`main`, GitHub compila el sitio y lo publica solo — no hace falta correr ningún comando
de build a mano ni instalar nada localmente para actualizar el sitio.

**Paso 1 — Creá el repositorio**
En GitHub: *New repository* → nombre, por ejemplo `ruta-invernal` → **no** marques
"Add a README" (ya tenemos uno) → Create repository.

**Paso 2 — Ajustá el `base` al nombre real de tu repo**
Abrí `vite.config.js` y cambiá:
```js
base: '/ruta-invernal/',
```
por
```js
base: '/NOMBRE-DE-TU-REPO/',
```
(si tu repo se llama distinto a `ruta-invernal`). También actualizá `"homepage"` en
`package.json` con tu usuario real de GitHub.

**Paso 3 — Subí el código**
Desde la carpeta del proyecto, en tu computadora:
```bash
git init
git add .
git commit -m "Ruta Invernal trip planner"
git branch -M main
git remote add origin https://github.com/TU_USUARIO/NOMBRE-DE-TU-REPO.git
git push -u origin main
```

**Paso 4 — Activá GitHub Pages con "GitHub Actions" como fuente**
En tu repo: **Settings → Pages → Build and deployment → Source** → elegí
**"GitHub Actions"** (no "Deploy from a branch"). No hace falta nada más: el workflow
ya incluido se dispara solo con el push del paso 3.

**Paso 5 — Verificá el despliegue**
Andá a la pestaña **Actions** de tu repo: vas a ver el workflow "Deploy a GitHub Pages"
corriendo (tarda 1–2 minutos). Cuando termine en verde, tu sitio queda publicado en:
```
https://TU_USUARIO.github.io/NOMBRE-DE-TU-REPO/
```

**De ahí en adelante:** cada `git push` a `main` vuelve a compilar y republicar el sitio
automáticamente — por eso queda "vivo": no hay que repetir ningún paso manual de build
ni de deploy, solo editar y subir cambios.

## 6. PWA (instalable en el celular)

El proyecto usa `vite-plugin-pwa`. Al hacer `npm run build`, se genera un manifest e
service worker automáticos a partir de la configuración en `vite.config.js`, así que
cualquiera puede "Agregar a la pantalla de inicio" desde el navegador móvil.
Reemplazá `public/icon-192.png` y `public/icon-512.png` por tus propios íconos cuando
quieras (por ahora son un placeholder simple con la silueta de montaña del diseño).

## 7. Notas sobre la galería de fotos

`Gallery.jsx` usa `source.unsplash.com` (sin API key) para traer fotos relacionadas con
cada palabra clave definida en `gallery` dentro de `itinerary.js`. Si preferís fotos
propias, reemplazá esas URLs por imágenes que subas a `public/img/` y actualizá las rutas
en el componente.
