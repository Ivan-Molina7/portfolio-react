import React, { useState } from 'react';

function Faq({ pregunta1, respuesta1, pregunta2, respuesta2, pregunta3, respuesta3 }) {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    { pregunta: pregunta1, respuesta: respuesta1 },
    { pregunta: pregunta2, respuesta: respuesta2 },
    { pregunta: pregunta3, respuesta: respuesta3 },
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
                cursor: 'pointer',
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
