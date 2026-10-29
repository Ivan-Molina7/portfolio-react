import { useLocation, useNavigate } from "react-router-dom";
import useTranslation from "../../hooks/useTranslation";
import { goToSection } from "./navigate";
import { SECTION_IDS } from "./useActiveSection";

const NAV_KEYS = ["inicio", "proyectos", "habilidades", "sobreMi", "contacto"];

export default function SideDots({ active }) {
  const { texts } = useTranslation();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  return (
    <nav className="hud-dots" aria-label={texts.hud.secciones}>
      {SECTION_IDS.map((id, i) => (
        <a
          key={id}
          href={`/#${id}`}
          className={`hud-dot${active === i ? " is-active" : ""}`}
          aria-label={`${texts.hud.irA} ${texts.header[NAV_KEYS[i]]}`}
          aria-current={active === i ? "location" : undefined}
          onClick={(e) => goToSection(e, id, pathname, navigate)}
        >
          <svg viewBox="0 0 26 26" width="26" height="26" aria-hidden="true">
            <path d="M13 1 25 13 13 25 1 13Z" />
            <path className="hud-dot__in" d="M13 7 13 19" />
          </svg>
        </a>
      ))}
    </nav>
  );
}
