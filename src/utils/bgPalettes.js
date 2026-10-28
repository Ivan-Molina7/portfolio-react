// Configuración del fondo animado de la Home (ShaderBackground.jsx).
// El fondo son curvas de nivel de un campo escalar suave (suma de 3 gaussianas + deformación
// de senos). Cada sección define:
//  - colores: base (casi negro con matiz verde), line (verde profundo de las líneas),
//    light (verde menta, solo en la zona de mayor luz; nunca blanco).
//  - g: 3 gaussianas [x, y, radio, amplitud]. x e y en 0–1 del viewport (y hacia arriba).
//  - rot: rotación del campo (rad). lines: densidad N de curvas. curve: cuánto se doblan.
//  - mask: [x, y, radio] de la zona con luz; fuera de ella las líneas se apagan en el negro.
//  - band: [posición en f, semiancho] de una banda fina de borde definido.
// Todo se interpola en JS al cambiar de sección, así que las curvas se transforman.

export const bgPalettes = {
  hero: {
    base: "#010503",
    line: "#0a5436",
    light: "#5fd6a4",
    g: [
      [0.78, 0.7, 0.34, 1.0],
      [0.3, 0.2, 0.3, 0.7],
      [0.95, 0.15, 0.4, 0.5],
    ],
    rot: 0.0,
    lines: 4.0,
    curve: 0.1,
    mask: [0.8, 0.65, 0.4],
    band: [0.62, 0.02],
  },
  proyectos: {
    base: "#010604",
    line: "#0b5c3a",
    light: "#5ad2a0",
    g: [
      [0.12, 0.4, 0.28, 1.0],
      [0.55, 0.9, 0.36, 0.8],
      [0.7, 0.1, 0.22, 0.6],
    ],
    rot: 0.6,
    lines: 6.0,
    curve: 0.22,
    mask: [0.15, 0.45, 0.36],
    band: [0.35, 0.018],
  },
  habilidades: {
    base: "#010503",
    line: "#0a5033",
    light: "#66dcab",
    g: [
      [0.5, 0.5, 0.18, 1.1],
      [0.9, 0.85, 0.4, 0.7],
      [0.1, 0.1, 0.32, 0.6],
    ],
    rot: -0.9,
    lines: 7.0,
    curve: 0.05,
    mask: [0.62, 0.5, 0.32],
    band: [0.8, 0.025],
  },
  about: {
    base: "#010604",
    line: "#0c5e3c",
    light: "#58d0a0",
    g: [
      [0.5, 0.12, 0.42, 1.0],
      [0.1, 0.75, 0.26, 0.8],
      [0.92, 0.6, 0.3, 0.5],
    ],
    rot: 1.4,
    lines: 3.5,
    curve: 0.3,
    mask: [0.5, 0.15, 0.42],
    band: [0.5, 0.02],
  },
  contacto: {
    base: "#010503",
    line: "#095238",
    light: "#62d8a8",
    g: [
      [0.2, 0.3, 0.34, 1.0],
      [0.85, 0.7, 0.24, 0.9],
      [0.5, 1.0, 0.3, 0.5],
    ],
    rot: -0.3,
    lines: 5.0,
    curve: 0.16,
    mask: [0.2, 0.35, 0.38],
    band: [0.7, 0.016],
  },
};

export const defaultSection = "hero";

// Orden de las secciones en la página (coincide con los id del DOM)
export const sectionOrder = Object.keys(bgPalettes);

function hexToRgb(hex) {
  const n = parseInt(hex.slice(1), 16);
  return [(n >> 16) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255];
}

// Vector plano de 29 floats que se interpola en el shader:
// [base rgb, line rgb, light rgb, 3 × (x, y, radio, amplitud), rot, lines, curve,
//  mask x, y, radio, band pos, band ancho]
export function paletteToVector(p) {
  return [
    ...hexToRgb(p.base),
    ...hexToRgb(p.line),
    ...hexToRgb(p.light),
    ...p.g.flat(),
    p.rot,
    p.lines,
    p.curve,
    ...p.mask,
    ...p.band,
  ];
}
