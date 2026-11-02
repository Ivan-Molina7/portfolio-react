import { useState } from "react";
import Modal from "./Modal";
import useTranslation from "../../hooks/useTranslation";
import { ABOUT } from "../../utils/assets";

// Diplomas del modal: todavía no están normalizados (siguen en assets/img/about/).
import BiosDiploma from "../../assets/img/about/biosDiploma.png";
import OrtDiploma from "../../assets/img/about/ORT-ESCOLARIDAD.png";

function About() {
  const { texts } = useTranslation();
  const t = texts.about;
  const m = texts.modalTimeline;
  const [modalIndex, setModalIndex] = useState(null);

  // pad: el logo de ITI va contenido, con 15px de aire dentro del recuadro
  const timeline = [
    { year: "2019", image: ABOUT.iti, pad: true },
    { year: "2022", image: ABOUT.bios },
    { year: "2025", image: ABOUT.ort },
    { year: "2026", image: ABOUT.udemy },
  ];

  const modalContent = [
    { titulo: m.titulo1, nota: "11", imagen: "", alt: m.alt1 },
    { titulo: m.titulo2, nota: "95%", imagen: BiosDiploma, alt: m.alt2 },
    { titulo: m.titulo3, nota: "91%", imagen: OrtDiploma, alt: m.alt3 },
    { titulo: m.titulo4, nota: m.nota, imagen: "", alt: m.alt4 },
  ].map((c, i) => ({ ...c, year: timeline[i].year }));

  return (
    <div className="home-screen" id="about" data-s="3">
      <section className="home-wrap" aria-labelledby="about-titulo">
        <h2 className="about-title" id="about-titulo">{t.titulo}</h2>
        <p className="about-txt">{t.parrafo1}</p>
        <h3 className="about-sub">{t.extraTitulo}</h3>
        <p className="about-txt">{t.parrafo2}</p>

        <div className="tl">
          {timeline.map((item, i) => (
            <div className="ti" key={item.year}>
              <figure className="ti__logo" onClick={() => setModalIndex(i)}>
                <img
                  className={item.pad ? "is-pad" : undefined}
                  src={item.image}
                  alt={modalContent[i].titulo}
                />
              </figure>
              <i className="ti__node" aria-hidden="true" />
              <b className="ti__year">{item.year}</b>
              <button type="button" className="home-btn" onClick={() => setModalIndex(i)}>
                {t.expandir}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* fuera de .home-wrap: el modal es fixed y no debe heredar su transform ni su visibilidad */}
      <Modal
        isOpen={modalIndex !== null}
        closeModal={() => setModalIndex(null)}
        content={modalContent[modalIndex]}
      />
    </div>
  );
}

export default About;
