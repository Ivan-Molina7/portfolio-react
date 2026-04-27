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

import wooGris from '../../assets/img/habilidades/woo.png';
import wooColor from '../../assets/img/habilidades/LogoColores/woo.png';

import supabaseGris from '../../assets/img/habilidades/supabase.png';
import supabaseColor from '../../assets/img/habilidades/LogoColores/supabase.png';

import tailwindGris from '../../assets/img/habilidades/Tailwind-G.png';
import tailwindColor from '../../assets/img/habilidades/LogoColores/Tailwind.png';

import claudeGris from '../../assets/img/habilidades/Claude-G.png';
import claudeColor from '../../assets/img/habilidades/LogoColores/Claude.png';

import tanStack from '../../assets/img/habilidades/tanstack-G.png';
import tanStackColor from '../../assets/img/habilidades/LogoColores/tanstack.png';

import zustand from '../../assets/img/habilidades/Zustand-G.png';
import zustandColor from '../../assets/img/habilidades/LogoColores/Zustand.png';

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
        data-aos="fade-right"
        data-aos-delay="100"
      >
        {texts.habilidades.titulo}
      </h2>
      <div className="habilidades__container">
        {/* === FRONTEND === */}
        <div
          className="habilidades__section"
          data-aos="fade-right"
          data-aos-delay="150"
        >
          <h3
            className="habilidades__subtitle subtitle-section"
            data-aos="fade-right"
            data-aos-delay="200"
          >
            {texts.habilidades.frontendTitulo}
          </h3>
          <div className="habilidades__cards">
            <div className="habilidades__card" data-aos="fade-right" data-aos-delay="250">
              <img className="img-gris" src={htmlGris} alt="HTML" />
              <img className="img-color" src={htmlColor} alt="HTML" />
            </div>
            <div className="habilidades__card" data-aos="fade-right" data-aos-delay="300">
              <img className="img-gris" src={cssGris} alt="CSS" />
              <img className="img-color" src={cssColor} alt="CSS" />
            </div>
            <div className="habilidades__card" data-aos="fade-right" data-aos-delay="350">
              <img className="img-gris" src={jsGris} alt="JavaScript" />
              <img className="img-color" src={jsColor} alt="JavaScript" />
            </div>
            <div className="habilidades__card" data-aos="fade-right" data-aos-delay="400">
              <img className="img-gris" src={reactGris} alt="React" />
              <img className="img-color" src={reactColor} alt="React" />
            </div>
            <div className="habilidades__card" data-aos="fade-right" data-aos-delay="450">
              <img className="img-gris" src={sassGris} alt="Sass" />
              <img className="img-color" src={sassColor} alt="Sass" />
            </div>
            <div className="habilidades__card" data-aos="fade-right" data-aos-delay="500">
              <img className="img-gris" src={tailwindGris} alt="Tailwind" />
              <img className="img-color" src={tailwindColor} alt="Tailwind" />
            </div>
            <div className="habilidades__card" data-aos="fade-right" data-aos-delay="550">
              <img className="img-gris" src={bootstrapGris} alt="Bootstrap" />
              <img className="img-color" src={bootstrapColor} alt="Bootstrap" />
            </div>
          </div>
        </div>

        {/* === BACKEND & TOOLS === */}
        <div
          className="habilidades__section"
          data-aos="fade-right"
          data-aos-delay="600"
        >
          <h3
            className="habilidades__subtitle subtitle-section"
            data-aos="fade-right"
            data-aos-delay="650"
          >
            {texts.habilidades.backendTitulo}
          </h3>
          <div className="habilidades__cards">
            <div className="habilidades__card" data-aos="fade-right" data-aos-delay="700">
              <img className="img-gris" src={nodeGris} alt="Node.js" />
              <img className="img-color" src={nodeColor} alt="Node.js" />
            </div>
            <div className="habilidades__card" data-aos="fade-right" data-aos-delay="750">
              <img className="img-gris" src={mongoGris} alt="MongoDB" />
              <img className="img-color" src={mongoColor} alt="MongoDB" />
            </div>
            <div className="habilidades__card" data-aos="fade-right" data-aos-delay="800">
              <img className="img-gris" src={supabaseGris} alt="Supabase" />
              <img className="img-color" src={supabaseColor} alt="Supabase" />
            </div>
            <div className="habilidades__card" data-aos="fade-right" data-aos-delay="850">
              <img className="img-gris" src={tanStack} alt="TanStack Query" />
              <img className="img-color" src={tanStackColor} alt="TanStack Query" />
            </div>
            <div className="habilidades__card" data-aos="fade-right" data-aos-delay="900">
              <img className="img-gris" src={zustand} alt="Zustand" />
              <img className="img-color" src={zustandColor} alt="Zustand" />
            </div>
            <div className="habilidades__card" data-aos="fade-right" data-aos-delay="950">
              <img className="img-gris" src={claudeGris} alt="Claude AI" />
              <img className="img-color" src={claudeColor} alt="Claude AI" />
            </div>
            <div className="habilidades__card" data-aos="fade-right" data-aos-delay="1000">
              <img className="img-gris" src={githubGris} alt="GitHub" />
              <img className="img-color" src={githubColor} alt="GitHub" />
            </div>
            <div className="habilidades__card" data-aos="fade-right" data-aos-delay="1050">
              <img className="img-gris" src={wordpressGris} alt="WordPress" />
              <img className="img-color" src={wordpressColor} alt="WordPress" />
            </div>
            <div className="habilidades__card" data-aos="fade-right" data-aos-delay="1100">
              <img className="img-gris" src={wooGris} alt="WooCommerce" />
              <img className="img-color" src={wooColor} alt="WooCommerce" />
            </div>
          </div>
        </div>

        {/* === DISEÑO === */}
        <div
          className="habilidades__section"
          data-aos="fade-right"
          data-aos-delay="1150"
        >
          <h3
            className="habilidades__subtitle subtitle-section"
            data-aos="fade-right"
            data-aos-delay="1200"
          >
            {texts.habilidades.disenoTitulo}
          </h3>
          <div className="habilidades__cards">
            <div className="habilidades__card" data-aos="fade-right" data-aos-delay="1250">
              <img className="img-gris" src={figmaGris} alt="Figma" />
              <img className="img-color" src={figmaColor} alt="Figma" />
            </div>
            <div className="habilidades__card" data-aos="fade-right" data-aos-delay="1300">
              <img className="img-gris" src={psGris} alt="Photoshop" />
              <img className="img-color" src={psColor} alt="Photoshop" />
            </div>
            <div className="habilidades__card" data-aos="fade-right" data-aos-delay="1350">
              <img className="img-gris" src={aiGris} alt="Illustrator" />
              <img className="img-color" src={aiColor} alt="Illustrator" />
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
);
}

export default Skills;