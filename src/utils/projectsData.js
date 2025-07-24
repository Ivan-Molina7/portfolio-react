import NBC from '../assets/img/LogosProyectos/NBC2.png';
import CAP from '../assets/img/LogosProyectos/CAP.png';
import Havanna from '../assets/img/LogosProyectos/Havanna.png';
import CulPadel from '../assets/img/LogosProyectos/CulPadel.png';
import WorldGym from '../assets/img/LogosProyectos/WorldGym.png';

export const projectsData = [
  {
    id: 1,
    tipo: "trabajo",

    // Si quieres un texto fijo (no traducible), pon 'titulo'
    titulo: "Club Atlético Progreso",

    // Si quieres traducir descripción, pon 'descripcionKey' con la ruta correcta
    descripcionKey: "proyecto.cap_descripcion",

    imagen: CAP,

    // Campos traducibles con sufijo Key (claves completas para buscar en JSON)
    objetivo1Key: "objetivos.cap_item1Texto",
    objetivo2Key: "objetivos.cap_item2Texto",
    objetivo3Key: "objetivos.cap_item3Texto",

    pregunta1Key: "proyecto_about.cap_pregunta1",
    respuesta1Key: "proyecto_about.cap_respuesta1",

    pregunta2Key: "proyecto_about.cap_pregunta2",
    respuesta2Key: "proyecto_about.cap_respuesta2",

    pregunta3Key: "proyecto_about.cap_pregunta3",
    respuesta3Key: "proyecto_about.cap_respuesta3",
  },
  {
    id: 2,
    tipo: "proyecto",

    titulo: "Club Atlético Progreso",
    descripcionKey: "proyecto.cap_descripcion",
    imagen: CAP,

    objetivo1Key: "proyecto.cap_item1Texto",
    objetivo2Key: "proyecto.cap_item2Texto",
    objetivo3Key: "proyecto.cap_item3Texto",

    pregunta1Key: "proyecto.cap_pregunta1Texto",
    respuesta1Key: "proyecto.cap_respuesta1Texto",

    pregunta2Key: "proyecto.cap_pregunta2Texto",
    respuesta2Key: "proyecto.cap_respuesta2Texto",

    pregunta3Key: "proyecto.cap_pregunta3Texto",
    respuesta3Key: "proyecto.cap_respuesta3Texto",
  },
];
