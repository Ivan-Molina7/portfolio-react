import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import useTranslation from "../hooks/useTranslation";
import { projectsData } from "../utils/projectsData";
import { INITIALS, PROJECT_ORDER, logoOf } from "../utils/projectAssets";
import { prefersReducedMotion } from "../utils/motion";

const OUT_MS = 230; // salida de las cards al filtrar (la transición CSS dura 220ms)

// Los 10 proyectos en el orden de PROJECT_ORDER (utils/projectAssets.js). "Destacado" sale de `featured`.
const PROJECTS = PROJECT_ORDER.map((id) => projectsData.find((p) => p.id === id));
const FILTERS = ["all", "trabajo", "proyecto"];
const matches = (p, f) => f === "all" || p.tipo === f;
const COUNTS = Object.fromEntries(FILTERS.map((f) => [f, PROJECTS.filter((p) => matches(p, f)).length]));

export const ProjectsGallery = () => {
  const { texts } = useTranslation();
  const g = texts.galeria;
  const [filter, setFilter] = useState("all"); // pestaña elegida (cambia al instante)
  const [shown, setShown] = useState("all"); // filtro de la lista dibujada (cambia tras la salida)
  const [out, setOut] = useState(false);
  const [again, setAgain] = useState(false); // tras filtrar, la entrada escalona de a 0.06s sin la espera inicial
  const [cycle, setCycle] = useState(0); // reinicia las cards para repetir su entrada
  const timer = useRef(0);

  // al llegar desde Proyectos (scroll ~900) la galería debe abrir arriba, sin animar
  useLayoutEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);
  useEffect(() => () => clearTimeout(timer.current), []);

  const select = (f) => {
    if (f === filter) return;
    setFilter(f);
    clearTimeout(timer.current); // clics rápidos: solo cuenta el último
    const apply = () => {
      setShown(f);
      setAgain(true);
      setCycle((c) => c + 1);
      setOut(false);
    };
    if (prefersReducedMotion()) { apply(); return; }
    setOut(true);
    timer.current = setTimeout(apply, OUT_MS);
  };

  const label = (f) => (f === "all" ? g.todos : f === "trabajo" ? texts.proyectos.trabajosTitulo : texts.proyectos.proyectosPersonalesTitulo);
  const list = PROJECTS.filter((p) => matches(p, shown));

  return (
    <main className="gal">
      <Link className="gal__back" to="/#proyectos">{texts.header.proyectos}</Link>
      <h1 className="gal__title">{g.titulo}</h1>
      <p className="gal__sub">{g.subtitulo}</p>

      <div className="gal__bar">
        <div className="gal__tabs" role="tablist" aria-label={g.filtrar}>
          {FILTERS.map((f) => (
            <button
              key={f}
              type="button"
              role="tab"
              aria-selected={f === filter}
              aria-controls="gal-grid"
              className={`gal__tab${f === filter ? " is-on" : ""}`}
              onClick={() => select(f)}
            >
              {label(f)}<sup>{COUNTS[f]}</sup>
            </button>
          ))}
        </div>
        <span className="gal__cnt" aria-live="polite">{list.length} {list.length === 1 ? g.proyecto : g.proyectos}</span>
      </div>

      <div id="gal-grid" role="tabpanel" className={`gal__grid${again ? " again" : ""}${out ? " out" : ""}`}>
        {list.map((p, i) => {
          const logo = logoOf(p.id);
          // TODO: Facu Trainer y MegaStrong no tienen logo todavía: se muestran las iniciales.
          const tag = p.featured ? texts.proyecto.destacado : p.enDesarrollo ? texts.proyecto.enDesarrollo : null;
          return (
            <Link
              key={`${cycle}-${p.id}`}
              className={`gcard${p.featured ? " gcard--dest" : ""}`}
              to={`/proyecto/${p.id}`}
              style={{ "--i": i }}
              aria-label={[p.titulo, tag].filter(Boolean).join(" · ")}
            >
              <span className={`gcard__tag${p.featured ? " gcard__tag--dest" : ""}`}>{tag || " "}</span>
              <div className="gcard__logo">
                {logo ? <img src={logo} alt="" /> : <span className="gcard__mono">{INITIALS[p.id] || p.titulo}</span>}
              </div>
              <div className="gcard__nm">{p.titulo}</div>
              <span className="gcard__btn" aria-hidden="true">{texts.proyectos.expandirBtn}</span>
            </Link>
          );
        })}
      </div>
    </main>
  );
};
