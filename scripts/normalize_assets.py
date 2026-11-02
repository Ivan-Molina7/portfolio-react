#!/usr/bin/env python3
"""
Normaliza los assets del portfolio para el rediseño (un solo uso, no es parte del build del sitio).

  pip install pillow
  python scripts/normalize_assets.py --src assets-src --out src/assets/img/_norm

Genera (todo .webp, con transparencia donde corresponde):
  _norm/icons/<clave>-g.webp   iconos de herramientas en gris   (128x128, contenidos en 112)
  _norm/icons/<clave>-c.webp   iconos de herramientas en color  (128x128, contenidos en 112)
  _norm/logos/<clave>.webp     logos de proyectos (gris), recortados y acotados a 300x150 (170x170 los redondos)
  _norm/about/<clave>.webp     imagenes de la linea de tiempo (160x160). iti sale SIN fondo blanco.
  _norm/shots/<proy>-<n>.webp  capturas de proyectos, 1000 px de ancho
  _norm/social/<red>.webp      iconos de redes, 72x72

Si un archivo de origen no existe, lo informa y sigue (no inventa nada).
"""
import argparse, io, os, sys
from PIL import Image, ImageDraw

def save_webp(im, path, q=88):
    os.makedirs(os.path.dirname(path), exist_ok=True)
    im.save(path, 'WEBP', quality=q, method=6)
    return os.path.getsize(path)

def trim(im):
    bb = im.split()[-1].getbbox()
    return im.crop(bb) if bb else im

def contain(im, box_w, box_h, upscale=False):
    w, h = im.size
    k = min(box_w / w, box_h / h)
    if not upscale:
        k = min(k, 1.0)
    return im.resize((max(1, round(w * k)), max(1, round(h * k))), Image.LANCZOS)

def on_canvas(im, size):
    out = Image.new('RGBA', (size, size), (0, 0, 0, 0))
    out.alpha_composite(im, ((size - im.size[0]) // 2, (size - im.size[1]) // 2))
    return out

def open_rgba(path):
    return Image.open(path).convert('RGBA')

def find(src, folder, names):
    for n in names:
        p = os.path.join(src, folder, n)
        if os.path.exists(p):
            return p
    return None

# clave -> (archivo gris, archivo color)
TOOLS = {
    'html': ('html.png', 'html.png'), 'css': ('css.png', 'css.png'), 'js': ('js.png', 'js.png'),
    'react': ('react.webp', 'react.webp'), 'sass': ('sass.png', 'sass.png'),
    'tailwind': ('Tailwind-G.png', 'Tailwind.png'), 'bootstrap': ('bootstrap.png', 'bootstrap.png'),
    'node': ('node.png', 'node.png'), 'mongo': ('mongo.png', 'mongo.png'), 'supabase': ('supabase.png', 'supabase.png'),
    'tanstack': ('tanstack-G.png', 'tanstack.png'), 'zustand': ('Zustand-G.png', 'Zustand.png'),
    'claude': ('Claude-G.png', 'Claude.png'), 'github': ('github.png', None), 'wordpress': ('wordpress.webp', 'wordpress.webp'),
    'woo': ('woo.png', 'woo.png'), 'figma': ('figma.png', 'figma.png'), 'ps': ('ps.png', 'ps.png'), 'ai': ('ai.png', 'ai.png'),
}
LOGOS = {  # clave -> (archivo, caja max w, caja max h)
    'tuy': ('transportes-G.png', 300, 150), 'nbc': ('NBC.png', 300, 150), 'wu': ('WakeUp-G.png', 170, 170),
    'gap': ('CAP.png', 300, 150), 'sandbox': ('Sandbox.png', 170, 170), 'havanna': ('Havanna.png', 300, 150),
    'culpadel': ('CulPadel.png', 300, 150), 'worldgym': ('WorldGym.png', 300, 150),
}
ABOUT = {'iti': 'iti.png', 'bios': 'bios.png', 'ort': 'ort.png', 'udemy': 'Udemy.webp'}
SHOTS = {  # clave -> (carpeta en proyectos/, nombres sin extension en orden; Home primero)
    'nbc': ('Nbc', ['Home', '2', '3']), 'gap': ('Progreso', ['Home', 'directiva', 'noticias']),
    'havanna': ('Havanna', ['Home', '2', '3']), 'culpadel': ('culPadel', ['Home', '2', '3']),
    'sandbox': ('Sandbox', ['Home', '2', 'e']), 'worldgym': ('worldGym', ['Home', '2']),
}  # sin carpeta de capturas: tuy, wu, ft (Facu Trainer), ms (MegaStrong)
SOCIAL = ['github', 'behance', 'linkedin']

def remove_white_bg(im, thresh=38):
    """Quita el blanco conectado a los bordes (no toca blancos interiores del logo)."""
    rgb = im.convert('RGB')
    mag = (255, 0, 255)
    for xy in [(0, 0), (rgb.width - 1, 0), (0, rgb.height - 1), (rgb.width - 1, rgb.height - 1)]:
        ImageDraw.floodfill(rgb, xy, mag, thresh=thresh)
    px, out = rgb.load(), im.copy()
    op = out.load()
    for y in range(rgb.height):
        for x in range(rgb.width):
            if px[x, y] == mag:
                op[x, y] = (0, 0, 0, 0)
    return trim(out)

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--src', default='assets-src')  # originales fuera de src/ para que el build no los cargue
    ap.add_argument('--out', default='src/assets/img/_norm')
    a = ap.parse_args()
    total, missing = 0, []

    for key, (g, c) in TOOLS.items():
        for suffix, fname in (('g', g), ('c', c or g)):
            p = find(a.src, 'habilidades', [fname]) if suffix == 'g' else (
                find(a.src, 'habilidades/LogoColores', [fname]) if c else find(a.src, 'habilidades', [fname]))
            if not p:
                missing.append(f'icons/{key}-{suffix} <- {fname}'); continue
            im = on_canvas(contain(trim(open_rgba(p)), 112, 112, upscale=True), 128)
            total += save_webp(im, os.path.join(a.out, 'icons', f'{key}-{suffix}.webp'))

    for key, (fname, bw, bh) in LOGOS.items():
        p = find(a.src, 'LogosProyectos', [fname])
        if not p: missing.append(f'logos/{key} <- {fname}'); continue
        total += save_webp(contain(trim(open_rgba(p)), bw, bh), os.path.join(a.out, 'logos', f'{key}.webp'))

    for key, fname in ABOUT.items():
        p = find(a.src, 'about', [fname])
        if not p: missing.append(f'about/{key} <- {fname}'); continue
        im = open_rgba(p)
        if key == 'iti':
            total += save_webp(remove_white_bg(im), os.path.join(a.out, 'about', 'iti.webp'), 90)
        else:
            total += save_webp(im.resize((160, 160), Image.LANCZOS), os.path.join(a.out, 'about', f'{key}.webp'))

    for proj, (folder, names) in SHOTS.items():
        for i, n in enumerate(names, 1):
            p = find(a.src, f'proyectos/{folder}', [f'{n}.webp', f'{n}.png', f'{n}.jpg'])
            if not p: missing.append(f'shots/{proj}-{i} <- {folder}/{n}'); continue
            im = Image.open(p).convert('RGB')
            k = min(1.0, 1000 / im.size[0])
            im = im.resize((round(im.size[0] * k), round(im.size[1] * k)), Image.LANCZOS)
            total += save_webp(im, os.path.join(a.out, 'shots', f'{proj}-{i}.webp'), 76)

    for red in SOCIAL:
        p = find(a.src, 'Icons/White', [f'{red}.png'])
        if not p: missing.append(f'social/{red}'); continue
        im = on_canvas(contain(trim(open_rgba(p)), 60, 60, upscale=True), 72)
        total += save_webp(im, os.path.join(a.out, 'social', f'{red}.webp'))

    print(f'Listo. Peso total generado: {total // 1024} KB en {a.out}')
    if missing:
        print('NO se encontraron (revisar, no se generaron):')
        for m in missing: print('  -', m)
        sys.exit(0)

if __name__ == '__main__':
    main()
