# Portfolio — Ivan Molina

Portfolio personal de un desarrollador full stack con base sólida de diseño. Este archivo define el stack, el concepto, la dirección de diseño y las reglas de trabajo. Leelo completo antes de tocar cualquier cosa y respetalo en cada cambio.

## Referencias (fuente de verdad del diseño)

El diseño está **terminado y aprobado**. Vive en dos prototipos HTML dentro de `reference/`. No se rediseña: se porta.

- `reference/fondo-prototipo-dorado.html`: el sitio completo (5 secciones, HUD, fondo, **proyecto expandido**). Es un solo archivo con CSS y JS en línea. **El CSS es acumulativo: los bloques de abajo pisan a los de arriba**, así que el valor vigente de cualquier regla es el último. Los bloques están rotulados `/* --- vNN: ... --- */`; leelos de abajo hacia arriba. Los diccionarios `ICONS`, `SHOTS`, `PL` y `TLI` son imágenes embebidas en base64 solo para la maqueta: en el repo se usan los archivos reales.
- `reference/galeria-proyectos.html`: la página "Ver más" (`/galeriaProyectos`), con su propio shader compacto.
- `reference/parametros-finales.json`: valores finales de `DEFAULTS`, `SECTIONS` y `PAL` extraídos del prototipo.

**Qué NO portar del prototipo:** la barra de pruebas inferior (`.bar`), el panel "Ajustes" y todos sus sliders y botones, "Copiar parámetros", los botones de repetir transición, los modos de escena 1, 3, 4, 8 y 9, la opción de reflejo en Habilidades (`ampMirror`, descartada), las rayas fantasma del vacío (descartadas) y la casilla de color en hover (queda apagada). Los parámetros del panel pasan a ser **constantes** con los valores de `parametros-finales.json`.

## Stack y estructura

- React 19 + Vite, Sass (`src/styles/`), react-router-dom 7.
- Textos en dos idiomas: `src/locales/es.json` y `src/locales/en.json`. Todo texto visible nuevo va en AMBOS archivos, nunca hardcodeado en el JSX. Los textos finales de cada sección están en el prototipo: extraerlos a `es.json` y traducirlos a `en.json` (marcar las traducciones nuevas para que Ivan las revise).
- Datos de proyectos en `src/utils/projectsData.js`.
- Home: `src/components/Home/`. Detalle de proyecto: `src/components/ProjectsExpand/`. Galería: `src/components/ProjectsGallery.jsx`.
- Fondo animado: `src/components/Background/` (shader WebGL propio, montado **una sola vez** en `App.jsx`).
- Despliegue en Netlify.
- Rutas: `/` (Home con 5 secciones: `#hero`, `#proyectos`, `#habilidades`, `#about`, `#contacto`), `/galeriaProyectos`, `/proyecto/:id`.

## Concepto

**El sitio es un recorrido por un edificio, y las líneas son su plano.** Cada fondo es el lugar donde se responde una pregunta de quien evalúa el portfolio:

| Sección | Escena (modo) | Lugar y pregunta |
|---|---|---|
| Inicio | Portal en arco (0), paleta mixto | Umbral. ¿Quién sos? |
| Proyectos | Columnata (7), verde | Galería. ¿Qué hiciste? |
| Habilidades | Ánfora (2), verde | Taller. ¿Con qué lo hiciste? |
| Sobre mí | Abanico de esquina (6), verde | Sala interior. ¿Cómo sos? |
| Contacto | Portal invertido (5), mixto | Salida. Cierra el círculo con Inicio. |
| Proyecto expandido | **La misma columnata, golpeada desde la izquierda** | Una obra de la galería, de cerca. |
| Galería (Ver más) | Columnata sin piso, paleta mixto | La galería completa. |

Criterio para decidir qué agregar o sacar: si un elemento no ayuda a responder la pregunta de su sección, sobra.

Principios:
- **El fondo está presente pero no acapara.** Las líneas viven hacia un costado y se desvanecen hacia el contenido. Donde hay mucho texto (secciones de abajo del proyecto expandido, galería) el fondo se apaga.
- **El vacío es parte del diseño.** Poco contenido, mucho aire. Ante la duda, más espacio.
- **Seriedad antes que efecto.** Movimiento lento y suave. Nada brusco, robotizado o sobreactuado. Los resortes son críticamente amortiguados (sin rebote).

## Color

- Base: negro verdoso `#010403`. Verde de interfaz `#0a6b36`. Texto `#f2f5f3`.
- **Oro `#d6a73c`:** solo en los umbrales (Inicio y Contacto, paleta mixto), en la galería (paleta mixto) y como detalle mínimo de interacción: subrayado del ítem activo del HUD, borde de botones en hover, rombo activo de la navegación lateral, barra de 3px de las cards en hover, rombito y texto de "Destacado", luz que recorre el borde del formulario y del marco del proyecto expandido, línea que se dibuja en hover. Dentro del edificio, el resto es verde.
- Paletas (RGB 0–1, `[c0 fondo, c1 cuerpo, c2 resalte, c3 núcleo]`) en `parametros-finales.json`: `verde`, `mixto` (cuerpo verde, resalte dorado) y `oro`. El proyecto expandido permite elegir entre las tres; **por defecto `verde`** (constante `DETAIL_PALETTE`, fácil de cambiar; Ivan lo decide al ver el resultado).
- Evitar: plateado, azul y cualquier mezcla de azul con amarillo.

## Fondo (motor)

Fragment shader WebGL propio, sin Three.js ni dependencias. **La referencia exacta es el prototipo**: el GLSL (`<script type="x-shader/x-fragment" id="fs">`), `SECTIONS`, `PAL`, `DEFAULTS`, `pack()`, el bucle `frame()` y `measureCap()`. No cambiar el aspecto sin pedirlo.

- **Valores finales (constantes):** scale 0.76, density 0.72, fill -0.3, core 0.5, glow 0.22, grain 0.03, speed 1.57, mouse 0.12, dur 2.2, thick 0.5, breath 0.4, vib 1, ampThick 1, midFade 1, star 0.8, ampFill 0.5, colReach 3.1, colPx -231, colPitch 480, capAn 0.59, capPad 100, capPush 0.55, capReach 0.2, capInner 0.15.
- **Columnata anclada en píxeles CSS al contenedor** (no a la altura de la ventana): columnas de 480px, columna iluminada centrada, ningún borde de columna cerca del borde de una card (verificado a ≥ 40px con contenedor de 1200). No volver a anclarla a unidades de pantalla.
- **Transición entre secciones:** sin desplazamiento ni zoom; las líneas de la escena que sale se apagan una por una (apagado escalonado por id de línea) y las de la nueva se encienden; fundido gradual de paleta; duración 2.2s; el contenido de la sección cambia al 42% de la transición (clase `leaving` antes, entrada animada después). Si el usuario cambia de sección durante una transición, se encola y salta a la última.
- **Proyecto expandido = golpe sobre la columnata (no es otra escena).** Un uniform `hit` (0→1) anima un vacío redondeado ("cápsula") que entra desde la izquierda y empuja las rayas: desplaza cada raya `push·exp(-d/reach)`, comprime el espaciado delante de la nariz, engrosa las rayas hasta el grosor del hero y de Contacto, apaga el piso espejado y deja un resplandor interior suave (`capInner`). **No hay disolución:** son las mismas rayas deformándose.
  - Resorte críticamente amortiguado sobre `hit`: ω = 3.2 al entrar (~1.8s), **ω = 7 al salir** (~0.8s). Destello del impacto proporcional a la velocidad de entrada.
  - La cápsula **sigue al bloque de texto del hero** (`.dtxt`): cada frame se mide su rectángulo y se pasa `cy = top + h/2`, `r = h/2 + capPad`, nariz en `right + 80px`.
  - A medida que se baja del hero el fondo se apaga: lejos del vacío el brillo cae hasta 32% y, además, `calm = 1 - 0.28·p` con `p = clamp((scrollTop - 0.1·heroH) / (0.9·heroH))`.
- **Galería (`/galeriaProyectos`):** la columnata sin piso ni horizonte, `v` más suave (0.40–0.95), paleta `mixto`, intensidad 0.9 (×(1 − 0.3·p) con el scroll), seguimiento del mouse **0.06 con respuesta lenta** (tasa 1.1/s). Ver `galeria-proyectos.html`.
- El grano está dentro del shader. No agregar capas de grano en CSS. Líneas gruesas, no finitas; el grosor sale de un único valor global.
- Rendimiento: dpr máx. 2 (1 y 30 fps si `hardwareConcurrency <= 2`), pausar con la pestaña oculta, `prefers-reduced-motion` = un solo frame estático sin transiciones ni resorte (el estado final se aplica de golpe), fallback CSS `#010403` sin WebGL, manejar pérdida de contexto.

## Interfaz

**Tipografía:** Lora (serif) para títulos, navegación y numerales; Lato para texto corrido. Preferir autoalojar las fuentes si el proyecto ya lo hace; no sumar dependencias sin avisar.

**Formas:** esquinas de 0 a 4px. Nunca pills ni sombras difusas. Bordes de 1px. Ancho máximo del contenido: **1200px** (`min(1200px, 100% - 64px)`).

**Botones:** borde 1px, sin esquinas redondeadas. `.btn` transparente; `.btn.solid` verde `#0a6b36` (hover `#0d8a45`). Mayúsculas Lato 700, tracking .16em.

**HUD (fijo en todas las páginas):**
- Márgenes: 28px laterales, 22px arriba y abajo. Degradados suaves arriba (120px) y abajo (110px) de `rgba(1,4,3,.62)` a transparente para que el HUD se lea.
- **Header:** grilla `1fr auto 1fr`. Logo `Logo_white` a 42px de alto (el PNG de 50×54 se ve blando en pantallas de alta densidad: **pedir a Ivan un SVG o un PNG ≥ 150px**). Navegación Lora .96rem, mayúsculas, tracking .12em, separación 38px, blanco al 72%; hover y activo: blanco + subrayado dorado de 1px que se dibuja de izquierda a derecha (.6s). CTA "Contacto" con `.btn.solid`.
- **Rombos laterales:** cinco, 26×26 (`M13 1 25 13 13 25 1 13Z`), trazo 1px al 50%; el activo se rellena de dorado. Centrados verticalmente, a 28px del borde derecho.
- **Abajo a la izquierda:** LinkedIn, GitHub y Behance, cuadrados de 34px con borde 1px al 32% e íconos de 19px; hover: borde dorado y fondo `rgba(10,107,54,.35)`.
- **Abajo a la derecha:** ESP | ENG, Lora .88rem, mayúsculas, tracking .16em; activo blanco con subrayado dorado, inactivo al 50%.
- "Proyectos" queda activo también en `/galeriaProyectos` y `/proyecto/:id`.

**Cards de proyecto (pantalla Proyectos):** panel plano translúcido (blanco al 4,5 %), esquinas de 4px, sin borde; en hover, barra dorada de 3px. Contienen etiqueta, logo (gris) y botón "Expandir".

**Cards de la galería:** base oscura `rgba(1,4,3,.68)` + velo claro 2,8 % + `backdrop-filter: blur(10px)`; en hover velo 6 % y barra dorada. **Destacado:** tinte verde (degradado `rgba(10,107,54,.34)` → `.10`), etiqueta dorada con rombito delante, logo a pleno brillo, **sin borde ni línea superior** (se probaron y se descartaron). Destacadas: Facu Trainer y Wake Up (como en Proyectos). *Pendiente de decidir por Ivan:* llevar este tratamiento también a las cards de Proyectos.

**Evitar:** lo steampunk, el Art Deco literal, los bordes metálicos, el texto centrado con mucho espaciado, y cualquier cosa que quite protagonismo al contenido.

**Legibilidad:** texto de cuerpo ≥ 16px, peso 400–500, blanco al 90 % como mínimo (el texto secundario no baja de 55 %). El contenido siempre queda por encima del fondo y alineado a la izquierda.

## Páginas (resumen; el detalle exacto está en el prototipo)

- **Inicio:** línea de estado "● Abierto a ofertas · Montevideo, Uruguay"; frase "Convierto ideas en sitios y aplicaciones web: las diseño, las construyo y las publico."; línea de stack "REACT · NEXT.JS · SUPABASE" (**condición acordada: no publicar con Next.js en el hero hasta que MegaStrong esté publicado en el portfolio**); luz lejana dentro del portal (solo modo 0, `star` 0.8, se enciende gradualmente al final de la entrada). **No hay línea "Potenciado con IA"** (se eliminó a propósito).
- **Proyectos:** título grande, dos grupos con rótulo y línea dorada que se desvanece: "Trabajos" (Facu Trainer, Transportes UY, NBC Cargo) y "Proyectos personales" (Wake Up Tracker, Club Atlético Progreso); "Ver más" discreto a la derecha lleva a `/galeriaProyectos`; "Expandir" y la card llevan a `/proyecto/:id`. Cada pantalla ocupa 100vh.
- **Habilidades:** mosaicos de 106px, ícono gris al 72 % que sube a 100 % en hover más barra dorada; el nombre debajo (se parte en dos líneas si es largo: "WooCommerce", "TanStack Query"). Tres grupos: Frontend, Backend & Tools (con TanStack Query, 9 mosaicos), Diseño. Íconos desde los archivos del repo (versión gris), no desde librerías.
- **Sobre mí:** línea de tiempo (ITI 2019, BIOS 2022, ORT 2025, Udemy 2026) con imágenes en gris (`grayscale(1) brightness(.82)`, color solo si se activa la opción, que queda apagada); **ITI sin fondo blanco y con 15px de aire** dentro del recuadro; luz dorada que recorre la línea (5.5s); los rayos del fondo se desvanecen hacia el centro (`midFade` 1).
- **Contacto:** panel oscuro con borde 1px, radio 4; campos con solo línea inferior que se vuelve dorada al foco; título "Escribime"; botón `.btn.solid`; luz dorada que recorre el borde del formulario (conic-gradient + `@property --gs`, ciclo de 14s, **empieza a los 2.8s**); íconos de redes cuadrados; texto "Si tenés un proyecto, una oferta o una pregunta, escribime."; botón "Descargar CV PDF"; hora de Montevideo en vivo con rombo dorado. **Hoy el formulario es solo visual: hay que implementarlo (pendiente decidir el servicio de envío).**
- **Proyecto expandido (`/proyecto/:id`):** (1) fila superior: enlace "Proyectos" con línea dorada que se alarga en hover + etiqueta de tipo ("Trabajo para cliente" / "Proyecto personal" + "Destacado"); (2) hero en grilla 5fr/7fr con separación de 96px: nombre (Lora 500, `clamp(2.3rem,4.6vw,4.2rem)`), descripción (máx. 46ch), botones "Visitar sitio" (`.btn.solid`) y "Ver en Behance" (solo si existen); a la derecha el **marco de la obra** (doble borde, luz dorada que lo recorre, empieza a los 2.4s) con miniaturas y contador "01 / 03" si hay varias capturas, o logo + "Captura pendiente" si no hay; (3) **Objetivos** en 3 columnas con numeral 01/02/03 sobre línea fina con tramo dorado; (4) **Tecnologías** con los mismos mosaicos de Habilidades; (5) **Sobre el proyecto** en dos columnas 5fr/7fr: las 3 preguntas a la izquierda (la activa en blanco con numeral dorado y línea dorada) y la respuesta a la derecha con fundido, altura fija a la respuesta más larga (**no es acordeón**, se descartó); (6) cierre: nombre del siguiente proyecto en grande con su logo y línea dorada que se dibuja en hover, y debajo "Anterior" y "Ver todos los proyectos". Separación entre secciones 150px, velo radial oscuro muy suave detrás de cada sección, aparición al hacer scroll. La página scrollea con la cabecera del HUD fija; el contenedor del scroll aplica una máscara que funde el contenido en los bordes superior e inferior.
- **Galería:** título "Galería", subtítulo "Trabajos para clientes y proyectos propios.", pestañas "Todos (10)", "Trabajos (3)", "Proyectos personales (7)" y contador; grilla de 5 columnas (3 a ≤1100px, 2 a ≤720px) con los 10 proyectos: Facu Trainer, Transportes UY, NBC Cargo, Wake Up Tracker, Club Atlético Progreso, Sandbox, Havanna, CulPadel, WorldGym y MegaStrong ("En desarrollo", sin logo, iniciales "MS"). Cada card muestra además el nombre en letra chica. Al filtrar, las cards salen y entran escalonadas.

## Animaciones de entrada (consistentes en todo el sitio)

Curvas suaves `cubic-bezier(.4,0,.2,1)` y `(.45,0,.25,1)` (nada tipo ease-out-expo, se sentía como latigazo). Título: revelado de izquierda a derecha con `clip-path`, 1.68s. Textos y botones: subida de 18px con fundido, 0.8s, escalonados. Líneas: se dibujan con `scaleX`. Cards: subida de 26px, 0.92s, escalonadas de a 0.07s. Con `prefers-reduced-motion`: todo sin animación.

## Assets

- Script único `scripts/normalize_assets.py` (Pillow): normaliza íconos de herramientas (gris y color, 128×128), logos de proyectos, imágenes de la línea de tiempo (ITI sin fondo blanco), capturas (1000px) e íconos de redes a `src/assets/img/_norm/` en `.webp`. Los originales pesan ~1.8 MB y varios son enormes (4096×4096); los normalizados ~370 KB. Usar los normalizados y borrar los originales que dejen de usarse (confirmar antes).
- Logos de proyecto disponibles: Transportes UY, NBC Cargo, Wake Up, Club Atlético Progreso, Sandbox, Havanna, CulPadel, WorldGym. **Faltan: Facu Trainer y MegaStrong** (se muestran como iniciales "FT" / "MS"; dejar `TODO`).
- Capturas disponibles solo para NBC Cargo y Progreso (3 cada una). Facu Trainer, Transportes UY, Wake Up y el resto muestran el logo con "Captura pendiente". No inventar imágenes.
- El ícono de GitHub de `Icons/White` mide solo 34px; pedir una versión mayor o SVG.

## Reglas de contenido (importantes)

El contenido de este sitio debe ser verificable y honesto. No inventes nada.

- No inventes métricas, usuarios, clientes, tecnologías ni estados de proyecto. Wake Up Tracker: "usuarios registrados" (no "activos"). Transportes UY: "empresa de alquiler de volquetas, grúas y contenedores en Uruguay" (no "la más grande").
- **Trabajos** = proyectos para clientes reales. **Proyectos personales** = productos propios. Wake Up Tracker es un producto propio.
- MegaStrong está **en desarrollo**: no decir que está en producción ni que el gimnasio lo usa. Solo datos ficticios en sus capturas.
- No presentar TypeScript como dominio. MegaStrong es el primer proyecto del autor en TypeScript.
- Los textos de Facu Trainer del prototipo son **provisorios** (escritos a partir de datos del autor): los vigentes son los de `es.json`.
- Si falta una imagen, un logo o un dato, dejá un `TODO` visible en el código y avisá.

## Cómo trabajar

1. **Una sección o un cambio por vez.** No rediseñes varias cosas en la misma pasada. Usar modo plan y aprobar las ediciones a mano.
2. Trabajá siempre en la rama `rediseno-portfolio`, nunca en `main`.
3. Antes de cambiar algo, leé los archivos involucrados y la parte correspondiente del prototipo. Mantené las convenciones existentes.
4. No agregues dependencias nuevas sin avisar y justificar. Preferí CSS y JS nativo.
5. Cuidá el peso: imágenes en `.webp`, sin precargar lo que no se usa.
6. Accesibilidad básica: foco visible, contraste, `alt`, teclado, `prefers-reduced-motion`.
7. Verificá responsive (mobile primero) en cada cambio. El prototipo se diseñó en escritorio: la adaptación a mobile hay que proponerla respetando el concepto (preguntar ante la duda).
8. Al terminar, corré `npm run build` y confirmá que compila sin errores.
9. Cerrá cada tarea listando: archivos modificados, decisiones que tomaste por tu cuenta y cualquier cosa que dejaste pendiente.

## Pendientes de Ivan (no los resuelvas por tu cuenta)

SVG o PNG grande del logo "im" y del ícono de GitHub; logos de Facu Trainer y MegaStrong; archivo real del CV; servicio de envío del formulario; paleta final del detalle (verde / mixto / dorado); si el tratamiento de "Destacado" pasa también a las cards de Proyectos; capturas faltantes; traducciones al inglés; permiso del dueño de MegaStrong y de Facu para mostrar sus proyectos.
