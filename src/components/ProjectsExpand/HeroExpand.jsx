function HeroExpand() {
    return ( 
         <section className="hero-proyecto mb-section max-width-section"  id="hero">
        <div className="hero-proyecto__image-container" data-aos="fade-right" data-aos-delay="100">
          <img src="../assets/img/proyectos/Nbc/Home.webp" alt="" className="hero-proyecto__image"/>
          <div className="hero-proyecto__overlay" data-section="proyecto" data-value="overlayTexto">
            <img src="../assets/img/Icons/White/touch.png" alt="tocar pantalla icono"/>
            Haz click para ver más pantallas
          </div>
        </div>
        <div className="hero-proyecto__container" data-aos="fade-left" data-aos-delay="300">
     
          <h1 className="hero-proyecto__titulo" data-aos="fade-left" data-aos-delay="400">NBC CARGO</h1>
      
          <div className="hero-proyecto__content" data-aos="fade-left" data-aos-delay="500">
            <p className="hero-proyecto__descripcion" data-section="proyecto" data-value="nbc_descripcion">
              Una plataforma web renovada que conecta a los hinchas con su club, ofreciendo noticias, estadísticas y contenidos actualizados en un entorno accesible y fácil de usar. Este proyecto busca modernizar la presencia digital del club y fortalecer el vínculo con su comunidad.
            </p>
            <div className="hero-proyecto__botones" data-aos="fade-left" data-aos-delay="600">
              <a href="http://www.nbccargo.com.uy/index.html" target="_blank" className="hero-proyecto__btn btn" data-section="proyecto" data-value="btnVisitar">
                Visitar sitio
              </a>

            </div>
          </div>
        </div>
      </section>
     );
}

export default HeroExpand;