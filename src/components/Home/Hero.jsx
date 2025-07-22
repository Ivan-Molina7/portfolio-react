import iconEstado from '../../assets/img/Icons/estado.svg';
import githubIcon from '../../assets/img/Icons/White/github.png';
import behanceIcon from '../../assets/img/Icons/White/behance.png';

import Background from '../../assets/img/Backgrounds/bg1.webp';

function Hero() {
  return (
    <div className="overflow-section-100vh overflow-section-100vh--hero" id="hero">
      <section
        className="hero max-width-section section-bg"
        data-bg={Background}
      >
        <div className="hero__titles">
          <div className="estado">
            <img src={iconEstado} alt="Efecto camara grabando"/>
            <span data-section="hero" data-value="ofertas">
              Abierto a ofertas
            </span>
          </div>

          <h1 className="hero__title" data-section="hero" data-value="nombre">
            IVAN MOLINA
          </h1>

          <div className="hero__subtitles">
            <p
              className="hero__subtitle"
              data-section="hero"
              data-value="descripcion"
            ></p>
            <p className="hero__pais" data-section="hero" data-value="ubicacion">
              Montevideo, Uruguay
            </p>
          </div>
        </div>

        <div className="hero__buttons">
          <a className="btn btn--secondary" href="#proyectos">
            <span data-section="hero" data-value="leerMas">
              Leer más
            </span>
          </a>

          <a className="btn" href="#about">
            <span data-section="hero" data-value="sobreMi">
              Sobre mi
            </span>
          </a>
        </div>
      </section>

      <div className="hud-secciones">
        <a href="#hero" className="circle circle--active"></a>
        <a href="#proyectos" className="circle "></a>
        <a href="#habilidades" className="circle"></a>
        <a href="#about" className="circle"></a>
        <a href="#contacto" className="circle"></a>
      </div>

    </div>
  );
}

export default Hero;
