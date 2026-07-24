// src/components/Navbar.tsx
import { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Navbar.css";

const LINKEDIN_URL = "https://www.linkedin.com/in/janire-gonzalez-garayoa";

const Navbar: React.FC = () => {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  return (
    <header className="home-navbar-wrapper">
      <nav 
        className="home-nav" 
        onMouseLeave={() => setActiveDropdown(null)}
      >
        {/* LADO IZQUIERDO: Logo + Categorías */}
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

        {/* LADO DERECHO: Login & Register */}
        <div className="nav-right-container">
          <Link to="/login" className="btn-nav-login">
            Log in
          </Link>
          <Link to="/register" className="btn-nav-signup">
            Sign up
          </Link>
        </div>

        {/* MEGA MENU DESPLEGABLE */}
        <div className={`mega-menu-glass ${activeDropdown ? "open" : ""}`}>
          <div className="mega-menu-header">
            <a href={LINKEDIN_URL} target="_blank" rel="noreferrer" className="discover-link">
              Discover PiggyBank <span className="arrow">→</span>
            </a>
          </div>

          <div className="mega-menu-grid">
            {/* Columna 1 */}
            <div className="mega-col">
              <span className="col-title">Accounts</span>
              <a href={LINKEDIN_URL} target="_blank" rel="noreferrer" className="dropdown-link">
                <span>Bank Account</span> <span className="hover-arrow">→</span>
              </a>
              <a href={LINKEDIN_URL} target="_blank" rel="noreferrer" className="dropdown-link">
                <span>Joint Account</span> <span className="hover-arrow">→</span>
              </a>
              <a href={LINKEDIN_URL} target="_blank" rel="noreferrer" className="dropdown-link">
                <span>Savings Account</span> <span className="hover-arrow">→</span>
              </a>

              <span className="col-title margin-top">Smart Spending</span>
              <a href={LINKEDIN_URL} target="_blank" rel="noreferrer" className="dropdown-link">
                <span>Cards</span> <span className="hover-arrow">→</span>
              </a>
              <a href={LINKEDIN_URL} target="_blank" rel="noreferrer" className="dropdown-link">
                <span>Send & Receive</span> <span className="hover-arrow">→</span>
              </a>
            </div>

            {/* Columna 2 */}
            <div className="mega-col">
              <span className="col-title">Security & Protection</span>
              <a href={LINKEDIN_URL} target="_blank" rel="noreferrer" className="dropdown-link">
                <span>How We Protect Your Money</span> <span className="hover-arrow">→</span>
              </a>
              <a href={LINKEDIN_URL} target="_blank" rel="noreferrer" className="dropdown-link">
                <span>Report Lost Device</span> <span className="hover-arrow">→</span>
              </a>

              <span className="col-title margin-top">Investments</span>
              <a href={LINKEDIN_URL} target="_blank" rel="noreferrer" className="dropdown-link">
                <span>Stocks & Shares</span> <span className="hover-arrow">→</span>
              </a>
              <a href={LINKEDIN_URL} target="_blank" rel="noreferrer" className="dropdown-link">
                <span>Crypto Market</span> <span className="hover-arrow">→</span>
              </a>
            </div>

            {/* Columna 3 */}
            <div className="mega-col">
              <span className="col-title">Connectivity</span>
              <a href={LINKEDIN_URL} target="_blank" rel="noreferrer" className="dropdown-link">
                <span>Mobile Plans</span> <span className="hover-arrow">→</span>
              </a>

              <span className="col-title margin-top">Finances</span>
              <a href={LINKEDIN_URL} target="_blank" rel="noreferrer" className="dropdown-link">
                <span>International Transfers</span> <span className="hover-arrow">→</span>
              </a>

              <span className="col-title margin-top">Help</span>
              <a href={LINKEDIN_URL} target="_blank" rel="noreferrer" className="dropdown-link">
                <span>Contact Us</span> <span className="hover-arrow">→</span>
              </a>
            </div>

            {/* Columna 4 */}
            <div className="mega-col">
              <span className="col-title">Plans</span>
              <a href={LINKEDIN_URL} target="_blank" rel="noreferrer" className="dropdown-link">
                <span>Standard</span> <span className="hover-arrow">→</span>
              </a>
              <a href={LINKEDIN_URL} target="_blank" rel="noreferrer" className="dropdown-link">
                <span>Premium</span> <span className="hover-arrow">→</span>
              </a>
              <a href={LINKEDIN_URL} target="_blank" rel="noreferrer" className="dropdown-link">
                <span>Ultra</span> <span className="hover-arrow">→</span>
              </a>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;