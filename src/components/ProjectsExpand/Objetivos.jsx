import useTranslation from '../../hooks/useTranslation';

// Tres objetivos en tres columnas, con numeral sobre línea fina con tramo dorado.
function Objetivos({ items }) {
  const { texts } = useTranslation();

  return (
    <section className="det-sec det-rv">
      <h3 className="proj-label">{texts.objetivos.titulo}</h3>
      <div className="det-obj">
        {items.map((text, i) => (
          <div className="det-obj__item det-rv" key={i} style={{ '--i': i }}>
            <b>{String(i + 1).padStart(2, '0')}</b>
            <p>{text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Objetivos;
