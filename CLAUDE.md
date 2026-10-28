# Portfolio — Ivan Molina

Portfolio personal de un desarrollador front-end con base sólida de diseño. Este archivo define el stack, la dirección de diseño y las reglas de trabajo. Leelo completo antes de tocar cualquier cosa y respetalo en cada cambio.

## Stack y estructura

- React 19 + Vite, Sass (`src/styles/`), react-router-dom 7.
- Textos en dos idiomas: `src/locales/es.json` y `src/locales/en.json`. Todo texto visible nuevo va en AMBOS archivos, nunca hardcodeado en el JSX.
- Datos de proyectos en `src/utils/projectsData.js`.
- Home: `src/components/Home/`. Detalle de proyecto: `src/components/ProjectsExpand/`. Galería: `src/components/ProjectsGallery.jsx`.
- Fondo animado: `src/components/Background/` (shader WebGL propio, montado una sola vez en `App.jsx`).
- Despliegue en Netlify.

## Concepto

**Soledad elegante.** Un espacio inmenso, casi vacío, de noche, con muy poca luz y una sola presencia. Melancolía de salón Art Deco: la grandeza contrastada con el vacío. Transmite calidad, criterio y oficio. No transmite simpatía ni "amigabilidad".

Cómo se traduce en diseño:
- **Escala monumental:** las formas son más grandes que la pantalla. Poco contenido, mucho aire. El vacío es parte del diseño.
- **Una sola luz por sección:** la luz es escasa y concentrada. Nada de brillos repartidos.
- **Pocos gestos Art Deco, bien elegidos:** arcos, abanicos, columnas, bisel. Si hay demasiados el sitio parece una fiesta temática: ante la duda, quitar.
- **Rigidez:** formas robustas, ángulos rectos o biselados. Nada blando.

## Fondo (referencia aprobada)

El fondo es un fragment shader WebGL propio (sin Three.js, sin dependencias). La referencia exacta y aprobada es `reference/fondo-prototipo.html`: no cambiar el look sin pedirlo.

- Cinco composiciones, una por sección, todas dibujadas con líneas finas sobre negro: portal en arco (Inicio), abanico (Proyectos), columnata (Habilidades), eclipse (Sobre mí) y torre escalonada (Contacto). La galería usa el abanico y el detalle de proyecto usa el eclipse.
- Al cambiar de sección no hay desplazamiento ni zoom: las líneas de la escena que sale se apagan una por una y las de la nueva se encienden, pasando por casi negro.
- Las líneas respiran hacia afuera desde el contorno de cada forma y vibran en brillo, muy lento. Todo respeta `prefers-reduced-motion` (un solo frame estático).
- El grano está dentro del shader (`u_grain`). No agregar capas de grano en CSS.
- Los valores finales están en `src/components/Background/scenes.js`. No inventar colores nuevos: la paleta es verde y negro con un toque cálido ámbar en las luces (`warm`).

## Diseño de la interfaz

**Tipografía:** Lora (serif) para títulos, en mayúsculas en las secciones principales; Lato para texto corrido. Navegación y etiquetas pequeñas en mayúsculas con letter-spacing amplio (~0.12em).

**Formas:**
- `border-radius` de 0 a 2px. Nunca pills, círculos decorativos, burbujas ni sombras difusas.
- Esquinas biseladas con `clip-path` (corte diagonal ~8px) solo en el botón de Contacto y como máximo en un elemento más por sección.

**Bordes y superficies:**
- Líneas de 1px con blanco al 15–20 %, que se aclaran en hover.
- Nada de bordes blancos gruesos ni de cajas de color sólido como único recurso de jerarquía.
- La jerarquía sale de tamaño, peso, espaciado y líneas.

**Movimiento:**
- Lento y pesado, `cubic-bezier(0.22, 1, 0.36, 1)`, entre 500 y 900 ms.
- Sin rebotes, springs ni overshoot. Reveals con `clip-path` cuando se pueda.
- Toda animación respeta `prefers-reduced-motion`. Animar solo `transform` y `opacity` cuando se pueda.

**Botones:** rectangulares, borde fino, con un relleno que barre de izquierda a derecha en hover.

**Cards de proyecto:** la captura va primero (desaturada, a color en hover), luego número en serif ("01"), título en Lora, línea fina y una flecha que se alarga en hover.

**Skills:** sin cajitas. Grilla de líneas finas con el nombre de cada tecnología y un ícono SVG monocromo que se enciende en hover.

**Legibilidad:** texto de cuerpo >= 16px, peso 400–500, blanco al 90 % como mínimo. El contenido siempre queda por encima del fondo; si una banda de luz cae detrás de texto de cuerpo, se corrige con la capa de oscurecimiento (`SCRIM_OPACITY`) o moviendo la composición, no bajando el contraste.

## Reglas de contenido (importantes)

El contenido de este sitio debe ser verificable y honesto. No inventes nada.

- No inventes métricas, usuarios, clientes, tecnologías ni estados de proyecto.
- **Trabajos** = proyectos hechos para clientes reales. **Proyectos personales** = productos propios. No mezclarlos. Wake Up Tracker es un producto propio.
- MegaStrong está **en desarrollo**: no decir que está en producción ni que el gimnasio lo usa.
- No presentar TypeScript como dominio. MegaStrong es el primer proyecto del autor en TypeScript.
- No mostrar datos reales de clientes o socios en capturas de proyectos en desarrollo: solo datos ficticios.
- Si falta una imagen o un dato, dejá un `TODO` visible en el código y avisame. No uses imágenes ni textos de relleno inventados.

## Cómo trabajar

1. **Una sección o un cambio por vez.** No rediseñes varias cosas en la misma pasada.
2. Trabajá siempre en la rama `rediseno-portfolio`, nunca en `main`.
3. Antes de cambiar algo, leé los archivos involucrados. Mantené las convenciones existentes (Sass en `src/styles/`, textos en los JSON de `locales`).
4. No agregues dependencias nuevas sin avisar y justificar. Preferí CSS y JS nativo.
5. Cuidá el peso: imágenes en `.webp`, sin PNG pesados, sin precargar lo que no se usa.
6. Accesibilidad básica en todo cambio: foco visible, contraste suficiente, `alt` en imágenes, navegación por teclado.
7. Verificá responsive (mobile primero) en cada cambio.
8. Al terminar, corré `npm run build` y confirmá que compila sin errores.
9. Cerrá cada tarea listando: archivos modificados, decisiones que tomaste por tu cuenta y cualquier cosa que dejaste pendiente.
