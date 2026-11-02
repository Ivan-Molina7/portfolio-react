import { useEffect, useRef } from "react";
import useTranslation from "../../hooks/useTranslation";

const FOCUSABLE = 'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])';

// Modal de títulos de Sobre mí. Diálogo accesible: role="dialog" + aria-modal, foco atrapado, Escape cierra,
// el foco vuelve a quien lo abrió y el scroll de la página queda bloqueado mientras está abierto.
export default function Modal({ isOpen, closeModal, content }) {
  const { texts } = useTranslation();
  const m = texts.modalTimeline;
  const panelRef = useRef(null);
  const closeBtnRef = useRef(null);
  const closeFn = useRef(closeModal);
  const open = isOpen && Boolean(content);

  // el padre pasa una función nueva en cada render: el efecto de abajo no debe reiniciarse por eso
  useEffect(() => {
    closeFn.current = closeModal;
  });

  useEffect(() => {
    if (!open) return undefined;
    const opener = document.activeElement;
    const root = document.documentElement;
    const prevOverflow = root.style.overflow;
    root.style.overflow = "hidden"; // en html, no en body: html ya tiene overflow-x y es quien scrollea
    closeBtnRef.current?.focus();

    const onKey = (e) => {
      if (e.key === "Escape") {
        closeFn.current();
        return;
      }
      if (e.key !== "Tab" || !panelRef.current) return;
      const f = panelRef.current.querySelectorAll(FOCUSABLE);
      if (!f.length) {
        e.preventDefault();
        return;
      }
      const first = f[0];
      const last = f[f.length - 1];
      if (!panelRef.current.contains(document.activeElement)) {
        e.preventDefault();
        first.focus();
      } else if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);

    return () => {
      document.removeEventListener("keydown", onKey);
      root.style.overflow = prevOverflow;
      if (opener && typeof opener.focus === "function") opener.focus(); // devuelve el foco a quien abrió el modal
    };
  }, [open]);

  if (!open) return null;

  return (
    <div
      className="modal-bg"
      onClick={(e) => {
        if (e.target === e.currentTarget) closeModal(); // clic fuera del panel
      }}
    >
      <div className="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title" ref={panelRef}>
        <button type="button" className="modal__close" ref={closeBtnRef} aria-label={m.cerrar} onClick={closeModal}>
          <svg viewBox="0 0 16 16" aria-hidden="true">
            <path d="M2 2 14 14M14 2 2 14" />
          </svg>
        </button>
        <div className="modal__body">
          <p className="modal__year">{content.year}</p>
          <h2 className="modal__title" id="modal-title">{content.titulo}</h2>
          <p className="modal__grade">
            <span>{m.aprobacionTexto}</span> <b>{content.nota}</b>
          </p>
          <div className="modal__rule" aria-hidden="true" />
          {content.imagen ? (
            <div className="modal__frame">
              <img className="modal__img" src={content.imagen} alt={content.alt} />
            </div>
          ) : (
            <p className="modal__text">{content.alt}</p>
          )}
        </div>
      </div>
    </div>
  );
}
