
import NBC from '../../assets/img/LogosProyectos/NBC2.png';
import CAP from '../../assets/img/LogosProyectos/CAP.png';
import Havanna from '../../assets/img/LogosProyectos/Havanna.png';
import CulPadel from '../../assets/img/LogosProyectos/CulPadel.png';
import WorldGym from '../../assets/img/LogosProyectos/WorldGym.png';

import Background from '../../assets/img/Backgrounds/bg2.webp';

function Projects() {
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
          data-section="proyectos"
          data-value="titulo"
          data-aos="fade-right"
          data-aos-delay="100"
        >
          PROYECTOS
        </h2>
        <div className="proyectos__container">
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
              TRABAJOS
            </h3>
            <div className="proyectos__cards">
              <div
                className="proyectos__card"
                data-aos="fade-right"
                data-aos-delay="400"
              >
                <img
                  src={NBC}
                  alt="Logo de NBC CARGO"
                />
                <a
                  href="/proyectos/nbccargo.html"
                  className="btn btn--proyectos"
                  data-section="proyectos"
                  data-value="expandirBtn"
                >
                  Expandir
                </a>
              </div>
            </div>
          </div>
          <div
            className="proyectos__line"
            data-aos="fade-right"
            data-aos-delay="500"
          ></div>

          <div
            className="proyectos--personal temas-section"
            data-aos="fade-right"
            data-aos-delay="600"
          >
            <h3
              className="proyectos__subtitle subtitle-section"
              data-section="proyectos"
              data-value="proyectosPersonalesTitulo"
              data-aos="fade-right"
              data-aos-delay="700"
            >
              PROYECTOS PERSONALES
            </h3>
            <div className="proyectos__cards">
              <div
                className="proyectos__card"
                data-aos="fade-right"
                data-aos-delay="800"
              >
                <img
                 src={CAP}
                  alt="Logo de Club Atlético Progreso"
                />
                <a
                  href="proyectos/progreso.html"
                  className="btn btn--proyectos"
                  data-section="proyectos"
                  data-value="expandirBtn"
                >
                  Expandir
                </a>
              </div>
              <div
                className="proyectos__card"
                data-aos="fade-right"
                data-aos-delay="900"
              >
                <img
                  src={Havanna}
                  alt="Logo de Havanna"
                />
                <a
                  href="proyectos/havanna.html"
                  className="btn btn--proyectos"
                  data-section="proyectos"
                  data-value="expandirBtn"
                >
                  Expandir
                </a>
              </div>
              <div
                className="proyectos__card"
                data-aos="fade-right"
                data-aos-delay="1000"
              >
                <img
                  src={CulPadel}
                  alt="Logo de CulPadel"
                />
                <a
                  href="proyectos/culPadel.html"
                  className="btn btn--proyectos"
                  data-section="proyectos"
                  data-value="expandirBtn"
                >
                  Expandir
                </a>
              </div>
              <div
                className="proyectos__card"
                data-aos="fade-right"
                data-aos-delay="1100"
              >
                <img
                    src={WorldGym}
                  alt="Logo de WorldGYM"
                />
                <a
                  href="proyectos/worldGym.html"
                  className="btn btn--proyectos"
                  data-section="proyectos"
                  data-value="expandirBtn"
                >
                  Expandir
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Projects;
