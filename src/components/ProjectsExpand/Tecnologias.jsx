import useTranslation from '../../hooks/useTranslation';
import { techIcon } from '../../utils/projectAssets';

// Mismos mosaicos que Habilidades (.tile en _home-habilidades.scss), con ICONS en gris.
// Las tecnologías sin ícono en ICONS (Vite, Netlify, Mercado Pago, Groq, Next.js, TypeScript) van solo con el nombre.
function Tecnologias({ tecnologias }) {
  const { texts } = useTranslation();

  return (
    <section className="det-sec det-rv">
      <h3 className="proj-label">{texts.tecnologias.tecnologiasTitulo}</h3>
      <div className="skill-tiles">
        {tecnologias.map(({ alt }) => {
          const icon = techIcon(alt);
          return (
            <div className={`tile${icon ? '' : ' tile--text'}`} key={alt}>
              {icon && (
                <span className="tile__ic">
                  <img src={icon} alt="" />
                </span>
              )}
              <small>{alt}</small>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default Tecnologias;
