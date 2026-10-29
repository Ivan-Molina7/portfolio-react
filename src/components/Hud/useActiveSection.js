import { useEffect, useState } from "react";
import { observeActiveSection } from "../../utils/sectionTracker";

export { SECTION_IDS } from "../../utils/sectionTracker";

// Sección de Home bajo la línea del 50% del viewport (-1 si no aplica). El cálculo es el mismo que usa el
// fondo (utils/sectionTracker), pero sin debounce: el HUD responde al instante.
export default function useActiveSection(enabled) {
  const [active, setActive] = useState(-1);

  useEffect(() => {
    if (!enabled) {
      setActive(-1);
      return undefined;
    }
    return observeActiveSection(setActive);
  }, [enabled]);

  return active;
}
