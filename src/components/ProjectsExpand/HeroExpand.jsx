import { useEffect, useRef, useState } from 'react';
import useTranslation from '../../hooks/useTranslation';
import { prefersReducedMotion } from '../../utils/motion';

const pad = (n) => String(n).padStart(2, '0');

// Proporción fija del marco (_detalle.scss .det-stage). Cada captura se ajusta según cuánto recortaría `cover` en ese marco:
// si es poco (<= MAX_CROP) llena el marco; si es mucho (capturas de celular, paneles muy anchos) se ve entera, centrada.
const FRAME_RATIO = 16 / 10;
const MAX_CROP = 0.2;
const fitOf = (d) => {
  if (!d) return null; // todavía sin medidas
  const r = d.w / d.h;
  const crop = 1 - Math.min(r, FRAME_RATIO) / Math.max(r, FRAME_RATIO);
  return crop <= MAX_CROP ? 'cover' : 'contain';
};

// Hero del detalle: bloque de texto (.det-txt, el que sigue la cápsula del fondo) y marco de la obra.
function HeroExpand({ top, titulo, descripcion, sitio, sitioLink, sitioDemo, behance, behanceLink, shots, logo, initials, txtRef }) {
  const { texts } = useTranslation();
  const t = texts.proyecto;
  const [shot, setShot] = useState(0);
  const [fading, setFading] = useState(false);
  const [dims, setDims] = useState({}); // src -> { w, h } medidos al cargar (sirve también para capturas externas)
  const timer = useRef(0);
  const total = shots.length;

  useEffect(() => () => clearTimeout(timer.current), []);

  const measure = (src, el) => {
    const w = el.naturalWidth;
    const h = el.naturalHeight;
    if (!w || !h) return;
    setDims((d) => (d[src] && d[src].w === w && d[src].h === h ? d : { ...d, [src]: { w, h } }));
  };

  // fundido de la imagen principal: sale, cambia a los 220ms y vuelve
  const pick = (n) => {
    if (n === shot || fading) return;
    if (prefersReducedMotion()) { setShot(n); return; }
    setFading(true);
    timer.current = setTimeout(() => { setShot(n); setFading(false); }, 220);
  };

  return (
    <section className="det-hero">
      <div className="det-txt" ref={txtRef}>
        {top}
        <h1 className="det-name">{titulo}</h1>
        <p className="det-desc">{descripcion}</p>
        <div className="det-cta">
          {sitio && (
            <a className="home-btn home-btn--solid" href={sitioLink} target="_blank" rel="noopener noreferrer">
              {sitioDemo ? t.btnDemo : t.btnVisitar}
            </a>
          )}
          {behance && (
            <a className="home-btn" href={behanceLink} target="_blank" rel="noopener noreferrer">
              {t.btnBehance}
            </a>
          )}
        </div>
      </div>

      <figure className="det-frame">
        <div className="det-main">
          {total > 0 ? (
            <div className="det-stage">
              <img
                className={['det-img', `is-${fitOf(dims[shots[shot]]) || 'pending'}`, fading && 'is-fading'].filter(Boolean).join(' ')}
                src={shots[shot]}
                alt={`${titulo} · ${shot + 1}/${total}`}
                onLoad={(e) => measure(shots[shot], e.currentTarget)}
              />
            </div>
          ) : (
            <div className="det-ph" role="img" aria-label={titulo}>
              {logo ? <img className="det-ph__logo" src={logo} alt="" /> : <span className="det-ph__ini">{initials || titulo}</span>}
              <small>{t.capturaPendiente}</small>
            </div>
          )}
        </div>
        {total > 1 && (
          <figcaption className="det-thumbs">
            <span className="det-count">{pad(shot + 1)} / {pad(total)}</span>
            {shots.map((src, n) => (
              <button
                key={src}
                type="button"
                className={`det-th${n === shot ? ' is-on' : ''}`}
                aria-label={`${t.verCaptura} ${n + 1}`}
                aria-pressed={n === shot}
                onClick={() => pick(n)}
              >
                <img className={fitOf(dims[src]) === 'contain' ? 'is-contain' : undefined} src={src} alt="" onLoad={(e) => measure(src, e.currentTarget)} />
              </button>
            ))}
          </figcaption>
        )}
      </figure>
    </section>
  );
}

export default HeroExpand;
