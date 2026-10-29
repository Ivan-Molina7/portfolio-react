// Ir a una sección de Home. En Home: scroll suave (el fondo transiciona directo a la escena elegida).
// En otras rutas: navegar a /#id (Home hace el salto al montar).
export function goToSection(e, id, pathname, navigate) {
  if (e) {
    if (e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button > 0) return;
    e.preventDefault();
  }
  if (pathname === "/") {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  } else {
    navigate(`/#${id}`);
  }
}
