import useTranslation from "../../hooks/useTranslation";

export default function LangSwitch() {
  const { texts, language, changeLanguage } = useTranslation();
  return (
    <div className="hud-lang" role="group" aria-label={texts.hud.idioma}>
      <button type="button" lang="es" aria-pressed={language === "es"} onClick={() => changeLanguage("es")}>
        ESP
      </button>
      <i aria-hidden="true" />
      <button type="button" lang="en" aria-pressed={language === "en"} onClick={() => changeLanguage("en")}>
        ENG
      </button>
    </div>
  );
}
