import NBCLogo from '../assets/img/LogosProyectos/NBC2.png';
import CAPLogo from '../assets/img/LogosProyectos/CAP.png';
import CulPadelLogo from '../assets/img/LogosProyectos/CulPadel.png';
import HavannaLogo from '../assets/img/LogosProyectos/Havanna.png';
import WorldGymLogo from '../assets/img/LogosProyectos/WorldGym.png';



//*ICONOS TECNOLOGIAS
import htmlGris from '../assets/img/habilidades/html.png';
import cssGris from '../assets/img/habilidades/css.png';
import jsGris from '../assets/img/habilidades/js.png';
import sassGris from '../assets/img/habilidades/sass.png';
import bootstrapGris from '../assets/img/habilidades/bootstrap.png';
import nodeGris from '../assets/img/habilidades/node.png';
import mongoGris from '../assets/img/habilidades/mongo.png';
import wordpressGris from '../assets/img/habilidades/wordpress.webp';
import githubGris from '../assets/img/habilidades/github.png';
import aiGris from '../assets/img/habilidades/ai.png';
import psGris from '../assets/img/habilidades/ps.png';
import figmaGris from '../assets/img/habilidades/figma.png';
import reactGris from '../assets/img/habilidades/react.webp';

//*Modal
import CAPMain from '../assets/img/proyectos/Progreso/Home.webp';
import CAP2 from '../assets/img/proyectos/Progreso/directiva.webp';
import CAP3 from '../assets/img/proyectos/Progreso/noticias.webp';

//*Modal
import NBCMain from '../assets/img/proyectos/Nbc/Home.webp';
import NBC2 from '../assets/img/proyectos/Nbc/2.webp';
import NBC3 from '../assets/img/proyectos/Nbc/3.webp';

//*Modal
import HavannaMain from '../assets/img/proyectos/Havanna/Home.webp';
import Havanna2 from '../assets/img/proyectos/Havanna/2.webp';
import Havanna3 from '../assets/img/proyectos/Havanna/3.webp';

//*Modal
import CulPadelMain from '../assets/img/proyectos/culPadel/Home.webp';
import CulPadel2 from '../assets/img/proyectos/culPadel/2.webp';
import CulPadel3 from '../assets/img/proyectos/culPadel/3.webp';

//*Modal
import WorldGymMain from '../assets/img/proyectos/worldGym/Home.png';
import WorldGym2 from '../assets/img/proyectos/worldGym/2.png';



export const projectsData = [
  {
    id: 1,
    tipo: "trabajo",
    behance: true,
    behanceLink: "https://www.behance.net/gallery/225457609/Transformacion-Digital-Club-Atltico-Progreso-Uruguay",
    sitio: true,
    sitioLink: "https://caprogreso.netlify.app/",
    titulo: "Club Atlético Progreso",
    descripcionKey: "proyecto.cap_descripcion",
    Logo: CAPLogo,

    imagenAlt: "Mockup de Club Atlético Progreso página",
    objetivo1Key: "objetivos.cap_item1Texto",
    objetivo2Key: "objetivos.cap_item2Texto",
    objetivo3Key: "objetivos.cap_item3Texto",
    pregunta1Key: "proyecto_about.cap_pregunta1",
    respuesta1Key: "proyecto_about.cap_respuesta1",
    pregunta2Key: "proyecto_about.cap_pregunta2",
    respuesta2Key: "proyecto_about.cap_respuesta2",
    pregunta3Key: "proyecto_about.cap_pregunta3",
    respuesta3Key: "proyecto_about.cap_respuesta3",

    tecnologias: [
      { icono: htmlGris, alt: 'HTML' },
      { icono: cssGris, alt: 'CSS' },
      { icono: jsGris, alt: 'JavaScript' },
      { icono: sassGris, alt: 'Sass' },
      { icono: mongoGris, alt: 'MongoDB' },
      { icono: nodeGris, alt: 'Node.js' },
      { icono: figmaGris, alt: 'Figma' },
    ],

    imagenesModal: [
      { src: CAPMain, alt: 'Pantalla 1 del proyecto' },
      { src: CAP2, alt: 'Pantalla 2 del proyecto' },
      { src: CAP3, alt: 'Pantalla 3 del proyecto' },
    ]

  },
  {
    id: 2,
    tipo: "proyecto",
    behance: false,
    sitio: true,
    sitioLink: "https://nbccargo.netlify.app/",
    titulo: "NBC Cargo",
    descripcionKey: "proyecto.nbc_descripcion",
    Logo: NBCLogo,
    imagenAlt: "Mockup de NBC Cargo página",
    objetivo1Key: "objetivos.nbc_item1Texto",
    objetivo2Key: "objetivos.nbc_item2Texto",
    objetivo3Key: "objetivos.nbc_item3Texto",
    pregunta1Key: "proyecto_about.nbc_pregunta1",
    respuesta1Key: "proyecto_about.nbc_respuesta1",
    pregunta2Key: "proyecto_about.nbc_pregunta2",
    respuesta2Key: "proyecto_about.nbc_respuesta2",
    pregunta3Key: "proyecto_about.nbc_pregunta3",
    respuesta3Key: "proyecto_about.nbc_respuesta3",
    tecnologias: [
      { icono: htmlGris, alt: 'HTML' },
      { icono: cssGris, alt: 'CSS' },
      { icono: jsGris, alt: 'JavaScript' },
      { icono: sassGris, alt: 'Sass' },
      { icono: bootstrapGris, alt: 'bootstrap' },
    ],
    imagenesModal: [
      { src: NBCMain, alt: 'Pantalla 1 del proyecto NBC Cargo' },
      { src: NBC2, alt: 'Pantalla 2 del proyecto NBC Cargo' },
      { src: NBC3, alt: 'Pantalla 3 del proyecto NBC Cargo' },
    ]
  },
  {
    id: 3,
    tipo: "proyecto",
    behance: true,
    behanceLink: "https://www.behance.net/gallery/225725831/HAVANNA-Diseno-UXUI-para-relojes-de-lujo",
    sitio: false,
    sitioLink: "",
    titulo: "Havanna",
    descripcionKey: "proyecto.havanna_descripcion",
    Logo: HavannaLogo,
    imagenAlt: "Mockup de Havanna",
    objetivo1Key: "objetivos.havanna_item1Texto",
    objetivo2Key: "objetivos.havanna_item2Texto",
    objetivo3Key: "objetivos.havanna_item3Texto",
    pregunta1Key: "proyecto_about.havanna_pregunta1",
    respuesta1Key: "proyecto_about.havanna_respuesta1",
    pregunta2Key: "proyecto_about.havanna_pregunta2",
    respuesta2Key: "proyecto_about.havanna_respuesta2",
    pregunta3Key: "proyecto_about.havanna_pregunta3",
    respuesta3Key: "proyecto_about.havanna_respuesta3",
    tecnologias: [
      { icono: figmaGris, alt: 'Figma' },
      { icono: psGris, alt: 'Photoshop' },
      { icono: aiGris, alt: 'Illustrator' },
    ],
    imagenesModal: [
      { src: HavannaMain, alt: 'Pantalla 1 del proyecto Havanna' },
      { src: Havanna2, alt: 'Pantalla 2 del proyecto Havanna' },
      { src: Havanna3, alt: 'Pantalla 3 del proyecto Havanna' },
    ]
  },
  {
    id: 4,
    tipo: "proyecto",
    behance: true,
    behanceLink: "https://www.behance.net/gallery/225458053/CulPadel-Diseno-UXUI-para-App-Movil-Deportiva",
    sitio: false,
    sitioLink: "",
    titulo: "CulPadel",
    descripcionKey: "proyecto.culPadel_descripcion",
    Logo: CulPadelLogo,
    imagenAlt: "Mockup de culpadel",
    objetivo1Key: "objetivos.culPadel_item1Texto",
    objetivo2Key: "objetivos.culPadel_item2Texto",
    objetivo3Key: "objetivos.culPadel_item3Texto",
    pregunta1Key: "proyecto_about.culPadel_pregunta1",
    respuesta1Key: "proyecto_about.culPadel_respuesta1",
    pregunta2Key: "proyecto_about.culPadel_pregunta2",
    respuesta2Key: "proyecto_about.culPadel_respuesta2",
    pregunta3Key: "proyecto_about.culPadel_pregunta3",
    respuesta3Key: "proyecto_about.culPadel_respuesta3",
    tecnologias: [
      { icono: figmaGris, alt: 'Figma' },
      { icono: psGris, alt: 'Photoshop' },
      { icono: aiGris, alt: 'Illustrator' },
    ],
    imagenesModal: [
      { src: CulPadelMain, alt: 'Pantalla 1 del proyecto CulPadel' },
      { src: CulPadel2, alt: 'Pantalla 2 del proyecto CulPadel' },
      { src: CulPadel3, alt: 'Pantalla 3 del proyecto CulPadel' },
    ]
  },
    {
    id: 5,
    tipo: "proyecto",
    behance: false,
    behanceLink: "",
    sitio: true,
    sitioLink: "https://worldgym.netlify.app/",
    titulo: "WorldGym",
    descripcionKey: "proyecto.worldGym_descripcion",
    Logo: WorldGymLogo,
    imagenAlt: "Mockup de wordlGym",
    objetivo1Key: "objetivos.worldGym_item1Texto",
    objetivo2Key: "objetivos.worldGym_item2Texto",
    objetivo3Key: "objetivos.worldGym_item3Texto",
    pregunta1Key: "proyecto_about.worldGym_pregunta1",
    respuesta1Key: "proyecto_about.worldGym_respuesta1",
    pregunta2Key: "proyecto_about.worldGym_pregunta2",
    respuesta2Key: "proyecto_about.worldGym_respuesta2",
    pregunta3Key: "proyecto_about.worldGym_pregunta3",
    respuesta3Key: "proyecto_about.worldGym_respuesta3",
    tecnologias: [
      { icono: htmlGris, alt: 'HTML' },
      { icono: cssGris, alt: 'CSS' },
      { icono: jsGris, alt: 'JavaScript' },
    ],
    imagenesModal: [
      { src: WorldGymMain, alt: 'Pantalla 1 del proyecto World GYm' },
      { src: WorldGym2, alt: 'Pantalla 2 del proyecto World GYm' },

    ]
  },

];
