import NBC from "../../assets/img/LogosProyectos/NBC2.png";
import CAP from "../../assets/img/LogosProyectos/CAP.png";
import Havanna from "../../assets/img/LogosProyectos/Havanna.png";
import CulPadel from "../../assets/img/LogosProyectos/CulPadel.png";
import WorldGym from "../../assets/img/LogosProyectos/WorldGym.png";

import Background from "../../assets/img/Backgrounds/bg2.webp";
import useTranslation from "../../hooks/useTranslation";
import { projectsData } from "../../utils/projectsData";
import { getTextFromKey } from "../../utils/getTextFromKey";
import { Routes, Route, Link } from "react-router-dom";

function Projects() {
  const { texts } = useTranslation();

  const trabajos = projectsData.filter((p) => p.tipo === "trabajo");
  const proyectos = projectsData.filter((p) => p.tipo === "proyecto");

  

  return (
    <div
      className="overflow-section-100vh overflow-section-100vh--proyectos"
      id="proyectos"
    >
      <section
        className="proyectos max-width-section section-bg"
        data-bg={Background}
      >
        <h2
          className="proyectos__title title-section"
          data-aos="fade-right"
          data-aos-delay="100"
        >
          {texts.proyectos.titulo}
        </h2>
        <div className="proyectos__container">

          {/* Sección Trabajos */}
          <div
            className="proyectos--trabajos temas-section"
            data-aos="fade-right"
            data-aos-delay="200"
          >
            <h3
              className="proyectos__subtitle subtitle-section"
              data-section="proyectos"
              data-value="trabajosTitulo"
              data-aos="fade-right"
              data-aos-delay="300"
            >
              {texts.proyectos.trabajosTitulo}
            </h3>


            <div className="proyectos__cards">
              {trabajos.map((proyecto, i) => (
                <div
                  key={proyecto.id}
                  className="proyectos__card"
                  data-aos="fade-right"
                  data-aos-delay={400 + i * 100}
                >
                  <img src={proyecto.imagen} alt={getTextFromKey(texts, proyecto.tituloKey)} />
                  {/* Si queres navegación SPA (React Router): */}
                  <Link to={`/proyecto/${proyecto.id}`} className="btn btn--proyectos">
                    {texts.proyectos.expandirBtn}
                  </Link>
                  {/* Si necesitas href tradicional (menos recomendable): */}
                  {/* <a href={`/proyectos/${proyecto.id}.html`} className="btn btn--proyectos">{texts.proyectos.expandirBtn}</a> */}
                </div>
              ))}
            </div>

          </div>

          <div
            className="proyectos__line"
            data-aos="fade-right"
            data-aos-delay="500"
          ></div>
          {/* Sección Proyectos Personales */}
          <div
            className="proyectos--personal temas-section"
            data-aos="fade-right"
            data-aos-delay="600"
          >
            <h3
              className="proyectos__subtitle subtitle-section"
              data-section="proyectos"
              data-value="expandirBtn"
              data-aos="fade-right"
              data-aos-delay="700"
            >
              {texts.proyectos.proyectosPersonalesTitulo}
            </h3>
            <div className="proyectos__cards">
              {proyectos.map((proyecto, i) => (
                <div
                  key={proyecto.id}
                  className="proyectos__card"
                  data-aos="fade-right"
                  data-aos-delay={800 + i * 100}
                >
                  <img src={proyecto.imagen} alt={getTextFromKey(texts, proyecto.tituloKey)} />
                  <Link to={`/proyecto/${proyecto.id}`} className="btn btn--proyectos">
                    {texts.proyectos.expandirBtn}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Projects;
