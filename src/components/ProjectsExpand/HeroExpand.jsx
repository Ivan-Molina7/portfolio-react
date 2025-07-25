import React, { useState, useEffect } from 'react';
import iconTouch from '../../assets/img/Icons/White/touch.png';
import iconLeft from '../../assets/img/Icons/White/nav-left.png';
import iconRight from '../../assets/img/Icons/White/nav-right.png';
import useTranslation from "../../hooks/useTranslation";

function HeroExpand({
  titulo,
  descripcion,
  imagenMain,
  imagenAlt,
  behance,
  behanceLink,
  sitioLink,
  sitio,
  imagenesModal = [], // array de imágenes para el modal
}) {
  const { texts } = useTranslation();

  const [isModalOpen, setModalOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Abrir modal y poner primer slide
  const openModal = (index = 0) => {
    setCurrentSlide(index);
    setModalOpen(true);

  };

  // Cerrar modal y restaurar scroll
  const closeModal = () => {
    setModalOpen(false);
  };

  // Mostrar slide según índice
  const showSlide = (index) => {
    const total = imagenesModal.length;
    if (index < 0) index = total - 1;
    if (index >= total) index = 0;
    setCurrentSlide(index);
  };

  const prevSlide = () => showSlide(currentSlide - 1);
  const nextSlide = () => showSlide(currentSlide + 1);

  // Manejar teclas para modal (Escape, flechas)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isModalOpen) return;
      if (e.key === 'Escape') closeModal();
      if (e.key === 'ArrowLeft') prevSlide();
      if (e.key === 'ArrowRight') nextSlide();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isModalOpen, currentSlide]);

  return (
    <section className="hero-proyecto mb-section max-width-section">
      <div
        className="hero-proyecto__image-container"
        data-aos="fade-right"
        data-aos-delay="100"
        onClick={() => openModal(0)}
        style={{ cursor: 'pointer' }}
        aria-label="Abrir galería de imágenes del proyecto"
        role="button"
        tabIndex={0}
        onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') openModal(0); }}
      >
  <img src={imagenesModal[0].src} alt={imagenAlt} className="hero-proyecto__image" />
        <div className="hero-proyecto__overlay" >
          <img src={iconTouch} alt="tocar pantalla icono" />
          Haz click para ver más pantallas
        </div>
      </div>

      <div className="hero-proyecto__container" data-aos="fade-left" data-aos-delay="300">
        <h1 className="hero-proyecto__titulo" data-aos="fade-left" data-aos-delay="400">{titulo}</h1>
        <div className="hero-proyecto__content" data-aos="fade-left" data-aos-delay="500">
          <p className="hero-proyecto__descripcion" >
            {descripcion}
          </p>
          <div className="hero-proyecto__botones" data-aos="fade-left" data-aos-delay="600">
            {behance && (
              <a href={behanceLink} target="_blank" rel="noopener noreferrer" className="hero-proyecto__btn btn" >
                {texts.proyecto.btnMasInfo}
              </a>
            )}

            {sitio && (
              <a href={sitioLink} target="_blank" rel="noopener noreferrer" className="hero-proyecto__btn btn btn--secondary">
                {texts.proyecto.btnVisitar}
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Modal Carousel */}
      {isModalOpen && (
        <div
          className="modal-carousel"
          aria-hidden={!isModalOpen}
          role="dialog"
          aria-modal="true"
          onClick={closeModal}
          tabIndex={-1}
        >
          <div
            className="modal-carousel__overlay"
            onClick={closeModal}
            aria-label="Cerrar modal"
          ></div>

          <div className="modal-carousel__content" role="document" onClick={e => e.stopPropagation()}>
            <div className="modal-carousel__body">

              <button
                className="modal-carousel__arrow modal-carousel__arrow--left"
                aria-label="Anterior"
                onClick={prevSlide}
              >
                <img src={iconLeft} alt="Anterior" />
              </button>

              <div className="modal-carousel__img-frame">
                {imagenesModal.map((img, i) => (
                  <img
                    key={i}
                    src={img.src}
                    alt={img.alt}
                    className={`modal-carousel__img ${i === currentSlide ? 'active' : ''}`}
                    style={{ display: i === currentSlide ? 'block' : 'none' }}
                  />
                ))}
              </div>

              <button
                className="modal-carousel__arrow modal-carousel__arrow--right"
                aria-label="Siguiente"
                onClick={nextSlide}
              >
                <img src={iconRight} alt="Siguiente" />
              </button>

            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default HeroExpand;
