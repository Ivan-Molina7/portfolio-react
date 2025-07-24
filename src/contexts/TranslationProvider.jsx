import TranslationContext from "./TranslationContext";

import en from "../locales/en.json";
import es from "../locales/es.json";
import { useEffect, useState } from "react";

const translations = { es, en };

const TranslationProvider = ({ children }) => {
  const [language, setLanguage] = useState(
    () => localStorage.getItem("language") || "es"
  );
  const [texts, setTexts] = useState(translations[language]);

  useEffect(
    () => {
      setTexts(translations[language]);

      localStorage.setItem("language", [language]);
      
    }, [language] );

  const changeLanguage = (lang) => {
    if (translations[lang]) {
      setLanguage(lang);
    } else {
      console.warn(`Idioma "${lang}" no disponible.`);
    }
  };

  return (
    <TranslationContext.Provider value={{ texts, language, changeLanguage }}>
      {children}
    </TranslationContext.Provider>
  );
};

export default TranslationProvider;