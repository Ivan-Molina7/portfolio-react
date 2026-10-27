import React, { useEffect, useState } from "react";

import Hero from "./Hero";
import Skills from "./Skills";
import Projects from "./Projects";
import About from "./About";
import Contact from "./Contact";
import HudNav from './HudNav';
import Modal from "./Modal";
import Header from "../Header";
import ShaderBackground from "./ShaderBackground";
import { defaultSection, sectionOrder } from "../../utils/bgPalettes";


function Home() {
  const [section, setSection] = useState(defaultSection);

  // Sección activa: la que cruza una línea al 50% del alto del viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setSection(entry.target.id);
        });
      },
      { rootMargin: "-50% 0px -50% 0px", threshold: 0 }
    );

    sectionOrder.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);


  return (
    <>
      <ShaderBackground section={section} />

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
