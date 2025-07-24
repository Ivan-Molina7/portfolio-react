import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./components/Home/Home";
import AOS from "aos";
import "aos/dist/aos.css";
import Proyecto from "./components/ProjectsExpand/Proyecto";
import TranslationProvider from "./contexts/TranslationProvider";
import HudLenguaje from "./components/hudLenguaje";

function App() {
  useEffect(() => {
    AOS.init({});
    // Si tus componentes cambian mediante rutas o estado:
    AOS.refresh(); // o AOS.refreshHard();
  }, []);

  return (
    <TranslationProvider>
      <HudLenguaje />
      <Routes>
       <Route path="/proyecto/:id" element={<Proyecto />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </TranslationProvider>
  );
}

export default App;
