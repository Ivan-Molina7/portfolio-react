import { createContext, useContext, useMemo, useRef } from "react";

// Estado de control del fondo. Vive en refs: el bucle de dibujo lo lee cada frame sin re-renderizar React.
const BackgroundContext = createContext(null);

export function BackgroundProvider({ children }) {
  const state = useRef({
    scene: 0, // 0..4 (índice de SECTIONS)
    snap: false, // el próximo frame aplica el estado de golpe
    detail: false, // proyecto expandido: golpe sobre la columnata
    variant: "home", // 'home' | 'galeria'
    capsuleEl: null, // elemento que sigue la cápsula (.dtxt)
    calm: 1, // objetivo de "calma" del detalle (1 - 0.28·p), lo escribe quien scrollea
    listeners: new Set(), // el motor se entera de cambios para redibujar en reduced-motion
  });

  const api = useMemo(() => {
    const s = state.current;
    const notify = () => s.listeners.forEach((fn) => fn());
    return {
      state: s,
      calmRef: {
        get current() {
          return s.calm;
        },
        set current(v) {
          s.calm = v;
        },
      },
      // snap: aplicar la escena de golpe, sin transición (carga directa a una sección)
      setScene(i, snap = false) {
        if (snap) s.snap = true;
        if (s.scene === i) return;
        s.scene = i;
        notify();
      },
      setDetail(v) {
        if (s.detail === !!v) return;
        s.detail = !!v;
        notify();
      },
      setVariant(v) {
        if (s.variant === v) return;
        s.variant = v;
        notify();
      },
      registerCapsule(el) {
        s.capsuleEl = el || null;
      },
      subscribe(fn) {
        s.listeners.add(fn);
        return () => s.listeners.delete(fn);
      },
    };
  }, []);

  return <BackgroundContext.Provider value={api}>{children}</BackgroundContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useBackground() {
  const ctx = useContext(BackgroundContext);
  if (!ctx) throw new Error("useBackground debe usarse dentro de <BackgroundProvider>");
  return ctx;
}
