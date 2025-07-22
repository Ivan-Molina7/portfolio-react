import React, { useState } from 'react';

function Faq() {
  // Guarda el índice del item abierto, o null si ninguno
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      pregunta: "¿Cuál fue el proceso de elaboración y desarrollo del proyecto?",
      respuesta: "Se inició con un análisis del sitio web antiguo y las necesidades de NBC Cargo, seguido del diseño de prototipos y el desarrollo frontend y backend para crear una web moderna y funcional."
    },
    {
      pregunta: "¿Cómo se diseñó la experiencia de usuario y la interfaz?",
      respuesta: "El diseño priorizó la usabilidad y accesibilidad, con una navegación clara y un estilo visual moderno que refleja la identidad corporativa de NBC Cargo, garantizando una experiencia atractiva en todos los dispositivos."
    },
    {
      pregunta: "¿Qué impacto o beneficios se esperan para los usuarios o la comunidad?",
      respuesta: "El diseño priorizó la usabilidad y accesibilidad, con una navegación clara y un estilo visual moderno que refleja la identidad corporativa de NBC Cargo, garantizando una experiencia atractiva en todos los dispositivos."
    }
  ];

  const toggleFaq = (index) => {
    setOpenIndex(prevIndex => (prevIndex === index ? null : index));
  };

  return (
    <section className="proyecto-about pb-section max-width-section">
      <h2
        className="proyecto-about__titulo"
        data-section="proyecto_about"
        data-value="sobrePaginaTitulo"
        data-aos="fade-up"
        data-aos-delay="100"
      >
        Sobre la página
      </h2>

      <ul className="faq">
        {faqs.map((item, i) => (
          <li
            key={i}
            className="faq__item"
            data-aos="fade-up"
            data-aos-delay={200 + i * 100}
          >
            <div
              className="faq__pregunta"
              style={{
                backgroundImage: openIndex === i ? 'linear-gradient(to left, #036B2B80, #07282270)' : 'unset',
                cursor: 'pointer'
              }}
              onClick={() => toggleFaq(i)}
            >
              <div className={`faq__icon ${openIndex === i ? 'active' : ''}`}>
                <div></div>
                <div></div>
              </div>
              <span data-section="proyecto_about" data-value={`nbc_pregunta${i + 1}`}>
                {item.pregunta}
              </span>
            </div>
            <div className={`faq__respuesta ${openIndex === i ? 'faq__respuesta--abierta' : ''}`}>
              <p data-section="proyecto_about" data-value={`nbc_respuesta${i + 1}`}>
                {item.respuesta}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default Faq;
