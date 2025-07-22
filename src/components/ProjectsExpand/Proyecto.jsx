import Header from "../Header";
import HudLenguaje from "../hudLenguaje";
import Faq from "./Faq";
import HeroExpand from "./HeroExpand";
import Objetivos from "./Objetivos";
import Tecnologias from "./Tecnologias";


function Proyecto() {
  return (
    <>
      <div className="body--proyecto">

        <HudLenguaje />
        <Header />
        <HeroExpand />
        <Objetivos />
        <Tecnologias />
        <Faq />
      </div>
    </>
  );
}

export default Proyecto;
