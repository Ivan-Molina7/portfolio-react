import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import FRAGMENT_SRC from "./shader.frag.js";
import {
  CALM_DETAIL_SCROLL,
  CAP_NOSE_OFFSET,
  DEFAULTS,
  DETAIL_PALETTE,
  GALLERY,
  GALLERY_PALETTE,
  GALLERY_SCENE,
  HIT_OMEGA_IN,
  HIT_OMEGA_OUT,
  HIT_STEP,
  HIT_MAX_CATCHUP,
  DT_MAX,
  CLOCK_DT_MAX,
  HOME_MOUSE_RATE,
  PAL,
  SECTIONS,
  pack,
  MOBILE_MAX,
  FAN_MOBILE_GAIN,
} from "./scenes.js";
import { useBackground } from "./BackgroundContext.jsx";
import { SECTION_IDS, observeActiveSection } from "../../utils/sectionTracker.js";

const VERTEX_SRC = "attribute vec2 a_pos; void main(){ gl_Position = vec4(a_pos, 0.0, 1.0); }";
const UNIFORMS = [
  "u_res", "u_time", "u_mouse", "u_aM", "u_bM", "u_T", "u_aP0", "u_aP1", "u_bP0", "u_bP1",
  "u_core", "u_glow", "u_grain", "u_thick", "u_fanThick", "u_ampThick", "u_ampFill",
  "u_cap", "u_hit", "u_push", "u_inner", "u_calm", "u_floor", "u_gain", "u_colReach",
  "u_midFade", "u_star", "u_starLevel", "u_c0", "u_c1", "u_c2", "u_c3",
  "u_phase", "u_osc", "u_breath", "u_vib",
];
const LOW_CORES = 2;
const SCROLL_SETTLE_MS = 140; // el scroll se considera quieto tras este tiempo sin eventos
const REDUCED_QUERY = "(prefers-reduced-motion: reduce)";

let firstLoad = true; // solo la carga inicial de la página aplica la escena de golpe; navegar entre rutas anima

const clamp01 = (v) => Math.min(1, Math.max(0, v));
const ease = (dt, rate) => 1 - Math.exp(-dt * rate);

// Motor del fondo: portado de reference/fondo-prototipo-dorado.html (bucle frame() y measureCap()).
function createEngine(canvas, bg) {
  const s = bg.state;
  const lowHw = (navigator.hardwareConcurrency || 4) <= LOW_CORES;
  const reduce = window.matchMedia(REDUCED_QUERY);
  const maxDpr = lowHw ? 1 : 2;
  const frameMs = lowHw ? 1000 / 30 : 0;

  let gl = null;
  let prog = null;
  let U = {};
  let raf = 0;
  let disposed = false;
  let lost = false;

  // ---- estado de animación ----
  let A = s.scene; // escena mostrada
  let B = s.scene; // escena destino de la transición
  let prog_ = 0;
  let animating = false;
  let pending = null;
  let time = 0;
  let phase = 0;
  let osc = 0;
  let starLevel = 0;
  let hitV = 0;
  let hitVel = 0;
  let hitAcc = 0; // tiempo real pendiente de integrar en el resorte
  let flashV = 0;
  let calmV = 1;
  let floorV = s.variant === "galeria" ? 0 : 1;
  let gainV = 1;
  let mouseAmp = DEFAULTS.mouse * 0.12;
  const mouse = { x: 0, y: 0, sx: 0, sy: 0 };
  let capInit = false;
  const capV = new Float32Array(4);
  let capLast = null;
  const cur = PAL[SECTIONS[A].pal].map((c) => c.slice());
  const a0 = new Float32Array(4), a1 = new Float32Array(4), b0 = new Float32Array(4), b1 = new Float32Array(4);
  let last = performance.now();
  let lastDraw = 0;

  function compile(type, src) {
    const sh = gl.createShader(type);
    gl.shaderSource(sh, src);
    gl.compileShader(sh);
    if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
      console.error(gl.getShaderInfoLog(sh));
      return null;
    }
    return sh;
  }

  function init() {
    if (!gl) {
      gl = canvas.getContext("webgl", { antialias: false, alpha: false }) || canvas.getContext("experimental-webgl");
    }
    if (!gl) return false;
    const vs = compile(gl.VERTEX_SHADER, VERTEX_SRC);
    const fs = compile(gl.FRAGMENT_SHADER, FRAGMENT_SRC);
    if (!vs || !fs) return false;
    prog = gl.createProgram();
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
      console.error(gl.getProgramInfoLog(prog));
      return false;
    }
    gl.useProgram(prog);
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, "a_pos");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
    U = {};
    UNIFORMS.forEach((n) => { U[n] = gl.getUniformLocation(prog, n); });
    resize();
    return true;
  }

  function resize() {
    if (!gl) return;
    const dpr = Math.min(window.devicePixelRatio || 1, maxDpr);
    const w = Math.floor(window.innerWidth * dpr);
    const h = Math.floor(window.innerHeight * dpr);
    if (canvas.width !== w || canvas.height !== h) {
      canvas.width = w;
      canvas.height = h;
    }
    gl.viewport(0, 0, canvas.width, canvas.height);
  }

  // La cápsula sigue al bloque de texto registrado: el vacío queda donde está el contenido, también al scrollear.
  function measureCap() {
    const dpr = canvas.width / window.innerWidth;
    const H = canvas.height;
    const W = canvas.width;
    const el = s.capsuleEl;
    const r = el && el.isConnected ? el.getBoundingClientRect() : null;
    let v;
    if (r && r.height > 0) {
      v = { top: r.top, h: r.height, right: r.right };
      capLast = v;
    } else {
      v = capLast || { top: 190, h: 360, right: window.innerWidth / 2 - 140 };
    }
    const cy = v.top + v.h / 2;
    const rr = v.h / 2 + DEFAULTS.capPad;
    const nx = v.right + CAP_NOSE_OFFSET;
    return [(0.5 * H - cy * dpr) / H, (rr * dpr) / H, (nx * dpr - 0.5 * W) / H, DEFAULTS.capAn];
  }

  // data-shown / bg-leaving en <html>; solo se escribe cuando cambian
  let pubShown = -1;
  let pubLeaving = false;
  function publishShown(shown, leaving) {
    const root = document.documentElement;
    if (shown !== pubShown) {
      pubShown = shown;
      root.dataset.shown = String(shown);
      root.removeAttribute("data-bg-fallback");
    }
    if (leaving !== pubLeaving) {
      pubLeaving = leaving;
      root.classList.toggle("bg-leaving", leaving);
    }
  }

  // Sin motor (sin WebGL, contexto perdido, o que no publicó a tiempo) el contenido del Home
  // no puede quedar oculto: data-bg-fallback lo muestra todo, sin animación de entrada.
  function enableFallback() {
    const root = document.documentElement;
    pubShown = -1;
    pubLeaving = false;
    delete root.dataset.shown;
    root.classList.remove("bg-leaving");
    root.setAttribute("data-bg-fallback", "");
  }

  function startTransition(to) {
    if (import.meta.env.DEV) console.debug(`[bg] ${A}→${to}`);
    B = to;
    prog_ = 0;
    animating = true;
    pending = null;
  }

  // dt: tiempo del cuadro acotado a DT_MAX (suavizados y transiciones); realDt: tiempo real (resorte, subpasos fijos)
  function step(dt, instant, realDt = dt) {
    if (s.snap) { s.snap = false; instant = true; }
    const rm = reduce.matches;
    const want = s.variant === "galeria" ? GALLERY_SCENE : s.scene;

    // ---- transición entre escenas (cola: salta a la última) ----
    let T = 0;
    let boost = 0;
    if (rm || instant) {
      A = B = want;
      animating = false;
      pending = null;
      prog_ = 0;
    } else {
      if (animating) {
        pending = want !== B ? want : null;
      } else if (want !== A) {
        startTransition(want);
      }
      if (animating) {
        prog_ += dt / DEFAULTS.dur;
        if (prog_ >= 1) {
          A = B;
          animating = false;
          prog_ = 0;
          if (pending !== null && pending !== A) startTransition(pending);
        } else {
          T = 0.5 - 0.5 * Math.cos(Math.PI * prog_);
          boost = 0.6 * Math.sin(Math.PI * prog_);
        }
      }
    }
    const shownS = animating ? (prog_ >= 0.42 ? B : A) : A;
    const palScene = animating ? B : A;

    // señal para el contenido del Home: sección mostrada y salida (< 42%)
    publishShown(shownS, animating && prog_ < 0.42);

    const cdt = Math.min(dt, CLOCK_DT_MAX); // reloj de las líneas: acotado aparte (ver scenes.js)
    time += cdt * (rm ? 0 : DEFAULTS.speed * 0.4 + boost);
    const br = rm ? 0 : DEFAULTS.breath;
    phase += cdt * br * 0.25;
    if (!rm) osc += cdt * 0.7;

    // ---- mouse ----
    const gal = s.variant === "galeria";
    const mRate = gal ? GALLERY.mouseRate : HOME_MOUSE_RATE;
    mouse.sx += (mouse.x - mouse.sx) * ease(dt, mRate);
    mouse.sy += (mouse.y - mouse.sy) * ease(dt, mRate);
    const ampT = rm ? 0 : gal ? GALLERY.mouse : DEFAULTS.mouse * 0.12;
    mouseAmp = rm ? 0 : mouseAmp + (ampT - mouseAmp) * ease(dt, 3);

    // ---- golpe del detalle: resorte críticamente amortiguado ----
    const hitTarget = s.detail && A === 1 && !animating && !gal ? 1 : 0;
    if (rm || instant) {
      hitV = hitTarget;
      hitVel = 0;
      hitAcc = 0;
    } else {
      const hw = hitTarget === 0 ? HIT_OMEGA_OUT : HIT_OMEGA_IN;
      hitAcc += Math.min(realDt, HIT_MAX_CATCHUP);
      while (hitAcc >= HIT_STEP) {
        hitVel += (hw * hw * (hitTarget - hitV) - 2 * hw * hitVel) * HIT_STEP;
        hitV += hitVel * HIT_STEP;
        hitAcc -= HIT_STEP;
      }
    }
    flashV = Math.max(0, hitVel) * 0.45;

    const capT = measureCap();
    if (!capInit) { capV.set(capT); capInit = true; }
    for (let i = 0; i < 4; i++) capV[i] += (capT[i] - capV[i]) * (rm || instant ? 1 : ease(dt, 10));

    // calma por scroll del detalle (la escribe quien scrollea) y de la galería
    const calmT = hitTarget === 1 ? s.calm : 1;
    calmV = rm || instant ? calmT : calmV + (calmT - calmV) * ease(dt, 6);
    const floorT = gal ? 0 : 1;
    floorV = rm || instant ? floorT : floorV + (floorT - floorV) * ease(dt, 3);
    const p = clamp01(window.scrollY / GALLERY.scrollRef);
    const gainT = gal ? GALLERY.intensity * (1 - GALLERY.scrollDrop * p) : B === 3 && window.innerWidth <= MOBILE_MAX ? FAN_MOBILE_GAIN : 1;
    gainV = rm || instant ? gainT : gainV + (gainT - gainV) * ease(dt, 6);

    // luz lejana del portal: se enciende gradualmente al final de la entrada
    const starTarget = shownS === 0 ? 1 : 0;
    starLevel = rm || instant ? starTarget : starLevel + (starTarget - starLevel) * ease(dt, starTarget > starLevel ? 0.9 : 3.5);

    // ---- paleta ----
    let palName = SECTIONS[palScene].pal;
    if (gal) palName = GALLERY_PALETTE;
    else if (palScene === 1 && hitTarget === 1) palName = DETAIL_PALETTE;
    const tgt = PAL[palName];
    const kp = rm || instant ? 1 : ease(dt, 2.2);
    for (let i = 0; i < 4; i++) for (let j = 0; j < 3; j++) cur[i][j] += (tgt[i][j] - cur[i][j]) * kp;

    return { T, br, rm, palScene };
  }

  function draw(f) {
    if (!gl || lost) return;
    const cssW = window.innerWidth;
    pack(A, a0, a1, canvas.width, canvas.height, cssW);
    pack(f.palScene, b0, b1, canvas.width, canvas.height, cssW);
    gl.uniform2f(U.u_res, canvas.width, canvas.height);
    gl.uniform1f(U.u_time, time);
    gl.uniform2f(U.u_mouse, mouse.sx * mouseAmp, mouse.sy * mouseAmp);
    gl.uniform1f(U.u_aM, SECTIONS[A].modo);
    gl.uniform1f(U.u_bM, SECTIONS[f.palScene].modo);
    gl.uniform1f(U.u_T, f.T);
    gl.uniform4fv(U.u_aP0, a0); gl.uniform4fv(U.u_aP1, a1);
    gl.uniform4fv(U.u_bP0, b0); gl.uniform4fv(U.u_bP1, b1);
    gl.uniform1f(U.u_core, DEFAULTS.core);
    gl.uniform1f(U.u_glow, DEFAULTS.glow);
    gl.uniform1f(U.u_grain, DEFAULTS.grain);
    gl.uniform1f(U.u_thick, DEFAULTS.thick);
    gl.uniform1f(U.u_ampThick, DEFAULTS.ampThick);
    gl.uniform1f(U.u_ampFill, DEFAULTS.ampFill);
    gl.uniform4fv(U.u_cap, capV);
    gl.uniform2f(U.u_hit, hitV, flashV);
    gl.uniform2f(U.u_push, DEFAULTS.capPush, DEFAULTS.capReach);
    gl.uniform2f(U.u_inner, 0, DEFAULTS.capInner);
    gl.uniform1f(U.u_calm, calmV);
    gl.uniform1f(U.u_floor, floorV);
    gl.uniform1f(U.u_gain, gainV);
    gl.uniform1f(U.u_colReach, DEFAULTS.colReach);
    gl.uniform1f(U.u_midFade, DEFAULTS.midFade);
    gl.uniform1f(U.u_star, DEFAULTS.star);
    gl.uniform1f(U.u_starLevel, starLevel);
    gl.uniform1f(U.u_fanThick, DEFAULTS.thick * 7 * (canvas.width / window.innerWidth));
    gl.uniform3fv(U.u_c0, cur[0]); gl.uniform3fv(U.u_c1, cur[1]); gl.uniform3fv(U.u_c2, cur[2]); gl.uniform3fv(U.u_c3, cur[3]);
    gl.uniform1f(U.u_phase, phase);
    gl.uniform1f(U.u_osc, osc);
    gl.uniform1f(U.u_breath, f.br);
    gl.uniform1f(U.u_vib, f.rm ? 0 : DEFAULTS.vib);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
  }

  function frame(now) {
    raf = 0;
    if (disposed || lost || document.hidden) return;
    if (frameMs && now - lastDraw < frameMs) {
      raf = requestAnimationFrame(frame);
      return;
    }
    lastDraw = now;
    const realDt = (now - last) / 1000;
    const dt = Math.min(realDt, DT_MAX);
    last = now;
    draw(step(dt, false, realDt));
    raf = requestAnimationFrame(frame);
  }

  // reduced-motion: un solo frame estático con el estado final aplicado de golpe
  function drawStatic() {
    if (disposed || lost) return;
    resize();
    draw(step(0, true));
  }

  function start() {
    cancelAnimationFrame(raf);
    raf = 0;
    if (!gl || lost) return;
    if (reduce.matches) { drawStatic(); return; }
    last = performance.now();
    raf = requestAnimationFrame(frame);
  }

  function onPointer(e) {
    if (e.pointerType !== "mouse") return;
    mouse.x = e.clientX / window.innerWidth - 0.5;
    mouse.y = 0.5 - e.clientY / window.innerHeight;
  }
  function onResize() {
    resize();
    if (reduce.matches) drawStatic();
  }
  function onVisibility() {
    if (document.hidden) { cancelAnimationFrame(raf); raf = 0; }
    else start();
  }
  function onLost(e) {
    e.preventDefault();
    lost = true;
    cancelAnimationFrame(raf);
    raf = 0;
    enableFallback();
  }
  function onRestored() {
    lost = false;
    if (init()) start();
    else { canvas.dataset.nogl = "1"; enableFallback(); }
  }
  function onChange() {
    if (reduce.matches) drawStatic();
  }

  const ok = init();
  if (!ok) {
    canvas.dataset.nogl = "1"; // el fondo CSS #010403 del canvas queda como fallback
    enableFallback();
    return () => {};
  }
  delete canvas.dataset.nogl;
  canvas.addEventListener("webglcontextlost", onLost);
  canvas.addEventListener("webglcontextrestored", onRestored);
  window.addEventListener("pointermove", onPointer, { passive: true });
  window.addEventListener("resize", onResize);
  document.addEventListener("visibilitychange", onVisibility);
  reduce.addEventListener("change", start);
  const unsub = bg.subscribe(onChange);
  start();
  // red de seguridad: si el motor no publicó data-shown en 500ms, se muestra el contenido igual
  const safety = window.setTimeout(() => {
    if (!document.documentElement.dataset.shown) enableFallback();
  }, 500);

  return () => {
    window.clearTimeout(safety);
    disposed = true;
    cancelAnimationFrame(raf);
    canvas.removeEventListener("webglcontextlost", onLost);
    canvas.removeEventListener("webglcontextrestored", onRestored);
    window.removeEventListener("pointermove", onPointer);
    window.removeEventListener("resize", onResize);
    document.removeEventListener("visibilitychange", onVisibility);
    reduce.removeEventListener("change", start);
    unsub();
  };
}

// Mantiene el hash de la URL igual a la sección activa de Home. replaceState (no pushState): no suma entradas
// al historial ni dispara hashchange/popstate ni scrollea. Así, al volver con "atrás" desde el detalle o la
// galería, la URL ya trae #seccion y el fondo entra directo en esa escena (onAttach), sin pasar por Inicio.
function syncHash(idx) {
  if (idx < 0 || window.location.pathname !== "/") return;
  const hash = `#${SECTION_IDS[idx]}`;
  if (window.location.hash !== hash) window.history.replaceState(window.history.state, "", `/${hash}`);
}

// Rutas -> escena. En Home, la sección visible (la que cruza el 50% del alto) elige la escena 0..4.
function useRouteSync(bg) {
  const { pathname } = useLocation();

  useEffect(() => {
    if (pathname.startsWith("/proyecto/")) {
      bg.setVariant("home");
      bg.setScene(1);
      bg.setDetail(true);
    } else if (pathname === "/galeriaProyectos") {
      bg.setVariant("galeria");
      bg.setScene(GALLERY_SCENE);
      bg.setDetail(false);
    } else if (pathname === "/") {
      bg.setVariant("home");
      bg.setDetail(false);
    }
  }, [pathname, bg]);

  useEffect(() => {
    if (pathname !== "/") { firstLoad = false; return undefined; }
    const snap = firstLoad;
    firstLoad = false;
    let settle = 0;
    let candidate = -1;
    let first = true;
    // El scroll suave recorre las secciones intermedias: se pide la escena solo cuando el scroll frena,
    // así la transición es siempre directa de la escena actual a la elegida.
    const commit = () => {
      settle = 0;
      if (candidate >= 0) { bg.setScene(candidate); syncHash(candidate); }
    };
    const onScroll = () => {
      window.clearTimeout(settle);
      settle = window.setTimeout(commit, SCROLL_SETTLE_MS);
    };
    // carga directa a #seccion: arranca ya en esa escena (en una SPA el navegador no llega a hacer el salto
    // del ancla porque el DOM se arma después de la carga)
    const onAttach = (els) => {
      const hashIdx = SECTION_IDS.indexOf(window.location.hash.slice(1));
      if (hashIdx < 0) return;
      bg.setScene(hashIdx, snap);
      els[hashIdx].scrollIntoView({ behavior: "instant", block: "start" });
    };
    const stop = observeActiveSection((idx) => {
      if (idx < 0) return;
      candidate = idx;
      if (first) { first = false; bg.setScene(idx, snap); syncHash(idx); } // primera lectura: de golpe, sin pasar por Inicio
      else onScroll();
    }, onAttach);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.clearTimeout(settle);
      window.removeEventListener("scroll", onScroll);
      stop();
    };
  }, [pathname, bg]);
}

export default function Background() {
  const bg = useBackground();
  const canvasRef = useRef(null);
  useRouteSync(bg);

  useEffect(() => createEngine(canvasRef.current, bg), [bg]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      // 100%, no 100vw/100vh: vw/vh son las del dispositivo y en mobile, si la página desborda, el viewport de
      // layout es más grande y el canvas dejaba un área sin cubrir (ver html{background} en styles.scss)
      style={{ position: "fixed", inset: 0, width: "100%", height: "100%", zIndex: -1, background: "#010403", pointerEvents: "none" }}
    />
  );
}
