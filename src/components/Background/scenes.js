// Escenas, paletas y parámetros finales del fondo (reference/parametros-finales.json).
// Todo congelado: los parámetros del panel de Ajustes del prototipo pasan a ser constantes.

const deepFreeze = (o) => {
  Object.values(o).forEach((v) => {
    if (v && typeof v === "object") deepFreeze(v);
  });
  return Object.freeze(o);
};

// Abanico de Sobre mí (modo 6) en mobile: algo más grande (midFade queda en el valor por defecto: subirlo apaga el abanico casi por completo). Escritorio no cambia.
export const MOBILE_MAX = 560;
export const FAN_MOBILE_RADIUS = 2.25;
export const FAN_MOBILE_GAIN = 1.5; // brillo general mientras se muestra Sobre mí (escena 3) en mobile

export const DEFAULTS = deepFreeze({
  scale: 0.76,
  density: 0.72,
  fill: -0.3,
  core: 0.5,
  glow: 0.22,
  grain: 0.03,
  speed: 1.57,
  mouse: 0.12,
  dur: 2.2,
  thick: 0.5,
  breath: 0.4,
  vib: 1,
  ampThick: 1,
  midFade: 1,
  star: 0.8,
  ampFill: 0.5,
  colReach: 3.1,
  colPx: -231,
  colPitch: 480,
  capAn: 0.59,
  capPad: 100,
  capPush: 0.55,
  capReach: 0.2,
  capInner: 0.15,
});

// modo 0 portal en arco | 2 ánfora | 5 portal invertido | 6 abanico de esquina | 7 columnata
export const SECTIONS = deepFreeze([
  { name: "Inicio", pal: "mixto", modo: 0, p0: [0.66, -0.62, 0.42, 0.9], p1: [60, 0.18, 0.3, 0.45] },
  { name: "Proyectos", pal: "verde", modo: 7, p0: [-1.34, -1, 0, 0.55], p1: [16, 2, 0.18, 0.45] },
  { name: "Habilidades", pal: "mixto", modo: 2, p0: [0.78, 0, 0.26, 0.85], p1: [34, 0.1, 3.2, 0.4] },
  { name: "Sobre mí", pal: "oro", modo: 6, p0: [-0.04, -0.04, 1.7, 0], p1: [20, 0.65, 0.55, 0.4] },
  { name: "Contacto", pal: "mixto", modo: 5, p0: [0.66, -0.62, 0.42, 0.9], p1: [60, 0.18, 0.3, 0.45] },
]);

// [c0 fondo, c1 cuerpo, c2 resalte, c3 núcleo], RGB 0-1
export const PAL = deepFreeze({
  oro: [[0.012, 0.008, 0.003], [0.34, 0.21, 0.04], [0.9, 0.66, 0.22], [1, 0.92, 0.68]],
  mixto: [[0.004, 0.018, 0.014], [0.03, 0.24, 0.15], [0.88, 0.64, 0.22], [1, 0.92, 0.68]],
  verde: [[0.004, 0.018, 0.014], [0.02, 0.27, 0.17], [0.23, 0.82, 0.52], [0.82, 0.98, 0.8]],
});

// Paleta del proyecto expandido: 'verde' | 'mixto' | 'oro' (la decide Ivan al ver el resultado)
export const DETAIL_PALETTE = "verde";
export const GALLERY_PALETTE = "mixto";
export const GALLERY_SCENE = 1;

export const HIT_OMEGA_IN = 3.2;
export const HIT_OMEGA_OUT = 5;
// Resorte del golpe con paso fijo: avanza el tiempo REAL transcurrido en subpasos de HIT_STEP, así la
// duración no depende de los fps. HIT_MAX_CATCHUP acota lo que se recupera en un solo cuadro (pestaña oculta).
export const HIT_STEP = 1 / 120;
export const HIT_MAX_CATCHUP = 0.5;

// Tiempo de cuadro acotado. Los suavizados (1 - exp(-dt·tasa)) y el avance lineal de la transición son exactos con
// cualquier dt real, así que usan DT_MAX (solo protege de un cuelgue enorme): la transición de 2.2s dura 2.2s también
// a ~10 fps. El reloj de las líneas (time, phase, osc) usa CLOCK_DT_MAX para que no haya saltos visibles tras un cuelgue.
export const DT_MAX = 0.25;
export const CLOCK_DT_MAX = 0.05;
export const CAP_NOSE_OFFSET = 80; // px a la derecha del bloque de texto
export const CALM_DETAIL_SCROLL = 0.28; // calm = 1 - 0.28·p

export const GALLERY = deepFreeze({
  intensity: 0.9,
  scrollDrop: 0.3,
  scrollRef: 420, // px de scroll para p = 1
  mouse: 0.06,
  mouseRate: 1.1, // 1/s
});
export const HOME_MOUSE_RATE = 1.5; // 1/s

// Geometría de cada escena. Escribe en out0/out1 (Float32Array(4)).
// cssRatio = canvas.width / window.innerWidth (px de dispositivo por px CSS)
export function pack(idx, out0, out1, canvasW, canvasH, cssW) {
  const S = SECTIONS[idx];
  const s = DEFAULTS.scale;
  const d = DEFAULTS.density;
  let p0 = S.p0.slice();
  const p1 = S.p1.slice();
  if (S.modo === 0 || S.modo === 5) {
    p0 = [p0[0] * s, p0[1] * s, p0[2] * s, p0[3] * s];
    p1[0] = p1[0] * d * s;
    p1[2] = p1[2] * s;
  }
  if (S.modo === 2) {
    p0 = [p0[0] * s, p0[1] * s, p0[2] * s, p0[3] * s];
    p1[0] = p1[0] * d * s;
    p1[2] = p1[2] / s;
  }
  if (S.modo === 7) {
    // columnata anclada en px CSS al contenedor, no a la altura de la ventana
    const kcss = canvasW / cssW / canvasH;
    const pitch = DEFAULTS.colPitch;
    p0 = [(DEFAULTS.colPx - 2 * pitch) * kcss, p0[1], p0[2], pitch * kcss];
    p1[0] = (p1[0] * d) / 0.72 * (pitch / 381);
  }
  if (S.modo === 6) {
    p0 = [p0[0], p0[1], p0[2] * s * (cssW <= MOBILE_MAX ? FAN_MOBILE_RADIUS : 1), p0[3]];
    p1[0] = p1[0] * d;
  }
  p1[3] = p1[3] + DEFAULTS.fill;
  out0.set(p0);
  out1.set(p1);
}
