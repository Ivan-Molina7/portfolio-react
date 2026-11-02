// Datos de los proyectos (Proyectos, Galería y detalle). Las imágenes (logos, capturas, íconos de tecnologías) NO viven
// acá: salen de utils/assets.js y utils/projectAssets.js (normalizadas por scripts/normalize_assets.py).


export const projectsData = [{
    id: 1,
    tipo: "proyecto",
    destacado: true,
    behance: true,
    behanceLink: "https://www.behance.net/gallery/225457609/Transformacion-Digital-Club-Atltico-Progreso-Uruguay",
    figma: false,
    figmaLink: "",
    sitio: true,
    sitioLink: "https://caprogreso.netlify.app/",
    titulo: "Club Atlético Progreso",
    descripcionKey: "proyecto.cap_descripcion",

    objetivo1Key: "objetivos.cap_item1Texto",
    objetivo2Key: "objetivos.cap_item2Texto",
    objetivo3Key: "objetivos.cap_item3Texto",
    pregunta1Key: "proyecto_about.cap_pregunta1",
    respuesta1Key: "proyecto_about.cap_respuesta1",
    pregunta2Key: "proyecto_about.cap_pregunta2",
    respuesta2Key: "proyecto_about.cap_respuesta2",
    pregunta3Key: "proyecto_about.cap_pregunta3",
    respuesta3Key: "proyecto_about.cap_respuesta3",

    tecnologias: [{
        alt: 'HTML'
      },
      {
        alt: 'CSS'
      },
      {
        alt: 'JavaScript'
      },
      {
        alt: 'Sass'
      },
      {
        alt: 'MongoDB'
      },
      {
        alt: 'Node.js'
      },
      {
        alt: 'Figma'
      },
    ],

},
  {
    id: 2,
    tipo: "trabajo",
    destacado: true,
    behance: false,
    figma: false,
    figmaLink: "",
    sitio: true,
    sitioLink: "https://nbccargo.netlify.app/",
    titulo: "NBC Cargo",
    descripcionKey: "proyecto.nbc_descripcion",
    objetivo1Key: "objetivos.nbc_item1Texto",
    objetivo2Key: "objetivos.nbc_item2Texto",
    objetivo3Key: "objetivos.nbc_item3Texto",
    pregunta1Key: "proyecto_about.nbc_pregunta1",
    respuesta1Key: "proyecto_about.nbc_respuesta1",
    pregunta2Key: "proyecto_about.nbc_pregunta2",
    respuesta2Key: "proyecto_about.nbc_respuesta2",
    pregunta3Key: "proyecto_about.nbc_pregunta3",
    respuesta3Key: "proyecto_about.nbc_respuesta3",
    tecnologias: [{
        alt: 'HTML'
      },
      {
        alt: 'CSS'
      },
      {
        alt: 'JavaScript'
      },
      {
        alt: 'Sass'
      },
      {
        alt: 'bootstrap'
      },
    ],
},
  {
    id: 3,
    tipo: "proyecto",
    destacado: false,
    behance: true,
    behanceLink: "https://www.behance.net/gallery/225725831/HAVANNA-Diseno-UXUI-para-relojes-de-lujo",
    figma: false,
    figmaLink: "",
    sitio: false,
    sitioLink: "",
    titulo: "Havanna",
    descripcionKey: "proyecto.havanna_descripcion",
    objetivo1Key: "objetivos.havanna_item1Texto",
    objetivo2Key: "objetivos.havanna_item2Texto",
    objetivo3Key: "objetivos.havanna_item3Texto",
    pregunta1Key: "proyecto_about.havanna_pregunta1",
    respuesta1Key: "proyecto_about.havanna_respuesta1",
    pregunta2Key: "proyecto_about.havanna_pregunta2",
    respuesta2Key: "proyecto_about.havanna_respuesta2",
    pregunta3Key: "proyecto_about.havanna_pregunta3",
    respuesta3Key: "proyecto_about.havanna_respuesta3",
    tecnologias: [{
        alt: 'Figma'
      },
      {
        alt: 'Photoshop'
      },
      {
        alt: 'Illustrator'
      },
    ],
},
  {
    id: 4,
    tipo: "proyecto",
    destacado: false,
    behance: true,
    behanceLink: "https://www.behance.net/gallery/225458053/CulPadel-Diseno-UXUI-para-App-Movil-Deportiva",
    figma: false,
    figmaLink: "",
    sitio: false,
    sitioLink: "",
    titulo: "CulPadel",
    descripcionKey: "proyecto.culPadel_descripcion",
    objetivo1Key: "objetivos.culPadel_item1Texto",
    objetivo2Key: "objetivos.culPadel_item2Texto",
    objetivo3Key: "objetivos.culPadel_item3Texto",
    pregunta1Key: "proyecto_about.culPadel_pregunta1",
    respuesta1Key: "proyecto_about.culPadel_respuesta1",
    pregunta2Key: "proyecto_about.culPadel_pregunta2",
    respuesta2Key: "proyecto_about.culPadel_respuesta2",
    pregunta3Key: "proyecto_about.culPadel_pregunta3",
    respuesta3Key: "proyecto_about.culPadel_respuesta3",
    tecnologias: [{
        alt: 'Figma'
      },
      {
        alt: 'Photoshop'
      },
      {
        alt: 'Illustrator'
      },
    ],
},
  {
    id: 5,
    tipo: "proyecto",
    destacado: false,
    behance: false,
    behanceLink: "",
    figma: false,
    figmaLink: "",
    sitio: true,
    sitioLink: "https://worldgym.netlify.app/",
    titulo: "WorldGym",
    descripcionKey: "proyecto.worldGym_descripcion",
    objetivo1Key: "objetivos.worldGym_item1Texto",
    objetivo2Key: "objetivos.worldGym_item2Texto",
    objetivo3Key: "objetivos.worldGym_item3Texto",
    pregunta1Key: "proyecto_about.worldGym_pregunta1",
    respuesta1Key: "proyecto_about.worldGym_respuesta1",
    pregunta2Key: "proyecto_about.worldGym_pregunta2",
    respuesta2Key: "proyecto_about.worldGym_respuesta2",
    pregunta3Key: "proyecto_about.worldGym_pregunta3",
    respuesta3Key: "proyecto_about.worldGym_respuesta3",
    tecnologias: [{
        alt: 'HTML'
      },
      {
        alt: 'CSS'
      },
      {
        alt: 'JavaScript'
      },
    ],
},
{
  id: 6,
  tipo: "proyecto",
  destacado: true,
  behance: false,
  behanceLink: "",
  figma: true,
  figmaLink: "https://www.figma.com/design/sg7cPC9Bitogw61boIFSFf/Sandbox?node-id=0-1&t=IeKJL7IBgj7wkpHy-1",
  sitio: true,
  sitioLink: "https://sandboxuy.netlify.app/",
  titulo: "Sandbox",
  descripcionKey: "proyecto.sandbox_descripcion",
  objetivo1Key: "objetivos.sandbox_item1Texto",
  objetivo2Key: "objetivos.sandbox_item2Texto",
  objetivo3Key: "objetivos.sandbox_item3Texto",
  pregunta1Key: "proyecto_about.sandbox_pregunta1",
  respuesta1Key: "proyecto_about.sandbox_respuesta1",
  pregunta2Key: "proyecto_about.sandbox_pregunta2",
  respuesta2Key: "proyecto_about.sandbox_respuesta2",
  pregunta3Key: "proyecto_about.sandbox_pregunta3",
  respuesta3Key: "proyecto_about.sandbox_respuesta3",
  tecnologias: [
    {
      alt: 'HTML'
    },
    {
      alt: 'CSS'
    },
    {
      alt: 'SCSS'
    },
    {
      alt: 'JavaScript'
    },
    {
      alt: 'React'
    },
  ],
},
{
  id: 7,
  tipo: "trabajo",
  destacado: true,
  behance: false,
  behanceLink: "",
  figma: false,
  figmaLink: "",
  sitio: true,
  sitioLink: "https://transportesuy.com.uy/",
  titulo: "Transportes UY",
  descripcionKey: "proyecto.transportes_descripcion",

  objetivo1Key: "objetivos.transportes_item1Texto",
  objetivo2Key: "objetivos.transportes_item2Texto",
  objetivo3Key: "objetivos.transportes_item3Texto",

  pregunta1Key: "proyecto_about.transportes_pregunta1",
  respuesta1Key: "proyecto_about.transportes_respuesta1",
  pregunta2Key: "proyecto_about.transportes_pregunta2",
  respuesta2Key: "proyecto_about.transportes_respuesta2",
  pregunta3Key: "proyecto_about.transportes_pregunta3",
  respuesta3Key: "proyecto_about.transportes_respuesta3",
  tecnologias: [
    {
      alt: 'HTML'
    },
    {
      alt: 'CSS'
    },
    {
      alt: 'Tailwind'
    },
    {
      alt: 'React'
    },
    {
      alt: 'Figma'
    },
    {
      alt: 'Photoshop'
    },
    {
      alt: 'GitHub'
    },
  ],
},
{
  id: 8,
  tipo: "proyecto",
  destacado: true,
  featured: true,
  behance: true,
  behanceLink: "https://www.behance.net/gallery/245173805/Wake-Up-Habit-Tracker-Design-Development",
  figma: false,
  figmaLink: "",
  sitio: true,
  sitioLink: "https://wakeuptracker.com/",
  titulo: "Wake Up Tracker",
  descripcionKey: "proyecto.wakeup_descripcion",
  objetivo1Key: "objetivos.wakeup_item1Texto",
  objetivo2Key: "objetivos.wakeup_item2Texto",
  objetivo3Key: "objetivos.wakeup_item3Texto",
  pregunta1Key: "proyecto_about.wakeup_pregunta1",
  respuesta1Key: "proyecto_about.wakeup_respuesta1",
  pregunta2Key: "proyecto_about.wakeup_pregunta2",
  respuesta2Key: "proyecto_about.wakeup_respuesta2",
  pregunta3Key: "proyecto_about.wakeup_pregunta3",
  respuesta3Key: "proyecto_about.wakeup_respuesta3",
  tecnologias: [
    {
      alt: 'Tailwind'
    },
    {
      alt: 'React'
    },
    {
      alt: 'GitHub'
    },
    {
      alt: 'Supabase'
    },
    {
      alt: 'Zustand'
    },
    {
      alt: 'TanStack Query'
    },
    {
      alt: 'Claude AI'
    },
    // TODO: sin íconos para Mercado Pago y Groq, se listan como texto
    {
      alt: 'Mercado Pago'
    },
    {
      alt: 'Groq'
    },
  ],
},
{
  id: 9,
  tipo: "trabajo",
  destacado: true,
  featured: true,
  behance: false,
  behanceLink: "",
  figma: false,
  figmaLink: "",
  sitio: true,
  sitioLink: "https://facutrainer.com",
  titulo: "Facu Trainer",
  descripcionKey: "proyecto.facutrainer_descripcion",
  // TODO: falta el logo de Facu Trainer (la card muestra el título hasta que exista)
  objetivo1Key: "objetivos.facutrainer_item1Texto",
  objetivo2Key: "objetivos.facutrainer_item2Texto",
  objetivo3Key: "objetivos.facutrainer_item3Texto",
  pregunta1Key: "proyecto_about.facutrainer_pregunta1",
  respuesta1Key: "proyecto_about.facutrainer_respuesta1",
  pregunta2Key: "proyecto_about.facutrainer_pregunta2",
  respuesta2Key: "proyecto_about.facutrainer_respuesta2",
  pregunta3Key: "proyecto_about.facutrainer_pregunta3",
  respuesta3Key: "proyecto_about.facutrainer_respuesta3",
  tecnologias: [
    {
      alt: 'React'
    },
    {
      alt: 'Supabase'
    },
    {
      alt: 'Zustand'
    },
    {
      alt: 'TanStack Query'
    },
    {
      alt: 'Tailwind'
    },
    // TODO: sin íconos para Vite y Netlify, se listan como texto
    {
      alt: 'Vite'
    },
    {
      alt: 'Netlify'
    },
  ],
  // TODO: agregar capturas de Facu Trainer (sin datos reales de clientes)
},
{
  id: 10,
  tipo: "proyecto",
  destacado: false,
  enDesarrollo: true,
  behance: false,
  behanceLink: "",
  figma: false,
  figmaLink: "",
  sitio: false,
  sitioLink: "",
  titulo: "MegaStrong",
  descripcionKey: "proyecto.megastrong_descripcion",
  // TODO: falta el logo de MegaStrong (la card muestra el título hasta que exista)
  objetivo1Key: "objetivos.megastrong_item1Texto",
  objetivo2Key: "objetivos.megastrong_item2Texto",
  objetivo3Key: "objetivos.megastrong_item3Texto",
  pregunta1Key: "proyecto_about.megastrong_pregunta1",
  respuesta1Key: "proyecto_about.megastrong_respuesta1",
  pregunta2Key: "proyecto_about.megastrong_pregunta2",
  respuesta2Key: "proyecto_about.megastrong_respuesta2",
  pregunta3Key: "proyecto_about.megastrong_pregunta3",
  respuesta3Key: "proyecto_about.megastrong_respuesta3",
  tecnologias: [
    {
      alt: 'Supabase'
    },
    // TODO: sin íconos para Next.js y TypeScript, se listan como texto
    {
      alt: 'Next.js'
    },
    {
      alt: 'TypeScript'
    },
  ],
  // TODO: agregar capturas de MegaStrong (solo con datos ficticios)
},
];
