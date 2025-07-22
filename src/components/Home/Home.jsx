import React, { useEffect, useRef, useState } from "react";

import Hero from "./Hero";
import Skills from "./Skills";
import Projects from "./Projects";
import About from "./About";
import Contact from "./Contact";
import HudNav from './HudNav';
import Modal from "./Modal";
import Header from "../Header";
import HudLenguaje from "../hudLenguaje";

const fondos = [
  "../../assets/img/Backgrounds/bg1.webp",
  "../../assets/img/Backgrounds/bg2.webp",
  "../../assets/img/Backgrounds/bg4.webp",
  "../../assets/img/Backgrounds/bg7.webp",
  "../../assets/img/Backgrounds/bg8.webp",
  "../../assets/img/Backgrounds/bgContact2.webp",
  "../../assets/img/Backgrounds/bgProyecto.webp",
  "../../assets/img/Backgrounds/Black.webp",
];


function Home() {
 const bgLayer1Ref = useRef(null);
  const bgLayer2Ref = useRef(null);
  const [activeLayer, setActiveLayer] = useState(1);
  const lastBgRef = useRef(null); // para mantener valor persistente sin re-render

  // Función para cambiar fondo con fade entre 2 layers
  function cambiarFondoConFade(nuevoBg) {
    if (nuevoBg === lastBgRef.current) return;

    const layerToShow = activeLayer === 1 ? bgLayer2Ref.current : bgLayer1Ref.current;
    const layerToHide = activeLayer === 1 ? bgLayer1Ref.current : bgLayer2Ref.current;

    if (layerToShow && layerToHide) {
      layerToShow.style.backgroundImage = `url(${nuevoBg})`;
      layerToShow.classList.add('visible');
      layerToHide.classList.remove('visible');

      setActiveLayer(activeLayer === 1 ? 2 : 1);
      lastBgRef.current = nuevoBg;
    }
  }

  // Detectar cuál sección está activa (en el viewport)
  function detectarSeccionActiva() {
    const secciones = document.querySelectorAll('.section-bg');
    let seccionActiva = null;
    const ventanaAltura = window.innerHeight;

    secciones.forEach((seccion) => {
      const rect = seccion.getBoundingClientRect();
      if (rect.top <= ventanaAltura * 0.5 && rect.bottom >= ventanaAltura * 0.5) {
        seccionActiva = seccion;
      }
    });

    if (seccionActiva) {
      const bg = seccionActiva.dataset.bg;
      if (bg) {
        cambiarFondoConFade(bg);
      }
    }
  }

  useEffect(() => {
    // Precarga las imágenes de fondo
    fondos.forEach((src) => {
      const img = new Image();
      img.src = src;
    });

    // Debounce para evitar exceso de llamadas al scroll
    let debounceTimeout = null;

    function cambiarFondoConDebounce() {
      if (debounceTimeout) clearTimeout(debounceTimeout);
      debounceTimeout = setTimeout(() => {
        detectarSeccionActiva();
      }, 100);
    }

    // Al cargar la página asignar el fondo inmediatamente
    detectarSeccionActiva();

    // Escuchar evento scroll con debounce
    window.addEventListener('scroll', cambiarFondoConDebounce);

    // Cleanup al desmontar
    return () => {
      window.removeEventListener('scroll', cambiarFondoConDebounce);
      if (debounceTimeout) clearTimeout(debounceTimeout);
    };
  }, [activeLayer]); // Nota: activeLayer en deps para leer valor actualizado


  return (
    <>
       <div className="background-container">
        <div ref={bgLayer1Ref} className="bg-layer bg-layer1 visible"></div>
        <div ref={bgLayer2Ref} className="bg-layer bg-layer2"></div>
      </div>

      <HudLenguaje />
      <Header />
      <Hero />
      <Projects />
      <Skills />
      <Modal />
      <About />
      <Contact />
      <HudNav />
    </>
  );
}

export default Home;
