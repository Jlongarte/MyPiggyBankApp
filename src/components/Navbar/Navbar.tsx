import "./Navbar.css";
import { Link } from "react-router-dom";


const Navbar: React.FC = () => {
  return (
    <nav>
      <ul className="nav-section">
        <li><img src="/logo.png" alt="Logo" className="logo" /></li>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/crypto">Crypto Market</Link></li>
        <li><Link to="/services">Services</Link></li>
        <li><Link to="/">Contact</Link></li>
      </ul>
      <ul className="nav-section">
        <li><Link to="/login">Login</Link></li>
        <li><Link to="/register">Sign Up</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;