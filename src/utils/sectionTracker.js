// Sección de Home que ocupa la línea del 50% del viewport. Única fuente de verdad: la usan el HUD
// (useActiveSection) y el fondo (useRouteSync), así que no pueden desincronizarse entre sí.

export const SECTION_IDS = ["hero", "proyectos", "habilidades", "about", "contacto"];

// Índice de la sección bajo la línea (-1 si ninguna). Se calcula siempre desde las medidas actuales con un
// intervalo semiabierto [top, bottom): en un límite exacto gana la de abajo, sin depender del orden de eventos.
export function sectionAtLine() {
  const line = window.innerHeight / 2;
  for (let i = 0; i < SECTION_IDS.length; i++) {
    const el = document.getElementById(SECTION_IDS[i]);
    if (!el) continue;
    const r = el.getBoundingClientRect();
    if (r.top <= line && line < r.bottom) return i;
  }
  return -1;
}

// Avisa con onChange(idx) cuando cambia la sección bajo la línea (la primera vez siempre avisa).
// onAttach(els) se llama una vez, con las secciones ya montadas y antes de la primera lectura (p. ej. para saltar a un ancla).
// El IntersectionObserver solo dispara el recálculo; también se recalcula al cambiar el tamaño de la ventana.
// Devuelve la función de limpieza.
export function observeActiveSection(onChange, onAttach) {
  let observer = null;
  let timer = 0;
  let tries = 0;
  let last = -2;
  let disposed = false;

  const update = () => {
    if (disposed) return;
    const idx = sectionAtLine();
    if (idx !== last) {
      last = idx;
      onChange(idx);
    }
  };

  const attach = () => {
    if (disposed) return;
    const els = SECTION_IDS.map((id) => document.getElementById(id));
    if (els.some((el) => !el) && tries++ < 20) {
      timer = window.setTimeout(attach, 100); // las secciones se montan junto con Home
      return;
    }
    observer = new IntersectionObserver(update, { rootMargin: "-50% 0px -50% 0px", threshold: 0 });
    els.forEach((el) => el && observer.observe(el));
    window.addEventListener("resize", update);
    if (onAttach) onAttach(els);
    update();
  };
  attach();

  return () => {
    disposed = true;
    window.clearTimeout(timer);
    window.removeEventListener("resize", update);
    if (observer) observer.disconnect();
  };
}
