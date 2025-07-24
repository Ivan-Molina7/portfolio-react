import React, { useEffect, useRef } from 'react';

import closeWhite from '../../assets/img/Icons/White/close.png';
import useTranslation from '../../hooks/useTranslation';

export default function Modal({ isOpen, closeModal, content }) {
 const { texts } = useTranslation();

  const lastFocusedBtn = useRef(null);
  const modalRef = useRef(null);

  // Guardar foco en el botón que abrió el modal y devolver foco al cerrar
  useEffect(() => {
    if (isOpen) {
      lastFocusedBtn.current = document.activeElement;
    } else if (lastFocusedBtn.current) {
      lastFocusedBtn.current.focus();
    }
  }, [isOpen]);

  // Agregar listener para tecla Escape que cierra modal
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === 'Escape' && isOpen) {
        closeModal();
      }
    }
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, closeModal]);

  if (!isOpen || !content) return null;

    
  return (
    <div
      className="modal-background"
      aria-hidden={isOpen ? 'false' : 'true'}
      ref={modalRef}
      onClick={(e) => {
        // Cerrar si clic fuera del modal-content
        if (e.target.classList.contains('modal-background')) {
          closeModal();
        }
      }}
    >
      <div className="modal" role="dialog" aria-hidden="true" aria-labelledby="modal-title">
        <img className="close" src={closeWhite} onClick={closeModal} aria-label="Cerrar modal"/>
        <div className="modal__titulos">
                <p className="modal__titulo">{content.titulo}</p>
                <div className="modal__subtitulos">
                    <p className="modal__subtitulo">{texts.modalTimeline.aprobacionTexto} </p> <span className="modal__nota">{content.nota}</span>
                </div>
            </div>

        <img src={content.imagen} alt={content.alt} className="modal__image" />
      </div>
    </div>
  );2
}
