import { useEffect } from 'react';
import BackgroundGaleria from '../assets/img/Backgrounds/bgGaleriaProyecto.webp';
import BackgroundProyectos from '../assets/img/Backgrounds/bgProyecto.webp';

function PreloadBackgrounds() {
  useEffect(() => {
    const galleryImg = new Image();
    galleryImg.src = BackgroundGaleria;

    const projectImg = new Image();
    projectImg.src = BackgroundProyectos;
  }, []);

  return null; // No renderiza nada
}

export default PreloadBackgrounds;
