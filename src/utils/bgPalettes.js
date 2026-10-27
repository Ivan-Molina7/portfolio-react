// Configuración del fondo animado de la Home (ShaderBackground.jsx).
// Cada sección define:
//  - colores: base (oscuro), mid (medio), light (luz). Extraídos a ojo de los fondos anteriores.
//  - forma: scale (escala del ruido), warp (cantidad de domain warp),
//    light (posición de la luz principal, 0–1, y hacia arriba) y flow (dirección del flujo).
// Todo se interpola suavemente al cambiar de sección.

export const bgPalettes = {
  hero: {
    base: "#010403",
    mid: "#022c1a",
    light: "#05663a",
    scale: 1.4,
    warp: 0.8,
    light_pos: [0.88, 0.08],
    flow: [0.05, 0.02],
  },
  proyectos: {
    base: "#000805",
    mid: "#04331f",
    light: "#0a5a35",
    scale: 1.3,
    warp: 0.9,
    light_pos: [0.08, 0.5],
    flow: [0.04, -0.03],
  },
  habilidades: {
    base: "#00120d",
    mid: "#02432a",
    light: "#05683a",
    scale: 1.5,
    warp: 0.6,
    light_pos: [0.72, 0.5],
    flow: [0.0, 0.06],
  },
  about: {
    base: "#001611",
    mid: "#034a2c",
    light: "#067a45",
    scale: 1.2,
    warp: 1.0,
    light_pos: [0.5, 0.1],
    flow: [-0.04, 0.03],
  },
  contacto: {
    base: "#00140e",
    mid: "#04503a",
    light: "#07804a",
    scale: 1.1,
    warp: 1.0,
    light_pos: [0.15, 0.4],
    flow: [0.03, 0.04],
  },
};

export const defaultSection = "hero";

// Orden de las secciones en la página (coincide con los id del DOM)
export const sectionOrder = Object.keys(bgPalettes);

function hexToRgb(hex) {
  const n = parseInt(hex.slice(1), 16);
  return [(n >> 16) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255];
}

// Vector plano de 15 floats que se interpola en el shader:
// [base rgb, mid rgb, light rgb, scale, warp, lightX, lightY, flowX, flowY]
export function paletteToVector(p) {
  return [
    ...hexToRgb(p.base),
    ...hexToRgb(p.mid),
    ...hexToRgb(p.light),
    p.scale,
    p.warp,
    ...p.light_pos,
    ...p.flow,
  ];
}
