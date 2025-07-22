import { useState, useLayoutEffect, useEffect } from 'react';

const useScrollSpy = (sectionIds) => {
  const [activeSectionIndex, setActiveSectionIndex] = useState(-1);

  useLayoutEffect(() => {
    if (!sectionIds || sectionIds.length === 0) return;

const updateActiveSection = () => {
  const sections = sectionIds.map((id) => document.getElementById(id));
  let closestIndex = -1; // por defecto ninguno activo
  const windowHeight = window.innerHeight;
  const windowCenter = windowHeight / 2;
  let minDistance = Infinity;

  sections.forEach((section, i) => {
    if (!section) return;
    const rect = section.getBoundingClientRect();

    // Ignorar secciones que están muy abajo
    if (rect.bottom < 100) return;

    const sectionCenter = rect.top + rect.height / 2;
    const distance = Math.abs(windowCenter - sectionCenter);
    if (distance < minDistance) {
      minDistance = distance;
      closestIndex = i;
    }
  });

  // Nueva lógica: evitar activar la primera sección si el scroll está por debajo de cierto umbral
  if (window.scrollY < 50 && closestIndex === 0) {
    setActiveSectionIndex(-1); // no activar ninguna sección al inicio
  } else {
    setActiveSectionIndex(closestIndex);
  }
};



    window.addEventListener('scroll', updateActiveSection);
    window.addEventListener('resize', updateActiveSection);
    updateActiveSection();

    return () => {
      window.removeEventListener('scroll', updateActiveSection);
      window.removeEventListener('resize', updateActiveSection);
    };
  }, [sectionIds]);

  return activeSectionIndex;
};

export default useScrollSpy;
