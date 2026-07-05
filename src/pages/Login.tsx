import "../styles/Auth.css";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const [isFocused, setIsFocused] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || isFocused) return;
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    
    const rotateX = -(y / rect.height) * 14; 
    const rotateY = (x / rect.width) * 14;

    card.style.transform = `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
  };

  const handleMouseLeave = () => {
    if (!cardRef.current || isFocused) return;
    cardRef.current.style.transform = `perspective(1200px) rotateX(0deg) rotateY(0deg) translateY(0px)`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const existingUsers = JSON.parse(localStorage.getItem("users") || "[]");
    const user = existingUsers.find((user: any) => user.email === formData.email && user.password === formData.password);
       
    if (user) {
      const sessionData = { id: user.id, name: user.name, email: user.email };
      localStorage.setItem("currentUser", JSON.stringify(sessionData));
      navigate('/dashboard');
    } else {
      alert('Correo electrónico o contraseña incorrectos.');
    }
  };

  return (
    <div className="auth-page-wrapper" onMouseMove={handleMouseMove}>
      <div className="auth-ambient-light light-orb-primary" />
      <div className="auth-ambient-light light-orb-secondary" />
      
      <header className="auth-top-header">
        <div className="auth-brand-logo">The Piggy Bank</div>
      </header>

      <div 
        className={`auth-card-glass rect-wide-layout login-compact-layout ${isFocused ? "card-frozen" : ""}`} 
        ref={cardRef}
        onMouseLeave={handleMouseLeave}
      >
        <form 
          onSubmit={handleSubmit} 
          className="auth-form-layout"
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        >
          <div className="auth-form-header">
            <h2 className="auth-title">Iniciar sesión</h2>
            <p className="auth-subtitle">Introduce tus credenciales para acceder a tu panel de control</p>
          </div>

          <div className="input-group">
            <label>Correo electrónico</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </div>

          <div className="input-group">
            <label>Contraseña</label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
            />
          </div>

          <button type="submit" className="btn-auth-submit-wide">Entrar a mi cuenta</button>
        </form>
      </div>
    </div>
  );
};

export default Login;