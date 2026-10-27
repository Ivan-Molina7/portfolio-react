# Portfolio — Ivan Molina

Portfolio personal de un desarrollador front-end con base sólida de diseño. Este archivo define el stack, la dirección de diseño y las reglas de trabajo. Leelo completo antes de tocar cualquier cosa y respetalo en cada cambio.

## Stack y estructura

- React 19 + Vite, Sass (`src/styles/`), react-router-dom 7.
- Textos en dos idiomas: `src/locales/es.json` y `src/locales/en.json`. Todo texto visible nuevo va en AMBOS archivos, nunca hardcodeado en el JSX.
- Datos de proyectos en `src/utils/projectsData.js`.
- Home: `src/components/Home/`. Detalle de proyecto: `src/components/ProjectsExpand/`. Galería: `src/components/ProjectsGallery.jsx`.
- Despliegue en Netlify.

## Dirección de diseño

**Sensación:** elegante, minimalista, con misterio, robusto y rígido. Transmite calidad, criterio y oficio. No transmite simpatía ni "amigabilidad".

**Paleta:** negro y verde oscuro, con gradientes y grano (el grano se mantiene por encima de todo). El verde brillante es un acento y se usa con muchísima moderación.

**Tipografía:** Lora (serif) para títulos, en mayúsculas en las secciones principales. Lato para texto corrido.

**Formas:**
- `border-radius` entre 0 y 4px como máximo.
- Nunca pills, círculos decorativos, burbujas ni sombras difusas.
- Nada que se vea blando, flotante o "friendly". Ángulos rectos y presencia sólida.

**Bordes y superficies:**
- Líneas finas de 1px con baja opacidad (blanco 15–20%) que se aclaran en hover.
- Evitar bordes blancos gruesos y cajas de color sólido como único recurso de jerarquía.
- La jerarquía se logra con tamaño, peso, espaciado y líneas, no con rellenos.

**Espaciado:** generoso, con mucho aire. Menos elementos, mejor ubicados.

**Movimiento:**
- Lento y pesado: `cubic-bezier(0.22, 1, 0.36, 1)`, entre 500 y 900 ms.
- Sin rebotes, springs ni overshoot.
- Reveals con `clip-path` (cortan, no desvanecen) cuando sea posible.
- Toda animación debe respetar `prefers-reduced-motion`.
- Animar solo `transform` y `opacity` siempre que se pueda.

**Botones:** rectangulares, borde fino, con un relleno que barre de izquierda a derecha en hover.

**Cards de proyecto:** la captura del sitio va primero (desaturada, a color en hover), con número en serif ("01"), título en Lora, línea fina y una flecha que se alarga en hover.

**Skills:** sin cajitas. Grilla de líneas finas con el nombre de cada tecnología. Ícono monocromo (SVG inline) que se enciende en hover.

**Fondo:** casi negro, con luces verdes que respiran muy despacio. Fallback estático en CSS para `prefers-reduced-motion` y dispositivos de bajo rendimiento.

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
4. No agregues dependencias nuevas sin avisar y justificarlo. Preferí CSS y JS nativo. Para el fondo animado usá un shader WebGL propio, **no Three.js**.
5. Cuidá el peso: imágenes en `.webp`, sin PNG pesados, sin precargar lo que no se usa.
6. Accesibilidad básica en todo cambio: foco visible, contraste suficiente, `alt` en imágenes, navegación por teclado.
7. Verificá responsive (mobile primero) en cada cambio.
8. Al terminar, corré `npm run build` y confirmá que compila sin errores.
9. Cerrá cada tarea listando: archivos modificados, decisiones que tomaste por tu cuenta y cualquier cosa que dejaste pendiente.
