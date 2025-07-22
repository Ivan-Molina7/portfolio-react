import React from 'react';
import useScrollSpy from '../../hooks/useScrollSpy';

// IDs exactos de las secciones que se espiarán
const SECTION_IDS = ['hero', 'proyectos', 'habilidades', 'about', 'contacto'];

function HudNav() {
  const activeIndex = useScrollSpy(SECTION_IDS);




return (
  <div className="hud-secciones">
    {SECTION_IDS.map((id, i) => {
      const isActive = i === activeIndex;
      const className = `circle${isActive ? ' circle--active' : ' circle--inactive'}`;

      return (
        <div
          key={id}
          role="button"
          tabIndex={0}
          aria-label={`Ir a la sección ${id}`}
          className={className}
          onClick={() => {
            const section = document.getElementById(id);
            if (section) {
              section.scrollIntoView({ behavior: 'smooth' });
            }
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              const section = document.getElementById(id);
              if (section) {
                section.scrollIntoView({ behavior: 'smooth' });
              }
            }
          }}
        />
      );
    })}
  </div>
);

}

export default HudNav;
