import githubIcon from "../assets/img/Icons/White/github.png";
import behanceIcon from "../assets/img/Icons/White/behance.png";
import { useEffect, useState } from "react";
import useTranslation from "../hooks/useTranslation";

function HudLenguaje() {
  const { texts, language, changeLanguage } = useTranslation();

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
        <p
          className="hud__idioma hud__idioma-1"
          onClick={() => changeLanguage("es")}
          style={{
            cursor: "pointer",
            opacity: language === "es" ? 1 : 0.4,
            fontWeight: language === "es" ? "bold" : "400",
            color: language === "es" ? "#00C457" : "#fff",
          }}
        >
          ESP
        </p>
        <p
          className="hud__idioma hud__idioma-2"
          onClick={() => changeLanguage("en")}
          style={{
            cursor: "pointer",
            opacity: language === "en" ? 1 : 0.4,
            fontWeight: language === "en" ? "bold" : "400",
            color: language === "en" ? "#00C457" : "#fff",
          }}
        >
          ENG
        </p>
      </div>
    </div>
  );
}

export default HudLenguaje;
