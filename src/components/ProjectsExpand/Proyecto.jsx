import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Faq from './Faq';
import HeroExpand from './HeroExpand';
import Objetivos from './Objetivos';
import Tecnologias from './Tecnologias';
import { useBackground } from '../Background/BackgroundContext';
import useTranslation from '../../hooks/useTranslation';
import { projectsData } from '../../utils/projectsData';
import { getTextFromKey } from '../../utils/getTextFromKey';
import { INITIALS, PROJECT_ORDER, logoOf, shotsOf } from '../../utils/projectAssets';
import { prefersReducedMotion } from '../../utils/motion';

const SWAP_MS = 420; // fundido entre proyectos (el fondo no se toca)
const EXIT_MS = 650; // espera al salir: el resorte del fondo se retrae (ω=7, ~0.8s) antes de mostrar el Home

// Red de seguridad para las salidas que la página no controla (botón atrás, logo, HUD): al desmontarse el
// detalle, el Home queda oculto EXIT_MS (html[data-hold], ver _detalle.scss). Las salidas propias ya esperaron.
let skipHold = false;
let holdTimer = 0;
function holdHome() {
  if (prefersReducedMotion()) return;
  const root = document.documentElement;
  root.setAttribute('data-hold', '');
  clearTimeout(holdTimer);
  holdTimer = setTimeout(() => root.removeAttribute('data-hold'), EXIT_MS);
}

const modified = (e) => e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button > 0;
const byId = (id) => projectsData.find((p) => p.id === id);

function Proyecto() {
  const { id } = useParams();
  const navigate = useNavigate();
  const bg = useBackground();
  const { texts } = useTranslation();
  const t = texts.proyecto;

  const proyecto = projectsData.find((p) => String(p.id) === id);
  const pid = proyecto?.id;

  const scrollRef = useRef(null);
  const txtRef = useRef(null);
  const busy = useRef(false);
  const timers = useRef([]);
  const [phase, setPhase] = useState('idle'); // idle | swapping | leaving

  const later = (fn, ms) => { timers.current.push(setTimeout(fn, ms)); };

  // montaje/desmontaje de la página
  useEffect(() => {
    document.documentElement.removeAttribute('data-hold');
    skipHold = false;
    const pending = timers.current;
    return () => {
      pending.forEach(clearTimeout);
      bg.calmRef.current = 1;
      if (!skipHold) holdHome();
    };
  }, [bg]);

  // la cápsula del fondo sigue al bloque de texto del hero (el motor lo mide en cada frame)
  useEffect(() => {
    if (!pid) return undefined;
    bg.registerCapsule(txtRef.current);
    return () => bg.registerCapsule(null);
  }, [bg, pid]);

  // el fondo se apaga al bajar del hero: calm = 1 - 0.28·p
  useEffect(() => {
    const el = scrollRef.current;
    if (!el || !pid) return undefined;
    const update = () => {
      const h = el.querySelector('.det-hero')?.offsetHeight || 500;
      const p = Math.min(1, Math.max(0, (el.scrollTop - 0.1 * h) / (0.9 * h)));
      bg.calmRef.current = 1 - 0.28 * p;
    };
    update();
    el.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      el.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, [bg, pid]);

  // aparición al hacer scroll
  useEffect(() => {
    const root = scrollRef.current;
    if (!root || !pid) return undefined;
    const nodes = [...root.querySelectorAll('.det-rv')];
    if (prefersReducedMotion() || !('IntersectionObserver' in window)) {
      nodes.forEach((n) => n.classList.add('is-in'));
      return undefined;
    }
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); }
      }),
      { root, threshold: 0.12 },
    );
    nodes.forEach((n) => io.observe(n));
    return () => io.disconnect();
  }, [pid]);

  if (!proyecto) {
    return (
      <div className="det-scroll">
        <div className="det-wrap">
          <p className="det-desc">{texts.error.proyectoNoEncontrado}</p>
          <div className="det-cta">
            <Link className="home-btn home-btn--solid" to="/#proyectos">{texts.error.volver}</Link>
          </div>
        </div>
      </div>
    );
  }

  // anterior / siguiente: solo cambia el contenido (fundido de SWAP_MS). La ruta se reemplaza, así "atrás"
  // sigue volviendo a la galería y el fondo no se entera.
  const goProject = (e, targetId) => {
    if (modified(e)) return;
    e.preventDefault();
    if (busy.current || targetId === pid) return;
    busy.current = true;
    const swap = () => {
      navigate(`/proyecto/${targetId}`, { replace: true });
      if (scrollRef.current) scrollRef.current.scrollTop = 0;
      setPhase('idle');
      busy.current = false;
    };
    if (prefersReducedMotion()) { swap(); return; }
    setPhase('swapping');
    later(swap, SWAP_MS);
  };

  // salida a la galería del Home: el resorte empieza a retraerse ya, el contenido se funde, y recién a los
  // EXIT_MS se navega (el Home aparece cuando la cápsula casi terminó de salir)
  const leave = (e) => {
    if (modified(e)) return;
    e.preventDefault();
    if (busy.current) return;
    busy.current = true;
    bg.setDetail(false);
    const go = () => { skipHold = true; navigate('/#proyectos'); };
    if (prefersReducedMotion()) { go(); return; }
    setPhase('leaving');
    later(go, EXIT_MS);
  };

  const i = PROJECT_ORDER.indexOf(pid);
  const nextId = PROJECT_ORDER[(i + 1) % PROJECT_ORDER.length];
  const prevId = PROJECT_ORDER[(i - 1 + PROJECT_ORDER.length) % PROJECT_ORDER.length];
  const next = byId(nextId);
  const prev = byId(prevId);
  const nextLogo = logoOf(nextId);

  const kind = proyecto.tipo === 'trabajo' ? t.tipoTrabajo : t.tipoPersonal;
  const tag = [kind, proyecto.featured && t.destacado, proyecto.enDesarrollo && t.enDesarrollo].filter(Boolean).join(' · ');

  const objetivos = [1, 2, 3].map((n) => getTextFromKey(texts, proyecto[`objetivo${n}Key`]));
  const preguntas = [1, 2, 3].map((n) => ({
    q: getTextFromKey(texts, proyecto[`pregunta${n}Key`]),
    a: getTextFromKey(texts, proyecto[`respuesta${n}Key`]),
  }));

  return (
    <div className={`det-scroll${phase === 'idle' ? '' : ` is-${phase}`}`} ref={scrollRef}>
      <div className="det-wrap" key={pid}>
        <div className="det-top">
          <Link className="det-back" to="/#proyectos" onClick={leave}>{texts.header.proyectos}</Link>
          <span className="det-tag">{tag}</span>
        </div>

        <HeroExpand
          titulo={proyecto.titulo}
          descripcion={getTextFromKey(texts, proyecto.descripcionKey)}
          sitio={proyecto.sitio}
          sitioLink={proyecto.sitioLink}
          behance={proyecto.behance}
          behanceLink={proyecto.behanceLink}
          shots={shotsOf(pid)}
          logo={logoOf(pid)}
          initials={INITIALS[pid]}
          txtRef={txtRef}
        />

        <Objetivos items={objetivos} />
        <Tecnologias tecnologias={proyecto.tecnologias} />
        <Faq items={preguntas} />

        <nav className="det-end det-rv">
          <Link className="det-next" to={`/proyecto/${nextId}`} onClick={(e) => goProject(e, nextId)}>
            <small>{t.siguiente}</small>
            <b>{next.titulo}</b>
            {nextLogo && <img className="det-next__img" src={nextLogo} alt="" />}
          </Link>
          <div className="det-sub">
            <Link className="det-prev" to={`/proyecto/${prevId}`} onClick={(e) => goProject(e, prevId)}>
              <small>{t.anterior}</small>
              {prev.titulo}
            </Link>
            <Link className="det-all" to="/#proyectos" onClick={leave}>{t.verTodos}</Link>
          </div>
        </nav>
      </div>
    </div>
  );
}

export default Proyecto;
