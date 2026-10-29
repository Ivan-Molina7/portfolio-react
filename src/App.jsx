import { useEffect, lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import AOS from "aos";
import "aos/dist/aos.css";
import Proyecto from "./components/ProjectsExpand/Proyecto";
import TranslationProvider from "./contexts/TranslationProvider";
import Hud from "./components/Hud/Hud";
import { ProjectsGallery } from "./components/ProjectsGallery";
import PreloadBackgrounds from "./utils/PreLoadImages";
import GoogleAnalytics from "./components/GoogleAnalytics";
import Background from "./components/Background/Background";
import { BackgroundProvider } from "./components/Background/BackgroundContext";

const BackgroundDebug = import.meta.env.DEV ? lazy(() => import("./components/Background/BackgroundDebug")) : null;

function App() {
  useEffect(() => {
    AOS.init({});
  }, []);

  return (
    <TranslationProvider>
      <BackgroundProvider>
      <Background />
      <PreloadBackgrounds/>
            <GoogleAnalytics />
      <Hud />
      <Routes>
       <Route path="/proyecto/:id" element={<Proyecto />} />
        <Route path="/" element={<Home />} />
         <Route path="/galeriaProyectos" element={<ProjectsGallery />} />
        {BackgroundDebug && (
          <Route path="/__bg" element={<Suspense fallback={null}><BackgroundDebug /></Suspense>} />
        )}
      </Routes>
      </BackgroundProvider>
    </TranslationProvider>
  );
}

export default App;
