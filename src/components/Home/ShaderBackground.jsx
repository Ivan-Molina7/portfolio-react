import { useEffect, useRef, useState } from "react";
import {
  bgPalettes,
  defaultSection,
  sectionOrder,
  paletteToVector,
} from "../../utils/bgPalettes";

// ---- Constantes de ajuste (valores bajos a propósito: movimiento lento y pesado) ----
const RENDER_SCALE = 1; // escala del canvas respecto del viewport (líneas nítidas: resolución completa)
const MAX_DPR = 1.5; // devicePixelRatio máximo
const LOW_CORES = 2; // con <= N núcleos se usa el fondo estático
const SPEED_BASE = 1; // velocidad base del tiempo del ruido
const SCROLL_SPEED_GAIN = 1.5; // cuánto acelera el tiempo al scrollear
const SCROLL_REF_SPEED = 2500; // px/s que cuentan como scroll "a fondo"
const SCROLL_DECAY = 0.6; // qué tan rápido decae la energía del scroll (1/s)
const SCROLL_BLEND = 0.35; // cuánto se mezcla hacia la sección siguiente (0–1)
const MOUSE_STRENGTH = 0.02; // desplazamiento máximo de las curvas con el cursor (unidades de alto)
const INERTIA = 0.8; // suavizado del mouse y del progreso de scroll (1/s)
const SHOWN_SMOOTH = 2; // suavizado final de los parámetros mostrados (1/s)
const TRANSITION_MS = 1200; // duración del cambio de sección
const FRAME_MS_TARGET = 16; // objetivo ~60 fps
const FRAME_MS_LOW = 33; // objetivo ~30 fps si el equipo no da abasto
const SLOW_FRAME_MS = 24; // frame medio por encima de esto cuenta como lento...
const SLOW_FRAME_SECONDS = 2; // ...si dura al menos esto

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";
const LOW_HARDWARE = navigator.hardwareConcurrency <= LOW_CORES;

const VERTEX_SRC = `
attribute vec2 a_pos;
void main() {
  gl_Position = vec4(a_pos, 0.0, 1.0);
}
`;

// Curvas de nivel de un campo escalar suave. Sin derivadas del hardware: el ancho de píxel
// en espacio de f se estima con diferencias finitas.
const FRAGMENT_SRC = `
#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif

uniform vec2 u_res;
uniform float u_time;
uniform vec3 u_cBase;
uniform vec3 u_cLine;
uniform vec3 u_cLight;
uniform vec4 u_g0;
uniform vec4 u_g1;
uniform vec4 u_g2;
uniform float u_rot;
uniform float u_lines;
uniform float u_curve;
uniform vec3 u_mask;
uniform vec2 u_band;
uniform vec2 u_mouse;

const float GRAD_MIN = 0.12;   // piso del gradiente: evita manchas en picos y zonas planas
const float LINE_HALF_PX = 0.7; // semiancho de la línea en píxeles
const float GLOW_PX = 5.0;     // alcance del halo
const float GLOW_GAIN = 0.12;  // intensidad del halo (tenue)
const float ELONG = 0.62;      // achatamiento de las gaussianas (elipses orientadas por rot)

float asp;

float blob(vec2 q, vec4 g, vec2 phase, vec2 freq, mat2 R) {
  vec2 c = vec2(g.x * asp, g.y) + 0.05 * vec2(sin(u_time * freq.x + phase.x), cos(u_time * freq.y + phase.y));
  vec2 d = R * (q - c);
  d.x *= ELONG;
  return g.w * exp(-dot(d, d) / (g.z * g.z));
}

float field(vec2 p) {
  float cr = cos(u_rot);
  float sr = sin(u_rot);
  mat2 R = mat2(cr, -sr, sr, cr);
  // Dos deformaciones de senos de muy baja frecuencia
  vec2 q = p + u_curve * vec2(
    sin(p.y * 2.3 + u_time * 0.07),
    sin(p.x * 1.9 - u_time * 0.05 + 1.7)
  );
  return blob(q, u_g0, vec2(0.0, 1.3), vec2(0.11, 0.09), R)
       + blob(q, u_g1, vec2(2.1, 0.4), vec2(0.08, 0.12), R)
       + blob(q, u_g2, vec2(4.2, 3.0), vec2(0.1, 0.07), R);
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_res;
  asp = u_res.x / u_res.y;
  vec2 p = vec2(uv.x * asp, uv.y) + u_mouse;
  float px = 1.0 / u_res.y;

  float f = field(p);
  float fx = field(p + vec2(px, 0.0));
  float fy = field(p + vec2(0.0, px));
  float grad = max(length(vec2(fx - f, fy - f)) / px, GRAD_MIN); // |∇f| con piso
  float fpx = grad * px; // ancho de un píxel en espacio de f

  // Distancia en píxeles a la curva de nivel más cercana
  float s = f * u_lines;
  float dpx = abs(fract(s) - 0.5) / (u_lines * fpx);
  float line = 1.0 - smoothstep(LINE_HALF_PX - 0.5, LINE_HALF_PX + 0.5, dpx);
  float halo = GLOW_GAIN * (1.0 - smoothstep(LINE_HALF_PX, GLOW_PX, dpx));

  // Banda fina de borde definido
  float db = abs(abs(f - u_band.x) - u_band.y) / fpx;
  float band = (1.0 - smoothstep(LINE_HALF_PX - 0.5, LINE_HALF_PX + 0.5, db)) * 0.8
             + 0.06 * (1.0 - smoothstep(-0.5, 0.5, (abs(f - u_band.x) - u_band.y) / fpx));

  // Máscara: solo algunas curvas se ven, el resto se apaga en el negro
  vec2 dm = p - vec2(u_mask.x * asp, u_mask.y);
  float m = exp(-dot(dm, dm) / (u_mask.z * u_mask.z));
  float vis = smoothstep(0.08, 0.85, m);

  float I = clamp(line + halo + band, 0.0, 1.0) * vis;
  vec3 col = mix(u_cBase, u_cLine, I);
  col = mix(col, u_cLight, smoothstep(0.55, 1.0, m) * I * 0.9); // luz solo en la zona de mayor brillo

  // Viñeta suave hacia los bordes
  float vig = smoothstep(1.25, 0.35, length((uv - 0.5) * vec2(asp * 0.9, 1.0)));
  col *= mix(0.7, 1.0, vig);

  gl_FragColor = vec4(col, 1.0);
}
`;

const vectors = sectionOrder.map((id) => paletteToVector(bgPalettes[id]));
const LAST = sectionOrder.length - 1;

const clamp = (v, a, b) => Math.min(Math.max(v, a), b);
const ease = (t) => 1 - Math.pow(1 - t, 4); // easing lento, sin rebote
const smoothstep = (a, b, x) => {
  const t = clamp((x - a) / (b - a), 0, 1);
  return t * t * (3 - 2 * t);
};
const smoothing = (dt, rate) => 1 - Math.exp(-dt * rate);

function ShaderBackground({ section }) {
  const hostRef = useRef(null);
  const sectionRef = useRef(section);
  sectionRef.current = section;

  const [reduced, setReduced] = useState(
    () => window.matchMedia?.(REDUCED_MOTION_QUERY).matches ?? false
  );
  const [webglOk, setWebglOk] = useState(true);
  const useShader = !reduced && !LOW_HARDWARE && webglOk;

  // Preferencia de movimiento reducido (puede cambiar con la página abierta)
  useEffect(() => {
    const mq = window.matchMedia?.(REDUCED_MOTION_QUERY);
    if (!mq) return;
    const onChange = (e) => setReduced(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (!useShader) return;

    // El canvas se crea acá (no en el JSX) para que cada montaje tenga un contexto nuevo
    const host = hostRef.current;
    const canvas = document.createElement("canvas");
    const gl = canvas.getContext("webgl", {
      antialias: false,
      alpha: false,
      depth: false,
      stencil: false,
      powerPreference: "low-power",
    });
    if (!gl) {
      setWebglOk(false);
      return;
    }

    let program = null;
    let vertexShader = null;
    let fragmentShader = null;
    let buffer = null;
    let raf = 0;
    let resizeTimeout = 0;
    let disposed = false;

    const teardown = () => {
      if (disposed) return;
      disposed = true;
      cancelAnimationFrame(raf);
      clearTimeout(resizeTimeout);
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("pointermove", onPointerMove);
      canvas.removeEventListener("webglcontextlost", onContextLost);
      if (buffer) gl.deleteBuffer(buffer);
      if (program) gl.deleteProgram(program);
      if (vertexShader) gl.deleteShader(vertexShader);
      if (fragmentShader) gl.deleteShader(fragmentShader);
      gl.getExtension("WEBGL_lose_context")?.loseContext();
      canvas.remove();
    };

    const compile = (type, src) => {
      const shader = gl.createShader(type);
      gl.shaderSource(shader, src);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    function onContextLost(e) {
      e.preventDefault();
      teardown();
      setWebglOk(false);
    }
    function onVisibility() {
      if (document.hidden) {
        cancelAnimationFrame(raf);
        raf = 0;
      } else if (!raf && !disposed) {
        lastTick = performance.now();
        ema = 16.7;
        slowFor = 0;
        raf = requestAnimationFrame(frame);
      }
    }
    function onResize() {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(resize, 150);
    }
    function onPointerMove(e) {
      if (e.pointerType !== "mouse") return;
      mouseTarget[0] = (e.clientX / window.innerWidth - 0.5) * 2 * MOUSE_STRENGTH;
      mouseTarget[1] = -(e.clientY / window.innerHeight - 0.5) * 2 * MOUSE_STRENGTH;
    }

    vertexShader = compile(gl.VERTEX_SHADER, VERTEX_SRC);
    fragmentShader = compile(gl.FRAGMENT_SHADER, FRAGMENT_SRC);
    program = gl.createProgram();
    if (vertexShader && fragmentShader) {
      gl.attachShader(program, vertexShader);
      gl.attachShader(program, fragmentShader);
      gl.linkProgram(program);
    }
    if (!vertexShader || !fragmentShader || !gl.getProgramParameter(program, gl.LINK_STATUS)) {
      teardown();
      setWebglOk(false);
      return;
    }
    gl.useProgram(program);

    // Un triángulo que cubre toda la pantalla
    buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const aPos = gl.getAttribLocation(program, "a_pos");
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    const u = {};
    [
      "u_res", "u_time", "u_cBase", "u_cLine", "u_cLight", "u_g0", "u_g1", "u_g2",
      "u_rot", "u_lines", "u_curve", "u_mask", "u_band", "u_mouse",
    ].forEach((name) => {
      u[name] = gl.getUniformLocation(program, name);
    });

    function resize() {
      const k = RENDER_SCALE * Math.min(window.devicePixelRatio || 1, MAX_DPR);
      canvas.width = Math.max(1, Math.floor(window.innerWidth * k));
      canvas.height = Math.max(1, Math.floor(window.innerHeight * k));
      gl.viewport(0, 0, canvas.width, canvas.height);
    }
    resize();
    host.appendChild(canvas);

    // ---- Estado de la animación ----
    const els = sectionOrder.map((id) => document.getElementById(id));
    const initialIdx = Math.max(sectionOrder.indexOf(sectionRef.current), 0);
    let targetIdx = initialIdx;
    let from = vectors[initialIdx].slice();
    let to = vectors[initialIdx].slice();
    const shown = vectors[initialIdx].slice();
    let tStart = 0;

    let time = 0;
    let lastY = window.scrollY;
    let lastProgY = NaN;
    let energy = 0;
    let scrollIdx = initialIdx;
    let wTarget = 0;
    let w = 0;
    const mouseTarget = [0, 0];
    const mouse = [0, 0];

    let lastTick = performance.now();
    let ema = 16.7;
    let slowFor = 0;
    let lowered = false;
    let frameInterval = FRAME_MS_TARGET;

    function readProgress() {
      const mid = window.innerHeight * 0.5;
      let found = -1;
      let frac = 0;
      for (let i = 0; i < els.length; i++) {
        if (!els[i]) continue;
        const r = els[i].getBoundingClientRect();
        if (r.top <= mid && r.bottom >= mid) {
          found = i;
          frac = (mid - r.top) / Math.max(r.height, 1);
          break;
        }
      }
      if (found < 0 || found >= LAST) {
        wTarget = 0;
      } else {
        scrollIdx = found;
        wTarget = smoothstep(0.6, 1, frac);
      }
    }

    function draw(now, dt) {
      // Cambio discreto de sección: parte de lo que se está mostrando ahora
      const idx = sectionOrder.indexOf(sectionRef.current);
      if (idx >= 0 && idx !== targetIdx) {
        from = shown.slice();
        to = vectors[idx];
        tStart = now;
        targetIdx = idx;
      }
      const k = ease(clamp((now - tStart) / TRANSITION_MS, 0, 1));

      // Velocidad de scroll -> energía que acelera el tiempo y decae sola
      const y = window.scrollY;
      const vel = Math.abs(y - lastY) / Math.max(dt, 0.001);
      lastY = y;
      const energyTarget = clamp(vel / SCROLL_REF_SPEED, 0, 1);
      energy += (energyTarget - energy) * smoothing(dt, energyTarget > energy ? 3 : SCROLL_DECAY);
      time += dt * (SPEED_BASE + SCROLL_SPEED_GAIN * energy);

      // Progreso continuo hacia la sección siguiente
      if (y !== lastProgY) {
        readProgress();
        lastProgY = y;
      }
      w += (wTarget - w) * smoothing(dt, INERTIA);

      // Mouse con inercia
      const m = smoothing(dt, INERTIA);
      mouse[0] += (mouseTarget[0] - mouse[0]) * m;
      mouse[1] += (mouseTarget[1] - mouse[1]) * m;

      // Parámetros mostrados = transición discreta + mezcla hacia la siguiente sección
      const next = vectors[Math.min(scrollIdx + 1, LAST)];
      const s = smoothing(dt, SHOWN_SMOOTH);
      for (let i = 0; i < shown.length; i++) {
        const base = from[i] + (to[i] - from[i]) * k;
        const desired = base + (next[i] - base) * w * SCROLL_BLEND;
        shown[i] += (desired - shown[i]) * s;
      }

      gl.uniform2f(u.u_res, canvas.width, canvas.height);
      gl.uniform1f(u.u_time, time);
      gl.uniform3f(u.u_cBase, shown[0], shown[1], shown[2]);
      gl.uniform3f(u.u_cLine, shown[3], shown[4], shown[5]);
      gl.uniform3f(u.u_cLight, shown[6], shown[7], shown[8]);
      gl.uniform4f(u.u_g0, shown[9], shown[10], shown[11], shown[12]);
      gl.uniform4f(u.u_g1, shown[13], shown[14], shown[15], shown[16]);
      gl.uniform4f(u.u_g2, shown[17], shown[18], shown[19], shown[20]);
      gl.uniform1f(u.u_rot, shown[21]);
      gl.uniform1f(u.u_lines, shown[22]);
      gl.uniform1f(u.u_curve, shown[23]);
      gl.uniform3f(u.u_mask, shown[24], shown[25], shown[26]);
      gl.uniform2f(u.u_band, shown[27], shown[28]);
      gl.uniform2f(u.u_mouse, mouse[0], mouse[1]);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    }

    function frame(now) {
      raf = requestAnimationFrame(frame);
      const elapsed = now - lastTick;
      if (elapsed < frameInterval - 4) return; // tolerancia por el vsync
      lastTick = now;
      const dt = Math.min(elapsed / 1000, 0.1);

      // Si el frame medio es lento durante un rato, baja a ~30 fps (no vuelve a subir)
      if (!lowered) {
        ema += (elapsed - ema) * 0.1;
        if (ema > SLOW_FRAME_MS) {
          slowFor += dt;
          if (slowFor > SLOW_FRAME_SECONDS) {
            lowered = true;
            frameInterval = FRAME_MS_LOW;
          }
        } else {
          slowFor = 0;
        }
      }
      draw(now, dt);
    }

    canvas.addEventListener("webglcontextlost", onContextLost);
    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("resize", onResize);
    window.addEventListener("pointermove", onPointerMove, { passive: true });

    draw(performance.now(), 0.016); // primer frame sin esperar al rAF
    if (!document.hidden) raf = requestAnimationFrame(frame);

    return teardown;
  }, [useShader]);

  const palette = bgPalettes[section] ?? bgPalettes[defaultSection];

  return (
    <>
      {useShader ? (
        <div ref={hostRef} className="bg-shader" aria-hidden="true" />
      ) : (
        <div
          className="bg-static"
          aria-hidden="true"
          style={{
            "--bg-base": palette.base,
            "--bg-line": palette.line,
            "--bg-light": palette.light,
            "--bg-mx": `${palette.mask[0] * 100}%`,
            "--bg-my": `${(1 - palette.mask[1]) * 100}%`,
          }}
        />
      )}
      {/* Dos capas de grano hermanas (overlay + mezcla normal), por encima del fondo y por debajo del contenido */}
      <div className="bg-grain" aria-hidden="true" />
      <div className="bg-grain-soft" aria-hidden="true" />
    </>
  );
}

export default ShaderBackground;
