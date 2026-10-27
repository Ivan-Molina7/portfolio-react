import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./components/Home/Home";
import AOS from "aos";
import "aos/dist/aos.css";
import Proyecto from "./components/ProjectsExpand/Proyecto";
import TranslationProvider from "./contexts/TranslationProvider";
import HudLenguaje from "./components/HudLenguaje";
import { ProjectsGallery } from "./components/ProjectsGallery";
import PreloadBackgrounds from "./utils/PreLoadImages";
import GoogleAnalytics from "./components/GoogleAnalytics";

function App() {
  useEffect(() => {
    AOS.init({});
  }, []);

  return (
    <TranslationProvider>
      <PreloadBackgrounds/>
            <GoogleAnalytics />
      <HudLenguaje />
      <Routes>
       <Route path="/proyecto/:id" element={<Proyecto />} />
        <Route path="/" element={<Home />} />
         <Route path="/galeriaProyectos" element={<ProjectsGallery />} />
      </Routes>
    </TranslationProvider>
  );
}

export default App;
