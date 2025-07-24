// Imports de imágenes (ajusta las rutas según tu estructura de /src/assets)
import htmlGris from '../../assets/img/habilidades/html.png';
import htmlColor from '../../assets/img/habilidades/LogoColores/html.png';

import cssGris from '../../assets/img/habilidades/css.png';
import cssColor from '../../assets/img/habilidades/LogoColores/css.png';

import jsGris from '../../assets/img/habilidades/js.png';
import jsColor from '../../assets/img/habilidades/LogoColores/js.png';

import sassGris from '../../assets/img/habilidades/sass.png';
import sassColor from '../../assets/img/habilidades/LogoColores/sass.png';

import bootstrapGris from '../../assets/img/habilidades/bootstrap.png';
import bootstrapColor from '../../assets/img/habilidades/LogoColores/bootstrap.png';

import nodeGris from '../../assets/img/habilidades/node.png';
import nodeColor from '../../assets/img/habilidades/LogoColores/node.png';

import mongoGris from '../../assets/img/habilidades/mongo.png';
import mongoColor from '../../assets/img/habilidades/LogoColores/mongo.png';

import wordpressGris from '../../assets/img/habilidades/wordpress.webp'
import wordpressColor from '../../assets/img/habilidades/LogoColores/wordpress.webp';

import githubGris from '../../assets/img/habilidades/github.png';
import githubColor from '../../assets/img/habilidades/github.png';

import aiGris from '../../assets/img/habilidades/ai.png';
import aiColor from '../../assets/img/habilidades/LogoColores/ai.png';

import psGris from '../../assets/img/habilidades/ps.png';
import psColor from '../../assets/img/habilidades/LogoColores/ps.png';

import figmaGris from '../../assets/img/habilidades/figma.png';
import figmaColor from '../../assets/img/habilidades/LogoColores/figma.png';

import reactGris from '../../assets/img/habilidades/react.webp';
import reactColor from '../../assets/img/habilidades/LogoColores/react.webp';

import Background from '../../assets/img/Backgrounds/bg4.webp';
import useTranslation from '../../hooks/useTranslation';

function Skills() {
 const { texts } = useTranslation();


  return (
    <div className="overflow-section-100vh" id="habilidades">
      <section
        className="habilidades max-width-section section-bg"
        data-bg={Background}
      >
        <h2
          className="habilidades__title title-section"
          data-section="habilidades"
          data-value="titulo"
          data-aos="fade-right"
          data-aos-delay="100"
        >
           {texts.habilidades.titulo}
        </h2>
        <div className="habilidades__container">
          {/* === Programación === */}
          <div
            className="habilidades__section"
            data-aos="fade-right"
            data-aos-delay="200"
          >
            <h3
              className="habilidades__subtitle subtitle-section"
              data-section="habilidades"
              data-value="programacionTitulo"
              data-aos="fade-right"
              data-aos-delay="300"
            >
                  {texts.habilidades.programacionTitulo}
            </h3>
            <div className="habilidades__cards">
              <div
                className="habilidades__card habilidades__card--html"
                data-aos="fade-right"
                data-aos-delay="400"
              >
                <img className="img-gris" src={htmlGris} alt="HTML en escala de grises" />
                <img className="img-color" src={htmlColor} alt="Logo de HTML a color" />
              </div>
              <div
                className="habilidades__card habilidades__card--css"
                data-aos="fade-right"
                data-aos-delay="500"
              >
                <img className="img-gris" src={cssGris} alt="CSS en escala de grises" />
                <img className="img-color" src={cssColor} alt="Logo de CSS a color" />
              </div>
              <div
                className="habilidades__card habilidades__card--js"
                data-aos="fade-right"
                data-aos-delay="600"
              >
                <img className="img-gris" src={jsGris} alt="JavaScript en escala de grises" />
                <img className="img-color" src={jsColor} alt="Logo de JavaScript a color" />
              </div>
              <div
                className="habilidades__card habilidades__card--sass"
                data-aos="fade-right"
                data-aos-delay="700"
              >
                <img className="img-gris" src={sassGris} alt="Sass en escala de grises" />
                <img className="img-color" src={sassColor} alt="Logo de Sass a color" />
              </div>
              <div
                className="habilidades__card habilidades__card--bootstrap"
                data-aos="fade-right"
                data-aos-delay="800"
              >
                <img className="img-gris" src={bootstrapGris} alt="Bootstrap en escala de grises" />
                <img className="img-color" src={bootstrapColor} alt="Logo de Bootstrap a color" />
              </div>
              <div
                className="habilidades__card habilidades__card--node"
                data-aos="fade-right"
                data-aos-delay="900"
              >
                <img className="img-gris" src={nodeGris} alt="Node.js en escala de grises" />
                <img className="img-color" src={nodeColor} alt="Logo de Node.js a color" />
              </div>
              <div
                className="habilidades__card habilidades__card--mongo"
                data-aos="fade-right"
                data-aos-delay="1000"
              >
                <img className="img-gris" src={mongoGris} alt="MongoDB en escala de grises" />
                <img className="img-color" src={mongoColor} alt="Logo de MongoDB a color" />
              </div>
              <div
                className="habilidades__card habilidades__card--wordpress"
                data-aos="fade-right"
                data-aos-delay="1100"
              >
                <img className="img-gris" src={wordpressGris} alt="WordPress en escala de grises" />
                 <img className="img-color" src={wordpressColor} alt="Logo de WordPress a color" /> 
              </div>
              <div
                className="habilidades__card habilidades__card--github"
                data-aos="fade-right"
                data-aos-delay="1200"
              >
                <img className="img-gris" src={githubGris} alt="GitHub en escala de grises" />
                <img className="img-color" src={githubColor} alt="Logo de GitHub a color" />
              </div>
            </div>
          </div>

          {/* === Diseño === */}
          <div
            className="habilidades__section"
            data-aos="fade-right"
            data-aos-delay="1300"
          >
            <h3
              className="habilidades__subtitle subtitle-section"
              data-section="habilidades"
              data-value="disenoTitulo"
              data-aos="fade-right"
              data-aos-delay="1400"
            >
                  {texts.habilidades.disenoTitulo}
            </h3>
            <div className="habilidades__cards">
              <div
                className="habilidades__card habilidades__card--ai"
                data-aos="fade-right"
                data-aos-delay="1500"
              >
                <img className="img-gris" src={aiGris} alt="Adobe Illustrator en escala de grises" />
                <img className="img-color" src={aiColor} alt="Logo de Adobe Illustrator a color" />
              </div>
              <div
                className="habilidades__card habilidades__card--ps"
                data-aos="fade-right"
                data-aos-delay="1600"
              >
                <img className="img-gris" src={psGris} alt="Adobe Photoshop en escala de grises" />
                <img className="img-color" src={psColor} alt="Logo de Adobe Photoshop a color" />
              </div>
              <div
                className="habilidades__card habilidades__card--figma"
                data-aos="fade-right"
                data-aos-delay="1700"
              >
                <img className="img-gris" src={figmaGris} alt="Figma en escala de grises" />
                <img className="img-color" src={figmaColor} alt="Logo de Figma a color" />
              </div>
            </div>
          </div>

          {/* === Aprendiendo... === */}
          <div
            className="habilidades__section"
            data-aos="fade-right"
            data-aos-delay="1800"
          >
            <h3
              className="habilidades__subtitle habilidades__subtitle--aprendiendo subtitle-section"
              data-section="habilidades"
              data-value="aprendiendoTitulo"
              data-aos="fade-right"
              data-aos-delay="1900"
            >
                  {texts.habilidades.aprendiendoTitulo}
            </h3>
            <div className="habilidades__cards">
              <div
                className="habilidades__card habilidades__card--react"
                data-aos="fade-right"
                data-aos-delay="2000"
              >
                <img className="img-gris" src={reactGris} alt="React en escala de grises" />
                <img className="img-color" src={reactColor} alt="Logo de React a color" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Skills;