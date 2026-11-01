import useTranslation from '../../hooks/useTranslation';
import { ICONS } from '../../utils/assets';

// Nombres propios de herramientas: no se traducen. Orden y nombres del prototipo (#m2).
const GROUPS = [
  { key: 'frontend', tools: [['html', 'HTML5'], ['css', 'CSS3'], ['js', 'JavaScript'], ['react', 'React'], ['sass', 'Sass'], ['tailwind', 'Tailwind'], ['bootstrap', 'Bootstrap']] },
  { key: 'backend', tools: [['node', 'Node.js'], ['mongo', 'MongoDB'], ['supabase', 'Supabase'], ['tanstack', 'TanStack Query'], ['zustand', 'Zustand'], ['claude', 'Claude'], ['github', 'GitHub'], ['wordpress', 'WordPress'], ['woo', 'WooCommerce']] },
  { key: 'diseno', tools: [['figma', 'Figma'], ['ps', 'Photoshop'], ['ai', 'Illustrator']] },
];

function Skills() {
  const { texts } = useTranslation();
  const t = texts.habilidades;

  return (
    <div className="home-screen" id="habilidades" data-s="2">
      <main className="home-wrap">
        <h2 className="skill-title">{t.titulo}</h2>
        <p className="skill-lead">{t.lead}</p>
        {GROUPS.map((g) => (
          <section key={g.key} className={`skill-group skill-group--${g.key}`}>
            <h3 className="skill-label">
              {t[`${g.key}Titulo`]}
              <em>{t[`${g.key}Sub`]}</em>
            </h3>
            <div className="skill-tiles">
              {g.tools.map(([k, name], i) => (
                <div className="tile" key={k} style={{ '--i': i }}>
                  <span className="tile__ic">
                    {/* versión gris únicamente; la versión color (ICONS[k].color) queda desactivada */}
                    <img src={ICONS[k].gray} alt="" />
                  </span>
                  <small>{name}</small>
                </div>
              ))}
            </div>
          </section>
        ))}
      </main>
    </div>
  );
}

export default Skills;
