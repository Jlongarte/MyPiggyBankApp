import "../styles/Auth.css";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    lastName: "",
    email: "",
    address: {
      street: "",
      city: "",
      postCode: "",
      country: "",
    },
    phoneNumber: "",
    password: "",
  });

  const [isFocused, setIsFocused] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || isFocused) return; // Si hay foco, congelamos la tarjeta
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
    const userExists = existingUsers.some((user: any) => user.email === formData.email);
    if (userExists) {
      alert('Este correo electrónico ya está registrado.');
      return;
    }
    const newUser = { id: Date.now().toString(), ...formData };
    existingUsers.push(newUser);
    localStorage.setItem('users', JSON.stringify(existingUsers));
    alert('¡Registro completado con éxito! Ahora puedes iniciar sesión.');
    navigate('/login');
  };

  return (
    <div className="auth-page-wrapper" onMouseMove={handleMouseMove}>
      <div className="auth-ambient-light light-orb-primary" />
      <div className="auth-ambient-light light-orb-secondary" />
      
      <header className="auth-top-header">
        <div className="auth-brand-logo">The Piggy Bank</div>
      </header>

      <div 
        className={`auth-card-glass rect-wide-layout ${isFocused ? "card-frozen" : ""}`} 
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
            <h2 className="auth-title">Crear una cuenta</h2>
            <p className="auth-subtitle">Rellena el formulario rectangular para darte de alta en el sistema bancario</p>
          </div>

          <div className="form-grid-dual">
            <div className="input-group">
              <label>Nombre</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>
            <div className="input-group">
              <label>Apellidos</label>
              <input
                type="text"
                value={formData.lastName}
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="form-grid-dual">
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
              <label>Teléfono móvil</label>
              <input
                type="tel"
                value={formData.phoneNumber}
                onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                required
              />
            </div>
          </div>

          <fieldset className="form-address-fieldset">
            <legend>Dirección de residencia</legend>
            
            <div className="form-address-row">
              <div className="input-group street-field">
                <label>Calle y Número</label>
                <input
                  type="text"
                  value={formData.address.street}
                  onChange={(e) => setFormData({ ...formData, address: { ...formData.address, street: e.target.value } })}
                  required
                />
              </div>
            </div>

            <div className="form-grid-triple-wide">
              <div className="input-group">
                <label>Ciudad</label>
                <input
                  type="text"
                  value={formData.address.city}
                  onChange={(e) => setFormData({ ...formData, address: { ...formData.address, city: e.target.value } })}
                  required
                />
              </div>
              <div className="input-group">
                <label>Código Postal</label>
                <input
                  type="text"
                  value={formData.address.postCode}
                  onChange={(e) => setFormData({ ...formData, address: { ...formData.address, postCode: e.target.value } })}
                  required
                />
              </div>
              <div className="input-group">
                <label>País</label>
                <input
                  type="text"
                  value={formData.address.country}
                  onChange={(e) => setFormData({ ...formData, address: { ...formData.address, country: e.target.value } })}
                  required
                />
              </div>
            </div>
          </fieldset>

          <div className="form-footer-action">
            <div className="input-group pass-field-container">
              <label>Contraseña de acceso</label>
              <input
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
              />
            </div>
            <button type="submit" className="btn-auth-submit-wide">Registrarme ahora</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;