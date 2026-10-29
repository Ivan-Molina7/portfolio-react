# Cómo pasarle el diseño a Claude Code

## Antes de empezar (lo hacés vos, una sola vez)

1. En el repo, en la rama `rediseno-portfolio`, copiá:
   - `CLAUDE.md` a la raíz (reemplaza al actual).
   - La carpeta `reference/` completa a la raíz del repo (`fondo-prototipo-dorado.html`, `galeria-proyectos.html`, `parametros-finales.json`).
   - `scripts/normalize_assets.py` a `scripts/`.
2. Hacé un commit: `docs: referencia del rediseño`.
3. Abrí Claude Code en el repo.

## Cómo usar cada ronda

- Una ronda = una sesión. Antes de pegar cada prompt: `/clear`, después `Shift+Tab` hasta **plan mode**, y trabajá con **manually approve edits**.
- Pegá el prompt de la ronda, leé el plan que propone y, si coincide con lo que pedí, aprobalo.
- Al final de cada ronda: `npm run build`, mirar el resultado en el navegador y **comparar contra el prototipo abierto al lado**. Recién ahí commit y siguiente ronda.
- Orden recomendado: 0 → A → B → C → D → E → F → G. No saltear A y B: todo lo demás depende de ellas.
- Si algo no coincide con el prototipo, no pidas "arreglalo": pedí "compará esta regla con el último bloque CSS del prototipo y alineala".

---

## Ronda 0 — Assets

```
Leé CLAUDE.md completo. Tarea: preparar los assets del rediseño. No toques componentes todavía.

1. Revisá que Python 3 y Pillow estén disponibles (pip install pillow solo si hace falta, y avisame: es una herramienta de un solo uso, no una dependencia del sitio).
2. Corré: python scripts/normalize_assets.py --src src/assets/img --out src/assets/img/_norm
3. Mostrame el resumen que imprime (peso total y lista de archivos que NO encontró). No inventes los que falten.
4. Revisá visualmente 3 resultados al azar (un ícono, un logo y la imagen de ITI): ITI debe quedar sin fondo blanco.
5. Armá un archivo src/utils/assets.js que exporte, con imports estáticos de _norm: ICONS (clave -> {gray, color}), LOGOS, ABOUT, SHOTS (nbc y gap, 3 cada una) y SOCIAL (github, behance, linkedin). Claves exactas del script.
6. NO borres los originales todavía. Listame cuáles dejarían de usarse cuando termine el rediseño, con su peso.

Cerrá con: archivos creados, qué faltó, y qué tengo que conseguir yo (SVG del logo "im", logos de Facu Trainer y MegaStrong).
```

## Ronda A — Motor del fondo

```
Leé CLAUDE.md completo (sección "Fondo (motor)"). La referencia exacta es reference/fondo-prototipo-dorado.html y reference/parametros-finales.json. Tarea: portar el fondo animado, SIN cambiar su aspecto. Nada de layout ni páginas todavía.

Crear src/components/Background/ con:
- shader.frag.js: el GLSL del prototipo (script id="fs") exportado como string. Portar SOLO los modos 0, 2, 5, 6 y 7. El modo 7 incluye el "golpe" del detalle (uniforms u_hit, u_cap, u_push, u_inner, u_calm). NO portar los modos 1, 3, 4, 8 ni 9, ni ampMirror/u_ampMirror, ni las rayas fantasma. Agregar un uniform u_floor (0/1): con 0 el modo 7 no dibuja piso espejado ni horizonte y usa v = mix(0.40, 0.95, ...) (es la variante de la galería).
- scenes.js: SECTIONS (5 escenas), PAL y los valores de DEFAULTS como constantes congeladas, tomados de parametros-finales.json. Más la función pack() del prototipo (incluida la columnata anclada en px CSS: colPx, colPitch).
- Background.jsx + BackgroundContext: un único <canvas> fijo montado una vez en App.jsx. El contexto expone: setScene(i), setDetail(bool), setVariant('home' | 'galeria'), registerCapsule(el), y un ref de "calm" para el scroll.
- El bucle de dibujo (frame) del prototipo: transición de 2.2s con apagado escalonado por línea, fundido de paleta, cola que salta a la última sección, resorte críticamente amortiguado sobre hit (ω 3.2 al entrar, ω 7 al salir), destello = velocidad de entrada, y measureCap() midiendo el rectángulo del elemento registrado (cy = top + h/2, r = h/2 + capPad, nariz en right + 80px).

Comportamiento:
- Home: IntersectionObserver sobre #hero, #proyectos, #habilidades, #about, #contacto -> escena 0..4.
- /galeriaProyectos: escena 1 con u_floor = 0, paleta mixto, intensidad 0.9 (x(1 - 0.3·p) con el scroll), mouse 0.06 con seguimiento lento (tasa 1.1/s). Mirar reference/galeria-proyectos.html: su shader compacto es la referencia de esa variante.
- /proyecto/:id: escena 1 + detalle (hit objetivo 1). Al salir del detalle hit objetivo 0.
- Rendimiento y accesibilidad: dpr máx. 2 (1 y 30 fps si hardwareConcurrency <= 2), pausar con la pestaña oculta, prefers-reduced-motion = un solo frame estático y estado final aplicado de golpe, fallback CSS #010403 sin WebGL, manejar webglcontextlost/restored.
- Opcional, solo en import.meta.env.DEV: ruta /__bg con un selector de escena y un checkbox de detalle, para comparar contra el prototipo.

Verificación: comparame, escena por escena, el resultado contra el prototipo (mismas líneas, mismos colores, misma transición). Si algo no coincide, decime qué y por qué antes de "corregirlo" a ojo.
Cerrá con: archivos, decisiones tuyas y pendientes.
```

## Ronda B — Layout y HUD

```
Leé CLAUDE.md completo (secciones "Interfaz" y "Páginas"). Referencia: reference/fondo-prototipo-dorado.html (leé los bloques CSS rotulados v11, v15 y el último que toque .hdr, .hudl, .hudr y .dots: el valor vigente es el último). Tarea: layout global y HUD. Sin contenido de secciones todavía.

Crear los componentes (cada uno con su Sass) y montarlos en el layout compartido de todas las rutas:
- Header: logo (<img>, 42px de alto, link a #hero), navegación Lora con ítem activo según sección/ruta, CTA "Contacto" (.btn.solid). Subrayado dorado de 1px que se dibuja en hover y queda en el activo.
- SideDots: 5 rombos 26x26 (path M13 1 25 13 13 25 1 13Z), el activo relleno de dorado, clic = ir a la sección.
- SocialsHud (abajo izquierda): LinkedIn, GitHub y Behance, cuadrados de 34px, íconos de 19px (usar SOCIAL de src/utils/assets.js), enlaces reales (preguntame las URLs si no están en el repo).
- LangSwitch (abajo derecha): ESP | ENG funcional con el i18n del proyecto.
- Degradados fijos arriba (120px) y abajo (110px).
- Variables Sass: --hud-x 28px, --hud-y 22px, ancho máximo 1200px (min(1200px, 100% - 64px)), colores y fuentes de CLAUDE.md.
- "Proyectos" queda activo en /galeriaProyectos y /proyecto/:id.
- Tamaños mobile: proponé una adaptación sensata (menú compacto, ocultar rombos) y preguntame antes de implementarla.

El logo es un PNG de 50x54: usalo así y dejá un TODO para reemplazarlo por SVG.
Verificación: lado a lado con el prototipo a 1440 y 1920 de ancho. Cerrá con archivos, decisiones y pendientes.
```

## Ronda C — Inicio y Proyectos

```
Leé CLAUDE.md completo. Referencia: reference/fondo-prototipo-dorado.html, secciones Inicio (#m0) y Proyectos (#m1) y sus animaciones de entrada (clases .page[data-s="0"] ... y keyframes revealX, riseIn, lineIn, cardIn; los tiempos finales ya están escalados). Tarea: SOLO Inicio y Proyectos.

- Inicio: contenido y tipografía del prototipo. Textos desde es.json/en.json (extraerlos del prototipo; no los inventes). Línea de estado, frase final y línea de stack: respetá la condición de CLAUDE.md sobre "NEXT.JS" (dejá la línea lista pero detrás de una constante SHOW_NEXT_IN_HERO = false y avisame).
- Proyectos: título, grupos "Trabajos" (Facu Trainer, Transportes UY, NBC Cargo) y "Proyectos personales" (Wake Up Tracker, Club Atlético Progreso), línea dorada que se desvanece, "Ver más" a /galeriaProyectos. Cards según CLAUDE.md, con los logos de src/utils/assets.js (Facu Trainer: iniciales "FT", con TODO).
- Entrada animada sincronizada con la transición del fondo (el contenido anterior sale con la clase leaving hasta el 42% de la transición; después corren los keyframes escalonados).
- Cada pantalla ocupa 100vh. Solo texto desde los JSON de locales.

No toques Habilidades, Sobre mí ni Contacto. Verificación: lado a lado con el prototipo. Cerrá con archivos, decisiones y pendientes.
```

## Ronda D — Habilidades, Sobre mí y Contacto

```
Leé CLAUDE.md completo. Referencia: reference/fondo-prototipo-dorado.html, secciones #m2, #m3 y #m4. Tarea: Habilidades, Sobre mí y Contacto, una por vez y en ese orden (hacé commit lógico por sección).

- Habilidades: mosaicos de 106px con íconos grises desde ICONS (gray), hover = ícono al 100% + barra dorada. La versión en color existe pero queda desactivada (no implementar la casilla). Nombres que se parten en dos líneas. Grupos Frontend / Backend & Tools (con TanStack Query) / Diseño y la frase del taller del prototipo. NO portar el reflejo inferior (descartado).
- Sobre mí: línea de tiempo con las 4 imágenes (ABOUT) en gris con hover; ITI usa la versión sin fondo y 15px de aire; luz dorada que recorre la línea (5.5s); contenido y textos del prototipo.
- Contacto: formulario con el diseño del prototipo (panel oscuro, líneas inferiores doradas al foco, luz dorada en el borde con @property --gs, ciclo de 14s, empieza a los 2.8s), íconos de redes, hora de Montevideo en vivo, botón de CV. El formulario HOY es solo visual: dejalo preparado para enviar (estados cargando/éxito/error, validación, honeypot anti-spam) pero NO elijas un servicio: preguntame cuál usar. El CV: dejá un TODO con la ruta del archivo.
- Con prefers-reduced-motion: todo sin animación.

Verificación: lado a lado con el prototipo, sección por sección. Cerrá con archivos, decisiones y pendientes.
```

## Ronda E — Proyecto expandido

```
Leé CLAUDE.md completo (sección "Proyecto expandido" y "Fondo (motor)"). Referencia: reference/fondo-prototipo-dorado.html: bloques CSS v16, v17, v20 (el último que toque cada regla es el vigente) y las funciones renderDetail(), openDetail(), closeDetail(), measureCap() y el bloque del modo 7 con u_hit. Tarea: la página /proyecto/:id.

- Datos: tecnologías, links y capturas desde projectsData.js y assets.js (SHOTS: solo nbc y gap tienen capturas; el resto muestra logo + "Captura pendiente"). Textos largos desde es.json/en.json (proyecto.<clave>_descripcion, objetivos.<clave>_item{1,2,3}Texto, proyecto_about.<clave>_pregunta{n}/_respuesta{n}). NO copies los textos del prototipo: los de Facu Trainer son provisorios.
- Estructura exacta de CLAUDE.md: fila superior, hero 5fr/7fr con separación de 96px, marco de la obra con luz dorada (empieza a los 2.4s) y miniaturas, Objetivos en 3 columnas, Tecnologías con los mismos mosaicos, "Sobre el proyecto" en dos columnas (NO acordeón), cierre con siguiente / anterior / ver todos. Separación entre secciones 150px, velo radial detrás de cada sección, aparición al hacer scroll (IntersectionObserver).
- Fondo: registrá el bloque de texto del hero (.dtxt) con registerCapsule(el). La cápsula debe seguirlo al hacer scroll. El fondo se apaga al bajar (calm) según CLAUDE.md.
- Navegación: "Proyectos", "Ver todos" y el botón atrás del navegador vuelven a la galería de la home; anterior/siguiente cambian de proyecto SIN tocar el fondo (solo cambia el contenido con un fundido de 420ms).
- Con prefers-reduced-motion: el estado final se aplica de golpe, sin resorte.

IMPORTANTE — error conocido que hay que evitar (ver Ronda G): al volver del detalle a la galería, la cápsula no puede quedar visible sobre la pantalla de Proyectos. Implementá desde el principio la regla de salida de CLAUDE.md (ω 7 y contenido de la galería recién después de ~650ms).

Verificación: lado a lado con el prototipo (abrí NBC Cargo y Club Atlético Progreso: tienen capturas) y probá volver 10 veces seguidas. Cerrá con archivos, decisiones y pendientes.
```

## Ronda F — Galería (Ver más)

```
Leé CLAUDE.md completo. Referencia: reference/galeria-proyectos.html (es el archivo entero de la página: HTML, CSS, JS y su shader). Tarea: la ruta /galeriaProyectos con el componente ProjectsGallery.

- Los 10 proyectos desde projectsData.js (Facu Trainer, Transportes UY, NBC Cargo, Wake Up Tracker, Club Atlético Progreso, Sandbox, Havanna, CulPadel, WorldGym, MegaStrong "En desarrollo"). Trabajos: los 3 primeros; el resto, proyectos personales. "Destacado" solo en Facu Trainer y Wake Up.
- Título, subtítulo, pestañas con contador y contador de resultados, grilla de 5 columnas (3 a <=1100px, 2 a <=720px), animación al filtrar (salir 230ms y entrar escalonado).
- Cards: base oscura 0.68 + velo 2,8% + blur 10px; destacado con tinte verde, etiqueta dorada con rombito, SIN borde ni línea superior. Logos desde LOGOS (MegaStrong y Facu Trainer: iniciales).
- El fondo NO se escribe de nuevo: usá la variante 'galeria' del motor de la Ronda A (u_floor 0, paleta mixto, intensidad 0.9, mouse 0.06 lento). Si encontrás diferencias con el shader del archivo de referencia, mostramelas.
- Click en una card: /proyecto/:id.

Verificación: lado a lado con el prototipo. Cerrá con archivos, decisiones y pendientes.
```

## Ronda G — Error: la cápsula queda visible al volver del proyecto

Usala si el error aparece en el sitio real, o como prueba obligatoria después de la Ronda E.

```
Error visual a corregir. Leé CLAUDE.md (sección "Fondo (motor)", "Proyecto expandido").

Síntoma: estoy en /proyecto/:id y vuelvo a la vista de Proyectos (botón "Proyectos", "Ver todos", rombo lateral o atrás del navegador). La forma de "bala" (la cápsula/vacío que entró por la izquierda) se queda unos segundos sobre la pantalla de Proyectos y recién después desaparece.

Causa conocida (ya la corregí en el prototipo): el resorte del uniform hit tardaba ~1.8s en volver a 0 (ω 3.2) mientras el contenido de la galería aparecía a los ~0.4s, así que la cápsula seguía a la vista con las cards ya montadas.

Corrección esperada (copiá la lógica del prototipo: buscá closeDetail() y el cálculo del resorte en frame()):
1. Al empezar la navegación detalle -> galería, hit objetivo = 0 de inmediato.
2. Para hit objetivo 0, usar ω = 7 (≈0.8s hasta 95%). Para entrar sigue ω = 3.2.
3. El contenido de la galería se monta/muestra recién ~650ms después de empezar la salida (el detalle hace fundido de salida durante ese tiempo), de modo que la cápsula ya esté prácticamente fuera de pantalla.
4. Si el usuario sale del detalle hacia OTRA sección (no Proyectos), hit se reinicia a 0 cuando termina la transición de escenas.
5. Detalle -> otro detalle (anterior/siguiente): hit NO cambia, solo el contenido.
6. Con prefers-reduced-motion: hit pasa a 0 de golpe.

Verificá: ida y vuelta 10 veces seguidas con cada método de salida, y con clics rápidos durante la animación (no debe quedar ningún residuo ni deformación de las rayas después de ~1s). Si no podés reproducirlo, explicá qué probaste. Cerrá con archivos, causa encontrada en NUESTRO código (puede ser distinta) y pendientes.
```

## Ronda H — Revisión final

```
Leé CLAUDE.md. Tarea: revisión final del rediseño completo, sin cambios de diseño.

1. Paridad es.json / en.json: claves faltantes o huérfanas.
2. Recorré cada ruta y sección a 1440, 1920 y 390 de ancho y listame lo que se rompe (no lo arregles todavía).
3. Accesibilidad: foco visible, alt, contraste de textos secundarios (>= 55% de blanco), teclado, prefers-reduced-motion.
4. Peso: tamaño del bundle y de las imágenes; qué originales sin uso se pueden borrar (listar con peso, esperar mi OK).
5. Lighthouse (rendimiento y accesibilidad) y el costo del shader en un equipo modesto (¿mantiene 60 fps? ¿cae a 30 con hardwareConcurrency <= 2?).
6. Confirmá que no queda código de la maqueta: .bar, panel de Ajustes, modos 1/3/4/8/9, ampMirror.
7. npm run build sin errores ni warnings nuevos.

Entregá un informe corto ordenado por gravedad.
```
