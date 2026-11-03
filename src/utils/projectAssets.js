// Datos de apoyo de la página /proyecto/:id. projectsData.js sigue siendo la fuente de textos y links;
// acá se resuelven las capturas, los logos y los íconos desde assets.js (versiones normalizadas).
import { ICONS, LOGOS, SHOTS } from './assets';

// Orden de anterior/siguiente: el de la galería (los 10 proyectos).
// Facu Trainer, Transportes UY, NBC Cargo, Wake Up, Progreso, Sandbox, Havanna, CulPadel, WorldGym, MegaStrong.
export const PROJECT_ORDER = [9, 7, 2, 8, 1, 6, 3, 4, 5, 10];

// id de projectsData -> clave en SHOTS / LOGOS. Sin entrada = sin captura ni logo todavía.
const ASSET_KEY = { 1: 'gap', 2: 'nbc', 3: 'havanna', 4: 'culpadel', 5: 'worldgym', 6: 'sandbox', 7: 'tuy', 8: 'wu', 9: 'ft', 10: 'ms' };

// Iniciales para los proyectos sin logo. Hoy todos tienen logo; queda para cuando se sume uno sin él.
export const INITIALS = {};

export const shotsOf = (id) => (ASSET_KEY[id] && SHOTS[ASSET_KEY[id]]) || [];
export const logoOf = (id) => (ASSET_KEY[id] && LOGOS[ASSET_KEY[id]]) || null;

// Nombre de tecnología (alt en projectsData) -> clave de ICONS. Las que no están acá se listan como texto.
const TECH_ICON = {
  HTML: 'html', CSS: 'css', JavaScript: 'js', React: 'react', Sass: 'sass', SCSS: 'sass',
  Tailwind: 'tailwind', bootstrap: 'bootstrap', 'Node.js': 'node', MongoDB: 'mongo',
  Supabase: 'supabase', 'TanStack Query': 'tanstack', Zustand: 'zustand', 'Claude AI': 'claude',
  GitHub: 'github', Figma: 'figma', Photoshop: 'ps', Illustrator: 'ai',
  'Next.js': 'next', Vite: 'vite', Netlify: 'netlify', 'shadcn/ui': 'shadcn', TypeScript: 'typescript',
};
export const techIcon = (name) => (TECH_ICON[name] ? ICONS[TECH_ICON[name]].gray : null);
