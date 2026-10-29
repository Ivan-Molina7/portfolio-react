import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logoWhite from "../../assets/img/Logos/Logo_white.png";
import useTranslation from "../../hooks/useTranslation";
import { goToSection } from "./navigate";
import { SECTION_IDS } from "./useActiveSection";

const NAV_KEYS = ["inicio", "proyectos", "habilidades", "sobreMi", "contacto"];

export default function Header({ active }) {
  const { texts } = useTranslation();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const panelRef = useRef(null);
  const btnRef = useRef(null);

  const go = (id) => (e) => {
    setOpen(false);
    goToSection(e, id, pathname, navigate);
  };

  // menú mobile: Escape cierra, el scroll de la página se bloquea y el foco queda dentro del panel
  useEffect(() => {
    if (!open) return undefined;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const focusables = () => [btnRef.current, ...panelRef.current.querySelectorAll("a")];
    focusables()[1]?.focus();
    const onKey = (e) => {
      if (e.key === "Escape") {
        setOpen(false);
        btnRef.current?.focus();
      } else if (e.key === "Tab") {
        const f = focusables();
        const first = f[0];
        const last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  // si la ventana crece por encima del breakpoint mobile, el panel se cierra
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 901px)");
    const close = () => mq.matches && setOpen(false);
    mq.addEventListener("change", close);
    return () => mq.removeEventListener("change", close);
  }, []);

  return (
    <header className="hud-header">
      <Link to="/#hero" className="hud-header__logo" onClick={go("hero")} aria-label={texts.hud.irInicio}>
        {/* TODO: reemplazar por SVG o PNG >= 150px (pendiente de Ivan): el PNG de 50x54 se ve blando en pantallas densas */}
        <img src={logoWhite} alt="Iván Molina" height="42" />
      </Link>

      <nav className="hud-header__nav" aria-label={texts.hud.navegacion}>
        {NAV_KEYS.map((k, i) => (
          <a
            key={k}
            href={`/#${SECTION_IDS[i]}`}
            className="hud-link"
            aria-current={active === i ? "location" : undefined}
            onClick={go(SECTION_IDS[i])}
          >
            {texts.header[k]}
          </a>
        ))}
      </nav>

      <a href="/#contacto" className="hud-cta hud-header__cta" onClick={go("contacto")}>
        {texts.header.btnContacto}
      </a>

      <button
        ref={btnRef}
        type="button"
        className="hud-menu-btn"
        aria-expanded={open}
        aria-controls="hud-menu"
        aria-label={open ? texts.hud.menuCerrar : texts.hud.menuAbrir}
        onClick={() => setOpen((v) => !v)}
      >
        <span />
        <span />
        <span />
      </button>

      <div id="hud-menu" ref={panelRef} className="hud-menu" hidden={!open}>
        <nav aria-label={texts.hud.navegacion}>
          {NAV_KEYS.map((k, i) => (
            <a
              key={k}
              href={`/#${SECTION_IDS[i]}`}
              className="hud-link hud-menu__link"
              aria-current={active === i ? "location" : undefined}
              onClick={go(SECTION_IDS[i])}
            >
              {texts.header[k]}
            </a>
          ))}
        </nav>
        <a href="/#contacto" className="hud-cta" onClick={go("contacto")}>
          {texts.header.btnContacto}
        </a>
      </div>
    </header>
  );
}
