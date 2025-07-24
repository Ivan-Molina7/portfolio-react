import ITI from "../../assets/img/about/iti.png";
import Bios from "../../assets/img/about/bios.png";
import Ort from "../../assets/img/about/ort.png";
import lineMobile from "../../assets/img/about/lineMobile.png";

import Background from "../../assets/img/Backgrounds/bg7.webp";
import Modal from "./Modal";
import { useState } from "react";

import BiosDiploma from "../../assets/img/about/biosDiploma.png";
import useTranslation from "../../hooks/useTranslation";


function About() {

    const { texts } = useTranslation();

const modalContent = [
  {
    titulo: texts.modalTimeline.titulo1,
    nota: "11",
    imagen: BiosDiploma,
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
    imagen: BiosDiploma,
    alt: texts.modalTimeline.alt3,
  },
];





  const [modalIndex, setModalIndex] = useState(null);

  const openModal = (index) => setModalIndex(index);
  const closeModal = () => setModalIndex(null);

  return (
    <div className="overflow-section-100vh" id="about">
      <section
        className="about max-width-section section-bg"
        data-bg={Background}
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
          {/* Línea de tiempo */}
          <div
            className="timeline__line"
            data-aos="fade-up"
            data-aos-delay="400"
          ></div>

          {/* Elemento 1 de la línea de tiempo */}
          <div
            className="timeline__item"
            data-aos="fade-up"
            data-aos-delay="500"
          >
            <figure
              className="timeline__thubmnail timeline-activate"
              data-item="0"
              data-aos="fade-up"
              data-aos-delay="600"
            >
              <img src={ITI} alt="" className="timeline__image" />
            </figure>
            <img
              src={lineMobile}
              alt=""
              data-aos="fade-up"
              data-aos-delay="700"
            />
            <div
              className="timeline__info"
              data-aos="fade-up"
              data-aos-delay="800"
            >
              <p className="anio" >
                2019
              </p>
              <button
                className="btn btn--timeline timeline-activate"
                onClick={() => openModal(0)}
              >
                 {texts.about.expandir}
              </button>
            </div>
          </div>
          {/* Elemento 2 de la línea de tiempo */}
          <div
            className="timeline__item"
            data-aos="fade-up"
            data-aos-delay="900"
          >
            <figure
              className="timeline__thubmnail timeline-activate"
              data-aos="fade-up"
              data-aos-delay="1000"
            >
              <img src={Bios} alt="" className="timeline__image" />
            </figure>
            <img
              src={lineMobile}
              alt=""
              data-aos="fade-up"
              data-aos-delay="1100"
            />
            <div
              className="timeline__info"
              data-aos="fade-up"
              data-aos-delay="1200"
            >
              <p className="anio">2022</p>
              <button
                className="btn btn--timeline timeline-activate"
                onClick={() => openModal(1)}
              >
                 {texts.about.expandir}
              </button>
            </div>
          </div>

          {/* Elemento 3 de la línea de tiempo */}
          <div
            className="timeline__item"
            data-aos="fade-up"
            data-aos-delay="1300"
          >
            <figure
              className="timeline__thubmnail timeline-activate"
              data-aos="fade-up"
              data-aos-delay="1400"
            >
              <img src={Ort} alt="" className="timeline__image" />
            </figure>
            <img
              src={lineMobile}
              alt=""
              data-aos="fade-up"
              data-aos-delay="1500"
            />
            <div
              className="timeline__info"
              data-aos="fade-up"
              data-aos-delay="1600"
            >
              <p className="anio">2025</p>
              <button
                className="btn btn--timeline timeline-activate"
                onClick={() => openModal(2)}
              >
                 {texts.about.expandir}
              </button>
            </div>
          </div>
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
