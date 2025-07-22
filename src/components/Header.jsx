import React, { useState, useEffect, useRef } from 'react';
import logoWhite from '../assets/img/Logos/Logo_white.png';
import { Link } from 'react-router-dom';
import { HashLink as LinkSmooth } from 'react-router-hash-link';

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const navRef = useRef(null);
  const hamMenuRef = useRef(null);

  // Toggle menú hamburguesa
  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  // Cerrar menú si el clic es afuera del nav o del botón hamburguesa
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        isOpen &&
        navRef.current &&
        hamMenuRef.current &&
        !navRef.current.contains(event.target) &&
        !hamMenuRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <header className="header">
      <Link to="/" className="header__thumbnail">
        <img src={logoWhite} alt="Logo" className="header__logo" />
      </Link>

      <nav className={`nav${isOpen ? ' open' : ''}`} ref={navRef}>
        <ul className="nav__list">
          <li className="nav__item">
            <LinkSmooth smooth to="/proyecto#hero" className="nav__link" data-section="header" data-value="proyectos">
              Proyectos
            </LinkSmooth>
          </li>
          <li className="nav__item">
            <LinkSmooth  smooth to="/#habilidades" className="nav__link" data-section="header" data-value="habilidades">
              Habilidades
            </LinkSmooth>
          </li>
          <li className="nav__item">
            <LinkSmooth smooth  to="/#about" className="nav__link" data-section="header" data-value="sobreMi">
              Sobre mi
            </LinkSmooth>
          </li>
          <li className="nav__item">
            <LinkSmooth  smooth to="/#contacto" className="nav__link" data-section="header" data-value="contacto">
              Contacto
            </LinkSmooth>
          </li>
        </ul>
      </nav>

      <div
        className={`ham-menu${isOpen ? ' open' : ''}`}
        onClick={toggleMenu}
        ref={hamMenuRef}
        role="button"
        tabIndex={0}
        aria-label="Abrir menú"
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') toggleMenu();
        }}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>

      <a href="#contacto" className="header__btn btn" data-section="header" data-value="btnContacto">
        Contacto
      </a>
    </header>
  );
}

export default Header;
