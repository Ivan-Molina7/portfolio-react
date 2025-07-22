import html from '../../assets/img/habilidades/html.png';
import css from '../../assets/img/habilidades/css.png';
import js from '../../assets/img/habilidades/js.png';
import sass from '../../assets/img/habilidades/sass.png';
import mongo from '../../assets/img/habilidades/mongo.png';
import node from '../../assets/img/habilidades/node.png';
import figma from '../../assets/img/habilidades/figma.png';

function Tecnologias() {
    return ( 
          <section className="proyecto-tecnologias mb-section">
    <h2 className="proyecto-tecnologias__titulo" data-section="tecnologias" data-value="tecnologiasTitulo" data-aos="fade-up" data-aos-delay="100">
      Tecnologías utilizadas
    </h2>
    <div className="proyecto-tecnologias__items">
      <img src={html} alt="HTML" className="proyecto-tecnologias__item" data-aos="fade-up" data-aos-delay="200"/>
      <img src={css} alt="CSS" className="proyecto-tecnologias__item" data-aos="fade-up" data-aos-delay="300"/>
      <img src={js} alt="JavaScript" className="proyecto-tecnologias__item" data-aos="fade-up" data-aos-delay="400"/>
      <img src={sass} alt="Sass" className="proyecto-tecnologias__item" data-aos="fade-up" data-aos-delay="500"/>
      <img src={mongo} alt="MongoDB" className="proyecto-tecnologias__item" data-aos="fade-up" data-aos-delay="600"/>
      <img src={node} alt="Node.js" className="proyecto-tecnologias__item" data-aos="fade-up" data-aos-delay="700"/>
      <img src={figma} alt="Figma" className="proyecto-tecnologias__item" data-aos="fade-up" data-aos-delay="800"/>
    </div>
  </section>
     );
}

export default Tecnologias;