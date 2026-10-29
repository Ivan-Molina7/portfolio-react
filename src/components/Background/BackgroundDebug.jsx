import { useEffect, useRef, useState } from "react";
import { useBackground } from "./BackgroundContext.jsx";
import { SECTIONS } from "./scenes.js";

// Solo DEV (ruta /__bg): selector de escena y de detalle para comparar contra el prototipo.
// Las rutas reales fijan escena/variante; aca se pisan a mano (RouteSync no actua en /__bg).
export default function BackgroundDebug() {
  const bg = useBackground();
  const [scene, setScene] = useState(0);
  const [detail, setDetail] = useState(false);
  const [gallery, setGallery] = useState(false);
  const capRef = useRef(null);

  useEffect(() => {
    bg.registerCapsule(capRef.current);
    return () => bg.registerCapsule(null);
  }, [bg]);
  useEffect(() => { bg.setScene(scene); }, [bg, scene]);
  useEffect(() => { bg.setDetail(detail); }, [bg, detail]);
  useEffect(() => { bg.setVariant(gallery ? "galeria" : "home"); }, [bg, gallery]);
  useEffect(() => () => { bg.setDetail(false); bg.setVariant("home"); }, [bg]);

  return (
    <div style={{ position: "fixed", inset: 0, color: "#f2f5f3", font: "14px Lato, sans-serif" }}>
      <div style={{ position: "absolute", left: 28, top: 90, display: "flex", gap: 8, flexWrap: "wrap", maxWidth: 560 }}>
        {SECTIONS.map((s, i) => (
          <button key={s.name} type="button" aria-pressed={scene === i} onClick={() => setScene(i)}
            style={{ padding: "6px 10px", background: scene === i ? "#0a6b36" : "transparent", color: "inherit", border: "1px solid rgba(255,255,255,.4)" }}>
            {i} {s.name}
          </button>
        ))}
        <label><input type="checkbox" checked={detail} onChange={(e) => setDetail(e.target.checked)} /> detalle</label>
        <label><input type="checkbox" checked={gallery} onChange={(e) => setGallery(e.target.checked)} /> galería</label>
      </div>
      <div ref={capRef} className="dtxt"
        style={{ position: "absolute", left: 28, top: "30%", width: "34vw", height: 300, border: "1px dashed rgba(255,255,255,.25)", padding: 16 }}>
        .dtxt (cápsula de prueba)
      </div>
    </div>
  );
}
