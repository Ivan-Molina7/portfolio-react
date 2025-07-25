import html from '../../assets/img/habilidades/html.png';
import css from '../../assets/img/habilidades/css.png';
import js from '../../assets/img/habilidades/js.png';
import sass from '../../assets/img/habilidades/sass.png';
import mongo from '../../assets/img/habilidades/mongo.png';
import node from '../../assets/img/habilidades/node.png';
import figma from '../../assets/img/habilidades/figma.png';

function Tecnologias({tecnologias}) {
    return ( 
          <section className="proyecto-tecnologias mb-section">
    <h2 className="proyecto-tecnologias__titulo" data-section="tecnologias" data-value="tecnologiasTitulo" data-aos="fade-up" data-aos-delay="100">
      Tecnologías utilizadas
    </h2>
    <div className="proyecto-tecnologias__items">
       {tecnologias.map((tecnologia,i) => (
            <img key={tecnologia.alt} src={tecnologia.icono} alt={tecnologia.alt} className="proyecto-tecnologias__item" data-aos="fade-up" data-aos-delay={200 + i*100}/>
        )) }

    </div>
  </section>
     );
}

export default Tecnologias;