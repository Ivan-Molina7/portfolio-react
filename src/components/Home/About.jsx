import ITI from "../../assets/img/about/iti.png";
import Bios from "../../assets/img/about/bios.png";
import Ort from "../../assets/img/about/ort.png";
import Udemy from "../../assets/img/about/Udemy.webp";
import Modal from "./Modal";
import { useState } from "react";

import BiosDiploma from "../../assets/img/about/biosDiploma.png";
import OrtDiploma from "../../assets/img/about/ORT-ESCOLARIDAD.png";
import useTranslation from "../../hooks/useTranslation";

function About() {
  const { texts } = useTranslation();

  const timelineData = [
    { year: "2019", image: ITI, index: 0 },
    { year: "2022", image: Bios, index: 1 },
    { year: "2025", image: Ort, index: 2 },
    { year: "2026", image: Udemy, index: 3 },
  ];

  const modalContent = [
    {
      titulo: texts.modalTimeline.titulo1,
      nota: "11",
      imagen: "",
      alt: texts.modalTimeline.alt1,
    },
    {
      titulo: texts.modalTimeline.titulo2,
      nota: "95%",
      imagen: BiosDiploma,
      alt: texts.modalTimeline.alt2,
    },
    {
      titulo: texts.modalTimeline.titulo3,
      nota: "91%",
      imagen: OrtDiploma,
      alt: texts.modalTimeline.alt3,
    },
    {
      titulo: texts.modalTimeline.titulo4,
      nota:  texts.modalTimeline.nota,
      imagen: "",
      alt: texts.modalTimeline.alt4,
    },
  ];

  const [modalIndex, setModalIndex] = useState(null);

  const openModal = (index) => setModalIndex(index);
  const closeModal = () => setModalIndex(null);

  return (
    <div className="overflow-section-100vh" id="about">
      <section
        className="about max-width-section section-bg"
      >
        <div className="about__content">
          <h2
            className="about__title title-section"
            data-aos="fade-right"
            data-aos-delay="100"
          >
            {texts.about.titulo}
          </h2>
          <div className="about__texts">
            <p
              className="about__text"
              data-aos="fade-right"
              data-aos-delay="200"
            >
              {texts.about.parrafo1}
            </p>

            <div
              className="about__texts-groups"
              data-aos="fade-right"
              data-aos-delay="300"
            >
              <h3 className="about__subtitle subtitle-section">Extra</h3>
              <p className="about__text">{texts.about.parrafo2}</p>
            </div>
          </div>
        </div>

        <div className="timeline">
          {/* Línea horizontal de tiempo */}
          <div
            className="timeline__line"
            data-aos="fade-up"
            data-aos-delay="400"
          ></div>

          {/* Items del timeline */}
          {timelineData.map((item, i) => (
            <div
              key={item.year}
              className="timeline__item"
              data-aos="fade-up"
              data-aos-delay={500 + i * 100}
            >
              <figure
                className="timeline__thumbnail timeline-activate"
                onClick={() => openModal(item.index)}
              >
                <img
                  src={item.image}
                  alt={`Timeline ${item.year}`}
                  className="timeline__image"
                />
              </figure>

              {/* Línea vertical conectora (CSS) */}
              <div className="timeline__connector"></div>

              <div className="timeline__info">
                <p className="timeline__year">{item.year}</p>
                <button
                  className="btn btn--timeline timeline-activate"
                  onClick={() => openModal(item.index)}
                >
                  {texts.about.expandir}
                </button>
              </div>
            </div>
          ))}
        </div>

        <Modal
          isOpen={modalIndex !== null}
          closeModal={closeModal}
          content={modalContent[modalIndex]}
        />
      </section>
    </div>
  );
}

export default About;