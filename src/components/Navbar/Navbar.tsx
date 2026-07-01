import "./Navbar.css";


const Navbar: React.FC = () => {
  return (
    <nav>
      <ul className="nav-section">
        <li><img src="/logo.png" alt="Logo" className="logo" /></li>
        <li><a href="#">Home</a></li>
        <li><a href="#">About</a></li>
        <li><a href="#">Services</a></li>
        <li><a href="#">Contact</a></li>
      </ul>
      <ul className="nav-section">
        <li><a href="#">Login</a></li>
        <li><a href="#">Sign Up</a></li>
      </ul>
    </nav>
  );
};

export default Navbar;