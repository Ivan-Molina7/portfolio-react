import githubIcon from "../assets/img/Icons/White/github.png";
import behanceIcon from "../assets/img/Icons/White/behance.png";
import { useEffect, useState } from "react";

function HudLenguaje() {
  const [language, setLanguage] = useState(
    () => localStorage.getItem("language") || "es"
  );

  // Guardar en localStorage cada vez que cambie el idioma
  useEffect(() => {
    localStorage.setItem("language", language);
  }, [language]);

  const changeLanguage = (lang) => {
    setLanguage(lang);
  };

  return (
    <div className="hud">
      <div className="hud__redes">
        <a href="https://github.com/Ivan-Molina7" target="_blank">
          <img src={githubIcon} alt="" className="hud__image" />
        </a>
        <a href="https://www.behance.net/molinaivan" target="_blank">
          <img src={behanceIcon} alt="" className="hud__image" />
        </a>
      </div>
      <div className="hud__idiomas" id="nav-language" data-langauge={language}>
        <p className="hud__idioma hud__idioma-1" data-language="es"  onClick={() => changeLanguage('es')}>
          ESP
        </p>
        <p className="hud__idioma hud__idioma-2" data-language="en"     onClick={() => changeLanguage('en')}>
          ENG
        </p>
      </div>
    </div>
  );
}

export default HudLenguaje;
