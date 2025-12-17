import React, { useEffect, useState } from "react";
import "./Nav.css";

const Nav: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);

/**
 * Scrolls smoothly to a target element on the page by its ID.
 * @param id - The ID of the element to scroll to
 * @returns void
 */
  const scrollToSection = (id: string) => {
    const target = document.getElementById(id);
    if (!target) return;
    target.scrollIntoView({ behavior: "smooth", block: "start" });
    setMenuOpen(false);
  };

  useEffect(() => {
    /**
     * Handles document click events to close the navigation menu when clicking outside of it.
     * 
     * @param e - The mouse event triggered by a document click
     * @remarks
     * This function checks if the menu is open and if the click target is outside the navigation element.
     * If both conditions are true, it closes the menu by setting menuOpen to false.
     */
    const onDocClick = (e: MouseEvent) => {
      const nav = document.querySelector(".arcana-nav");
      if (!nav) return;
      if (menuOpen && e.target instanceof Node && !nav.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, [menuOpen]);

  return (
    <nav className="arcana-nav">
      <div className="arcana-nav-inner">
        <button
          className="nav-logo"
          onClick={() => scrollToSection("home")}
          aria-label="Go to home"
        >
          <img src="./images/ArcanaLogo.png" alt="Arcana Code Forges logo" />
        </button>

        <div className="nav-links desktop-only">
          <button className="nav-link" onClick={() => scrollToSection("home")}>
            Home
          </button>
          <button
            className="nav-link"
            onClick={() => scrollToSection("services")}
          >
            Services
          </button>
          <button
            className="nav-link"
            onClick={() => scrollToSection("techstack")}
          >
            Tech Stack
          </button>
          <button
            className="nav-link"
            onClick={() => scrollToSection("origins")}
          >
            Origins
          </button>
          <button
            className="nav-link"
            onClick={() => scrollToSection("portfolio")}
          >
            Portfolio
          </button>
        </div>

        <button
          className="hamburger mobile-only"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
          aria-controls="arcana-mobile-menu"
        >
          <span className={`hamburger-line ${menuOpen ? "open" : ""}`} />
          <span className={`hamburger-line ${menuOpen ? "open" : ""}`} />
          <span className={`hamburger-line ${menuOpen ? "open" : ""}`} />
        </button>
      </div>

      <div
        id="arcana-mobile-menu"
        className={`mobile-menu ${menuOpen ? "open" : ""}`}
      >
        <button className="mobile-link" onClick={() => scrollToSection("home")}>
          Home
        </button>
        <button
          className="mobile-link"
          onClick={() => scrollToSection("services")}
        >
          Services
        </button>
        <button
          className="mobile-link"
          onClick={() => scrollToSection("techstack")}
        >
          Tech Stack
        </button>
        <button
          className="mobile-link"
          onClick={() => scrollToSection("origins")}
        >
          Origins
        </button>
        <button
          className="mobile-link"
          onClick={() => scrollToSection("portfolio")}
        >
          Portfolio
        </button>
      </div>
    </nav>
  );
};

export default Nav;
