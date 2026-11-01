import { useState } from 'react';
import useTranslation from '../../hooks/useTranslation';

// "Sobre el proyecto": dos columnas. Las preguntas a la izquierda (la activa en blanco, con numeral y línea
// dorada) y la respuesta a la derecha con fundido. NO es un acordeón: todas las respuestas ocupan la misma
// celda, así la altura queda fija a la más larga.
function Faq({ items }) {
  const { texts } = useTranslation();
  const [active, setActive] = useState(0);

  return (
    <section className="det-sec det-rv">
      <h3 className="proj-label">{texts.proyecto.sobreTitulo}</h3>
      <div className="det-qa">
        <div className="det-ql" role="tablist" aria-orientation="vertical">
          {items.map((item, i) => (
            <button
              key={i}
              type="button"
              role="tab"
              id={`det-q${i}`}
              aria-selected={i === active}
              aria-controls={`det-a${i}`}
              className={`det-qi${i === active ? ' is-on' : ''}`}
              onClick={() => setActive(i)}
            >
              <i>{String(i + 1).padStart(2, '0')}</i>
              <b>{item.q}</b>
            </button>
          ))}
        </div>
        <div className="det-qr">
          {items.map((item, i) => (
            <p
              key={i}
              role="tabpanel"
              id={`det-a${i}`}
              aria-labelledby={`det-q${i}`}
              aria-hidden={i !== active}
              className={`det-qp${i === active ? ' is-on' : ''}`}
            >
              {item.a}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Faq;
