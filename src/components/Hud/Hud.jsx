import { useLocation } from "react-router-dom";
import Header from "./Header";
import SideDots from "./SideDots";
import SocialsHud from "./SocialsHud";
import LangSwitch from "./LangSwitch";
import useActiveSection from "./useActiveSection";

// HUD fijo, montado una sola vez en App: se ve igual en todas las rutas.
export default function Hud() {
  const { pathname } = useLocation();
  const isHome = pathname === "/";
  const sectionIdx = useActiveSection(isHome);
  // "Proyectos" queda activo en la galería y en el detalle; "Inicio" solo en / con #hero visible
  const active = isHome ? sectionIdx : pathname === "/galeriaProyectos" || pathname.startsWith("/proyecto/") ? 1 : -1;

  return (
    <div className="hud">
      <div className="hud__fade hud__fade--top" aria-hidden="true" />
      <div className="hud__fade hud__fade--bottom" aria-hidden="true" />
      <Header active={active} />
      <SideDots active={active} />
      <SocialsHud />
      <LangSwitch />
    </div>
  );
}
