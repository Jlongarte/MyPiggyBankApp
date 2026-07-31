// src/components/Navbar.tsx
import { useState } from "react";
import { Link } from "react-router-dom";
import { MegaMenuContent } from "./MegaMenuContent";
import "../../styles/Navbar.css";

const Navbar: React.FC = () => {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  return (
    <header className="home-navbar-wrapper">
      <nav 
        className="home-nav" 
        onMouseLeave={() => setActiveDropdown(null)}
      >
        {/* Lado izquierdo: Logo + Categorías de navegación */}
        <div className="nav-left-container">
          <Link to="/" className="nav-logo-link">
            <img src="/logo.png" alt="ThePiggyBank Logo" className="home-logo" />
          </Link>

          <ul className="nav-links-menu">
            <li 
              onMouseEnter={() => setActiveDropdown("personal")}
              className={`nav-item-tab ${activeDropdown === "personal" ? "active" : ""}`}
            >
              <span>Personal</span>
            </li>
            <li 
              onMouseEnter={() => setActiveDropdown("business")}
              className={`nav-item-tab ${activeDropdown === "business" ? "active" : ""}`}
            >
              <span>Business</span>
            </li>
            <li 
              onMouseEnter={() => setActiveDropdown("company")}
              className={`nav-item-tab ${activeDropdown === "company" ? "active" : ""}`}
            >
              <span>Company</span>
            </li>
          </ul>
        </div>

        {/* Lado derecho: Acciones de autenticación */}
        <div className="nav-right-container">
          <Link to="/login" className="btn-nav-login">
            Log in
          </Link>
          <Link to="/register" className="btn-nav-signup">
            Sign up
          </Link>
        </div>

        {/* Mega menú desplegable encapsulado */}
        <div className={`mega-menu-glass ${activeDropdown ? "open" : ""}`}>
          <MegaMenuContent />
        </div>
      </nav>
    </header>
  );
};

export default Navbar;