import { Link } from "react-router-dom";
import useTranslation from "../../hooks/useTranslation";
import { LOGOS } from "../../utils/assets";

// Orden fijo del diseño. ids de projectsData: Facu Trainer 9, Transportes UY 7,
// NBC Cargo 2, Wake Up Tracker 8, Club Atlético Progreso 1.
// TODO: Facu Trainer no tiene logo todavía; se muestran las iniciales "FT".
const TRABAJOS = [
  { id: 9, name: "Facu Trainer", initials: "FT", featured: true },
  { id: 7, name: "Transportes UY", logo: LOGOS.tuy },
  { id: 2, name: "NBC Cargo", logo: LOGOS.nbc },
];
const PERSONALES = [
  // dim: el logo normalizado es oscuro (brillo medio ~83/255) y se lee flojo sobre el fondo.
  // TODO: reemplazar el archivo por una versión más clara y sacar el filtro.
  { id: 8, name: "Wake Up Tracker", logo: LOGOS.wu, featured: true, dim: true },
  { id: 1, name: "Club Atlético Progreso", logo: LOGOS.gap },
];

function Card({ p, texts }) {
  return (
    <article className="pcard">
      <span className={p.featured ? "pcard__tag pcard__tag--dest" : "pcard__tag"}>{p.featured ? texts.proyectos.destacado : " "}</span>
      <div className="pcard__logo">
        {p.logo ? <img className={p.dim ? "is-dim" : undefined} src={p.logo} alt={p.name} /> : <span aria-label={p.name}>{p.initials}</span>}
      </div>
      <Link className="pcard__btn" to={`/proyecto/${p.id}`}>
        {texts.proyectos.expandirBtn}
        <span className="pcard__stretch" aria-hidden="true" />
      </Link>
    </article>
  );
}

function Projects() {
  const { texts } = useTranslation();

  return (
    <div className="home-screen" id="proyectos" data-s="1">
      <main className="home-wrap">
        <h2 className="proj-title">{texts.proyectos.titulo}</h2>
        <div className="proj-groups">
          <section>
            <h3 className="proj-label">{texts.proyectos.trabajosTitulo}</h3>
            <div className="proj-row proj-row--3">
              {TRABAJOS.map((p) => <Card key={p.id} p={p} texts={texts} />)}
            </div>
          </section>
          <section>
            <h3 className="proj-label">{texts.proyectos.proyectosPersonalesTitulo}</h3>
            <div className="proj-row proj-row--2">
              {PERSONALES.map((p) => <Card key={p.id} p={p} texts={texts} />)}
            </div>
          </section>
        </div>
        <Link className="proj-more" to="/galeriaProyectos">{texts.proyectos.verMas}</Link>
      </main>
    </div>
  );
}

export default Projects;
