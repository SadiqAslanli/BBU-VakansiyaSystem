import React, { useState, useEffect } from "react";
import "../Css/header.css";
import { Link } from "react-router-dom";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (menuOpen) {
      document.body.classList.add("menu-open");
    } else {
      document.body.classList.remove("menu-open");
    }

    return () => {
      document.body.classList.remove("menu-open");
    };
  }, [menuOpen]);

  const toggleMenu = () => setMenuOpen(prev => !prev);
  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <header className="header">
        <div className="header-container">
          <div className="logo">
            <img src="https://bbu.edu.az/images/30il.png" alt="BBU Logo" />
            <span className="name">Bakı Biznes Universiteti</span>
          </div>

          <nav className="desktop-nav">
            <Link to="/">Ev</Link>
            <Link to="/uploaded">CV Göndər</Link>
            <Link to="/cv-gonder">Vakansiyalar</Link>
            <Link to="/cv-gonder">Daxil ol</Link>
          </nav>
          <div
            className={`burger ${menuOpen ? "open" : ""}`}
            onClick={toggleMenu}
            aria-label="Menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </header>

      <div
        className={`menu-overlay ${menuOpen ? "show" : ""}`}
        onClick={closeMenu}
      />
      <nav className={`mobile-menu ${menuOpen ? "show" : ""}`}>
        <Link to="/cv-gonder" onClick={closeMenu}>
          CV Göndər
        </Link>
        <Link to="/vakansiyalar" onClick={closeMenu}>
          Vakansiyalar
        </Link>
        <button className="login-btn mobile-btn" onClick={closeMenu}> Daxil ol </button>
      </nav>
    </>
  );
};

export default Header;
