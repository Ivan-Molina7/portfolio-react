import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./components/Home/Home";
import AOS from "aos";
import "aos/dist/aos.css";
import Proyecto from "./components/ProjectsExpand/Proyecto";

function App() {
  useEffect(() => {
    AOS.init({});
    // Si tus componentes cambian mediante rutas o estado:
    AOS.refresh(); // o AOS.refreshHard();
  }, []);

  return (
    <>
    
      <Routes>
        <Route path="/proyecto" element={<Proyecto />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </>
  );
}

export default App;
