import iconEstado from '../../assets/img/Icons/estado.svg';
import githubIcon from '../../assets/img/Icons/White/github.png';
import behanceIcon from '../../assets/img/Icons/White/behance.png';

import Background from '../../assets/img/Backgrounds/bg1.webp';
import useTranslation from '../../hooks/useTranslation';

function Hero() {

    const { texts } = useTranslation();

  return (
    <div className="overflow-section-100vh overflow-section-100vh--hero" id="hero">
      <section
        className="hero max-width-section section-bg"
        data-bg={Background}
      >
        <div className="hero__titles">
          <div className="estado">
            <img src={iconEstado} alt="Efecto camara grabando"/>
            <span>
               {texts.hero.ofertas}
            </span>
          </div>

          <h1 className="hero__title">
            {texts.hero.nombre}
          </h1>

          <div className="hero__subtitles">
            <p className="hero__subtitle">
               <span> {texts.hero.descripcionSpan}</span> <br /> {texts.hero.descripcion}
            </p>
            <p className="hero__pais">
              Montevideo, Uruguay
            </p>
          </div>
        </div>

        <div className="hero__buttons">
          <a className="btn btn--secondary" href="#proyectos">
            <span>
              {texts.hero.leerMas}
            </span>
          </a>

          <a className="btn" href="#about">
            <span data-section="hero" data-value="sobreMi">
              {texts.hero.sobreMi}
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
