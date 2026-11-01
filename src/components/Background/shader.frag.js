// Fragment shader del fondo. Portado de reference/fondo-prototipo-dorado.html.
// Modos: 0 portal en arco, 2 anfora, 5 portal invertido (usa el 0), 6 abanico de esquina, 7 columnata (+ golpe del detalle).
// u_floor: 1 = piso espejado y horizonte; 0 = variante de la galeria (sin piso, v 0.40-0.95).
export default `#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif
uniform vec2 u_res;
uniform float u_time;
uniform vec2 u_mouse;
uniform float u_aM;
uniform float u_bM;
uniform float u_T;
uniform vec4 u_aP0;
uniform vec4 u_aP1;
uniform vec4 u_bP0;
uniform vec4 u_bP1;
uniform float u_core;
uniform float u_glow;
uniform float u_grain;
uniform float u_thick;
uniform float u_fanThick;
uniform float u_ampThick;
uniform float u_ampFill;
uniform float u_colReach;
uniform vec4 u_cap;
uniform vec2 u_hit;
uniform vec2 u_push;
uniform vec2 u_inner;
uniform float u_calm;
uniform float u_floor;
uniform float u_gain;
uniform float u_midFade;
uniform float u_star;
uniform float u_starLevel;
uniform vec3 u_c0; uniform vec3 u_c1; uniform vec3 u_c2; uniform vec3 u_c3;
uniform float u_phase;
uniform float u_osc;
uniform float u_breath;
uniform float u_vib;

float hash(float n) { return fract(sin(n * 127.1) * 43758.5453); }
float hash2(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }


float lineShape(float x, float cellpx) {
  float f = fract(x);
  float d = abs(f - 0.5) * 2.0;
  float aa = 3.0 / max(cellpx, 1.0);
  float wd = max(u_thick, aa * 1.2);
  float l = 1.0 - smoothstep(wd - aa, wd + aa, d);
  float fadeAA = smoothstep(2.0, 5.0, cellpx);
  return mix(0.45, l, fadeAA);
}

float lineShapeK(float x, float cellpx, float k) {
  float f = fract(x);
  float d = abs(f - 0.5) * 2.0;
  float aa = 3.0 / max(cellpx, 1.0);
  float wd = max(u_thick * k, aa * 1.2);
  float l = 1.0 - smoothstep(wd - aa, wd + aa, d);
  float fadeAA = smoothstep(2.0, 5.0, cellpx);
  return mix(0.45, l, fadeAA);
}

float lineInt(float id, float k, float t0) {
  return mix(0.25, 1.0, hash(id)) * (0.8 + 0.2 * sin(k + id * 3.1 + t0 * 0.1)) * (1.0 + u_vib * 0.25 * sin(id * 5.3 + u_osc * 1.7));
}

// x = intensidad de lineas, y = masas anchas, z = id de linea (apagado escalonado)
float fanRays(vec2 p, float R, float Nf, float dec) {
  float px = 1.0 / u_res.y;
  float inQ = step(p.x, 0.0) * step(p.y, 0.0);
  float r = length(p);
  float th = atan(-p.y, -p.x) + 0.03 * sin(u_time * 0.3 + r * 2.5);
  float dth = 1.5707963 / Nf;
  float xs = th / dth + 0.5;
  float fx = fract(xs);
  float duv = min(fx, 1.0 - fx) * dth * max(r, 0.04);
  float line = 1.0 - smoothstep(px * (u_fanThick - 0.6), px * (u_fanThick + 0.6), duv);
  float id = floor(xs);
  float c2 = abs(cos(2.0 * th));
  float tip = R * (0.30 + 0.70 * pow(c2, 0.8)) * mix(0.75, 1.0, hash(id + 5.0)) * (1.0 + 0.10 * sin(u_time * 0.45 + id * 1.9));
  float tipCut = 1.0 - smoothstep(tip - 0.06, tip, r);
  float att = smoothstep(0.04, 0.22, r) * exp(-r * dec);
  float li = mix(0.45, 1.0, hash(id)) * (1.0 + u_vib * 0.25 * sin(id * 5.3 + u_osc * 1.7));
  return line * li * att * tipCut * inQ;
}

vec3 scene(float mode, vec2 uv, vec4 P0, vec4 P1) {
  float px = 1.0 / u_res.y;
  float t0 = u_time;
  float N = max(P1.x, 4.0);
  float fill = clamp(P1.w, 0.0, 1.0);
  vec3 o = vec3(0.0);
  bool isP = (mode < 0.5 || (mode > 4.5 && mode < 5.5));
  bool isA = (mode > 1.5 && mode < 2.5);
  float side = 1.0;
  float dimK = 1.0;
  float starK = (mode < 0.5) ? 1.0 : 0.0;
  if (mode > 4.5 && mode < 5.5) { uv.y = -uv.y; mode = 0.0; }

  if (mode < 0.5) {
    // 0. Portal en arco: arcos anidados alrededor de una abertura oscura
    vec2 c = P0.xy + 0.02 * vec2(sin(t0 * 0.11), cos(t0 * 0.13));
    vec2 q = uv - c;
    q.x = abs(q.x);
    float hh = P1.z;
    float dA = (q.y < hh) ? (q.x - P0.z) : (length(vec2(q.x, q.y - hh)) - P0.z);
    dA += 0.010 * sin(t0 * 0.15);
    float ang = atan(q.y - hh, q.x);
    float t = dA / P0.w;
    float dom = P1.y + 0.02 * sin(t0 * 0.2);
    float dist = t - dom;
    float w = dist < 0.0 ? 0.22 : 0.55;
    float env = exp(-(dist / w) * (dist / w));
    float x = t * N - u_phase - 0.25 * u_breath * sin(u_osc);
    float id = floor(x);
    float cellpx = u_res.y * P0.w / N;
    float line = lineShape(x, cellpx);
    float li = lineInt(id, ang * 7.0, t0);
    float q1 = dist / 0.045;
    float q2 = (dist - 0.12) / 0.03;
    float core = exp(-q1 * q1) + 0.55 * exp(-q2 * q2);
    core *= 0.75 + 0.25 * li;
    float rim = exp(-max(dA, 0.0) / (px * 3.0));
    float edge = smoothstep(0.0, px * 1.5, dA);
    float g = dist / 0.28;
    vec2 sp = uv - vec2(c.x, c.y + hh + 0.04);
    float sr = length(sp);
    float star = starK * u_star * u_starLevel * (exp(-sr * u_res.y / 3.2) + 0.35 * exp(-sr / 0.07)) * (0.85 + 0.15 * sin(t0 * 0.5));
    o.x = env * line * li * edge;
    o.y = (env * 0.45 * fill + u_core * core + 0.38 * rim * (0.4 + 0.6 * env) + u_glow * 0.35 * exp(-g * g)) * edge + star;
    o.z = hash(id);

  } else if (mode < 2.5) {
    // 2. Anfora: contorno que se hincha y se estrecha (curvas del patron), lineas hacia afuera
    vec2 q = uv - P0.xy;
    float d = abs(q.x) - P0.z * (1.0 + 0.55 * sin(q.y * P1.z + t0 * 0.08 + 1.2));
    d += 0.008 * sin(t0 * 0.13);
    float t = d / P0.w;
    float dom = P1.y + 0.02 * sin(t0 * 0.2);
    float dist = t - dom;
    float w = dist < 0.0 ? 0.14 : 0.40;
    float env = exp(-(dist / w) * (dist / w));
    float x = t * N - u_phase - 0.25 * u_breath * sin(u_osc);
    float id = floor(x);
    float cellpx = u_res.y * P0.w / N;
    float line = lineShapeK(x, cellpx, 0.6 * u_ampThick);
    float li = lineInt(id, q.y * 5.0, t0);
    float rim = exp(-max(d, 0.0) / (px * 3.0));
    float edge = smoothstep(0.0, px * 1.5, d);
    float q1 = dist / 0.04;
    float core = exp(-q1 * q1);
    float g = dist / 0.25;
    float innerA = clamp(-d / (P0.z * 1.2), 0.0, 1.0);
    float ampIn = u_ampFill * (1.0 - edge) * (0.05 + 0.24 * innerA) * (0.8 + 0.2 * sin(q.y * 2.4 + t0 * 0.12));
    o.x = env * line * li * edge;
    o.y = (env * 0.45 * fill + u_core * core + 0.38 * rim * (0.4 + 0.6 * env) + u_glow * 0.35 * exp(-g * g)) * edge + ampIn;
    o.z = hash(id);

  } else if (mode > 6.5) {
    // 7. Columnata (diseno Art Deco): columnas acanaladas, una iluminada, con piso espejado.
    // Con u_hit > 0 recibe el golpe del detalle: un vacio redondeado entra por la izquierda y empuja las rayas.
    float T = u_fanThick;
    float hor = -0.4;
    float hk = clamp(u_hit.x, 0.0, 1.0);
    float hitK = min(u_hit.x, 1.3);
    float r9 = u_cap.y;
    // Reposo de la capsula: 0.8 (en unidades de alto) a la izquierda del borde. La PUNTA del vacio llega a
    // xn9 + r9*(1/capAn - 1) (~0.7*r9), por eso con 0.12 asomaban ~100px mientras hit > 0.001.
    float xOff = -0.5 * u_res.x / u_res.y - 0.8;
    float xn9 = mix(xOff, u_cap.z, u_hit.x);
    vec2 pq = vec2(max(uv.x - (xn9 - r9), 0.0) * u_cap.w, uv.y - u_cap.x);
    float lq = max(length(pq), 0.0001);
    float dv = lq - r9;
    float dpos = max(dv, 0.0);
    float pushE = u_push.x * hitK * exp(-dpos / u_push.y);
    float gdx = (uv.x > xn9 - r9) ? pq.x * u_cap.w / lq : 0.0;
    float gdy = pq.y / lq;
    float kx = 1.0 + pushE / u_push.y * gdx;
    float ky = pushE / u_push.y * gdy;
    float gm = sqrt(kx * kx + ky * ky);
    if (dv < 0.0) { gm = 1.0; }
    float sdf9 = smoothstep(0.0, px * 1.5, dv);
    float edge9 = mix(1.0, sdf9, step(0.001, u_hit.x));
    float floorW = (1.0 - hk) * u_floor;
    vec2 q = uv;
    float refl = 1.0;
    if (uv.y < hor) { q.y = mix(uv.y, 2.0 * hor - uv.y, floorW); refl = mix(1.0, 0.6 * exp(-(hor - uv.y) * 2.0), floorW); }
    q.x -= pushE;
    float period = P0.w;
    float cxp = (q.x - P0.x) / period;
    float ci = floor(cxp);
    float cf = fract(cxp);
    float gap = P1.z;
    float dcol = ci - P1.y;
    float sgm = u_colReach;
    float envc = exp(-(dcol / sgm) * (dcol / sgm));
    float inside = smoothstep(gap * 0.5, gap * 0.5 + 0.02, cf) * (1.0 - smoothstep(1.0 - gap * 0.5 - 0.02, 1.0 - gap * 0.5, cf));
    float xf = clamp((cf - gap * 0.5) / (1.0 - gap), 0.0, 1.0);
    float x = xf * N;
    float id = floor(x) + ci * 53.0;
    float cellpx = u_res.y * period * (1.0 - gap) / N / gm;
    float fx = fract(x);
    float dpx = min(fx, 1.0 - fx) * cellpx;
    float Tm = mix(T, 0.5 * u_thick * cellpx, hk);
    float line = mix(0.45, 1.0 - smoothstep(Tm - 0.6, Tm + 0.6, dpx), smoothstep(2.0, 5.0, cellpx));
    float li = lineInt(id, q.y * 6.0, t0);
    float shade = 0.25 + 0.75 * smoothstep(0.0, 1.0, xf);
    float v = mix(mix(0.40, 0.95, smoothstep(-0.5, 0.5, -q.y)), mix(0.30, 1.0, smoothstep(-0.5, 0.5, q.y * P0.y)), u_floor);
    float vD = mix(0.32, 1.0, exp(-dpos / 0.30));
    v = mix(v, vD, hk);
    float hl = exp(-(1.0 - xf) * period * (1.0 - gap) / (px * 2.5 * T));
    o.x = envc * line * li * shade * inside * v * refl * edge9;
    o.y = (envc * 0.45 * fill * shade + u_core * 0.9 * hl * envc + u_glow * 0.20 * envc) * inside * v * refl * edge9;
    o.y += 0.30 * exp(-abs(uv.y - hor) / (px * 1.33 * T)) * exp(-abs(uv.x) * 1.4) * floorW;
    float rim = exp(-dpos / (px * 2.4 * max(Tm, 1.2)));
    float nose9 = exp(-length(uv - vec2(xn9, u_cap.x)) / 0.35);
    o.y += hk * sdf9 * (0.40 * rim + (0.06 + u_glow * 0.30) * exp(-dpos / 0.07) + 0.9 * u_hit.y * nose9 * exp(-dpos / 0.14));
    float cm = mix(1.0, u_calm, hk);
    o.x *= cm;
    o.y *= cm;
    o.y += hk * (1.0 - sdf9) * u_inner.y * exp(min(dv, 0.0) / 0.12) * cm;
    o.z = hash(id);

  } else {
    // 6. Abanico de esquina (diseno Art Deco): rayos que nacen del borde, reflejo tenue en la esquina opuesta
    float aspect = u_res.x / u_res.y;
    vec2 cA = vec2(0.5 * aspect - P0.x, 0.5 - P0.y);
    vec2 p = uv - cA;
    float fan = fanRays(p, P0.z, N, P1.z);
    vec2 pr = -uv - cA;
    float refl2 = fanRays(pr, P0.z * 0.85, N, P1.z) * P1.y;
    float r = length(p);
    float rr = length(pr);
    float th = atan(-p.y, -p.x);
    float id = floor(th / (1.5707963 / N) + 0.5);
    float gl = exp(-r / 0.22) * (0.12 + u_glow * 0.5);
    float gl2 = exp(-rr / 0.26) * (0.08 + u_glow * 0.3) * P1.y * 1.5;
    float md0 = smoothstep(0.16, 0.96, length(uv));
    md0 = pow(md0, 1.7);
    float md = clamp(mix(1.0, md0, u_midFade), 0.0, 1.0);
    o.x = (fan + refl2) * md * 0.82;
    o.y = (gl + gl2) * 0.85;
    o.z = hash(id);

  }
  if (isP) { dimK *= mix(0.10, 1.0, smoothstep(-0.20, 0.50, uv.x * side)); }
  if (isA) { dimK *= mix(0.08, 1.0, smoothstep(-0.10, 0.60, uv.x)); }
  return o * dimK;
}

void main() {
  vec2 uv = (gl_FragCoord.xy - 0.5 * u_res) / u_res.y - u_mouse;
  float T = u_T;
  float I = 0.0;

  if (T <= 0.0005) {
    vec3 A = scene(u_aM, uv, u_aP0, u_aP1);
    I = A.x + A.y;
  } else if (T >= 0.9995) {
    vec3 B = scene(u_bM, uv, u_bP0, u_bP1);
    I = B.x + B.y;
  } else {
    vec3 A = scene(u_aM, uv, u_aP0, u_aP1);
    vec3 B = scene(u_bM, uv, u_bP0, u_bP1);
    float wAl = 1.0 - smoothstep(A.z * 0.5, A.z * 0.5 + 0.25, T);
    float wBl = smoothstep(0.4 + B.z * 0.35, 0.65 + B.z * 0.35, T);
    float wAb = 1.0 - smoothstep(0.0, 0.6, T);
    float wBb = smoothstep(0.4, 1.0, T);
    I = A.x * wAl + A.y * wAb + B.x * wBl + B.y * wBb;
  }

  I *= u_gain;

  vec3 col = u_c0;
  float sh = 0.5 + 0.5 * sin(uv.x * 2.6 - uv.y * 2.1 + u_time * 0.25 + I * 1.6);
  sh = sh * sh * (3.0 - 2.0 * sh);
  vec3 hi = mix(u_c2 * 0.72, u_c2 * 1.15, sh);
  vec3 pale = mix(u_c3 * 0.88, vec3(1.0), sh * 0.55);
  col = mix(col, u_c1, smoothstep(0.02, 0.45, I));
  col = mix(col, hi, smoothstep(0.35, 0.90, I));
  col = mix(col, pale, smoothstep(0.85, 1.45, I));
  col *= 1.0 - 0.30 * smoothstep(0.35, 1.2, length(uv));

  float g = hash2(floor(gl_FragCoord.xy / 1.6) + 17.0);
  col = max(col + (g - 0.5) * u_grain * (0.55 + 2.7 * max(col.g, col.r)), 0.0);
  gl_FragColor = vec4(col, 1.0);
}`;
