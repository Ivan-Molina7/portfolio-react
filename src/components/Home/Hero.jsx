import useTranslation from '../../hooks/useTranslation';

function Hero() {
  const { texts } = useTranslation();

  return (
    <div className="home-screen" id="hero" data-s="0">
      <section className="home-wrap home-wrap--hero" aria-labelledby="hero-titulo">
        <span className="hero-open">
          {texts.hero.ofertas}
          <em className="hero-open__loc">{texts.hero.ubicacion}</em>
        </span>
        <h1 className="hero-name" id="hero-titulo">{texts.hero.nombre}</h1>
        <p className="hero-role">{texts.hero.descripcionSpan}</p>
        <p className="hero-phrase">{texts.hero.descripcion}</p>
        <p className="hero-stack">{texts.hero.stack}</p>
        <div className="hero-ctas">
          <a className="home-btn" href="#proyectos">{texts.hero.leerMas}</a>
          <a className="home-btn home-btn--solid" href="#about">{texts.hero.sobreMi}</a>
        </div>
      </section>
    </div>
  );
}

export default Hero;
