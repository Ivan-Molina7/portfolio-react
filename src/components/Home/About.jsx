import ITI from "../../assets/img/about/iti.png";
import Bios from "../../assets/img/about/bios.png";
import Ort from "../../assets/img/about/ort.png";
import lineMobile from "../../assets/img/about/lineMobile.png";

import Background from "../../assets/img/Backgrounds/bg7.webp";
import Modal from "./Modal";
import { useState } from "react";

import BiosDiploma from "../../assets/img/about/biosDiploma.png";


const modalContent = [
    {
      titulo: "I.T.I (Instituto Tecnológico de Informatica)",
      nota: "11",
      imagen: BiosDiploma,
      alt: "Diploma de I.T.I"
    },
    {
      titulo: "Desarrollador Front-end (BIOS)",
      nota: "95%",
      imagen: BiosDiploma,
      alt: "Diploma de Bios Desarrollador Front-end"
    },
    {
      titulo: "Diseñador Digital orientación web (ORT)",
      nota: "91%",
      imagen: BiosDiploma,
      alt: "Diploma de ORT Diseñador Digital"
    }
  ];


function About() {
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
            data-section="about"
            data-value="titulo"
            data-aos="fade-right"
            data-aos-delay="100"
          >
            SOBRE MI
          </h2>
          <div className="about__texts">
            <p
              className="about__text"
              data-section="about"
              data-value="parrafo1"
              data-aos="fade-right"
              data-aos-delay="200"
            >
              Hola, soy Iván Molina, diseñador UX/UI y programador front-end con
              base en Montevideo, Uruguay. Me interesa el diseño que se ve bien,
              funciona bien y, sobre todo, mejora la experiencia de quienes lo
              usan.Me gusta entender cada proyecto como un proceso de
              aprendizaje, donde puedo crecer, afinar mi mirada y acercarme,
              paso a paso, al nivel profesional que admiro.
            </p>

            <div
              className="about__texts-groups"
              data-aos="fade-right"
              data-aos-delay="300"
            >
              <h3
                className="about__subtitle subtitle-section"
                data-section="about"
                data-value="extraTitulo"
              >
                Extra
              </h3>
              <p
                className="about__text"
                data-section="about"
                data-value="parrafo2"
              >
                Además del diseño y la programación, me interesa la forma en que
                nos relacionamos como equipo. Valoro la comunicación clara, el
                respeto por las ideas del otro y la creación de entornos donde
                cada persona pueda aportar lo mejor de sí. Me importa trabajar
                con compromiso, mantener la calma en los momentos clave y
                empujar hacia adelante con actitud, pero siempre construyendo
                desde el entendimiento y la colaboración.
              </p>
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
              <p className="anio" data-section="about" data-value="anio0">
                2019
              </p>
              <button
                className="btn btn--timeline timeline-activate"
         
                data-section="about"
                data-value="expandir0"
                  onClick={() => openModal(0)}
              >
                Expandir
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
              <p className="anio">
                2022
              </p>
              <button
                className="btn btn--timeline timeline-activate"
                onClick={() => openModal(1)}
              >
                Expandir
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
              <p className="anio">
                2025
              </p>
              <button
                className="btn btn--timeline timeline-activate"
                    onClick={() => openModal(2)}
              >
                Expandir
              </button>
            </div>
          </div>
        </div>

        <Modal isOpen={modalIndex !== null} closeModal={closeModal} content={modalContent[modalIndex]}/>
      </section>
    </div>
  );
}

export default About;
