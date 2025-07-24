import useTranslation from "../../hooks/useTranslation";

function HeroExpand({ titulo, descripcion }) {
  const { texts } = useTranslation();

  return (
    <section className="hero-proyecto mb-section max-width-section">
      <div className="hero-proyecto__image-container" data-aos="fade-right" data-aos-delay="100">
        <img src="../assets/img/proyectos/culPadel/Home.webp" alt="Mockup CulPadel" className="hero-proyecto__image" />
        <div className="hero-proyecto__overlay" data-section="proyecto" data-value="overlayTexto">
          <img src="../assets/img/Icons/White/touch.png" alt="tocar pantalla icono" />
          Haz click para ver más pantallas
        </div>
      </div>
      <div className="hero-proyecto__container" data-aos="fade-left" data-aos-delay="300">
        <h1 className="hero-proyecto__titulo" data-aos="fade-left" data-aos-delay="400">{titulo}</h1>
        <div className="hero-proyecto__content" data-aos="fade-left" data-aos-delay="500">
          <p className="hero-proyecto__descripcion" >
            {descripcion}
          </p>
          <div className="hero-proyecto__botones" data-aos="fade-left" data-aos-delay="600">
            <a href="" target="_blank" className="hero-proyecto__btn btn btn--secondary" data-section="proyecto" data-value="btnMasInfo">
              Más información en mi Behance
            </a>

            <a href="" target="_blank" className="hero-proyecto__btn btn" data-section="proyecto" data-value="btnVisitar">
              Visitar sitio
            </a>
          </div>
        </div>
      </div>
    </section>

  );
}

export default HeroExpand;