// src/pages/Login.tsx
import { useState, FormEvent } from "react";
import { useAuthSession } from "../hooks/useAuthSession";
import { GlassCard3D } from "../components/Auth/GlassCard3D";
import { RememberCheckbox } from "../components/Auth/RememberCheckbox";
import "../styles/Auth.css";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [rememberMe, setRememberMe] = useState(false);
  
  // Extraemos la lógica de persistencia de sesión del Hook personalizado
  const { saveSession } = useAuthSession();

  // Manejar el envío del formulario de inicio de sesión
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const existingUsers = JSON.parse(localStorage.getItem("users") || "[]");
    const user = existingUsers.find(
      (u: any) => u.email === formData.email && u.password === formData.password
    );

    if (user) {
      saveSession(user, rememberMe);
    } else {
      alert("Incorrect email or password.");
    }
  };

  return (
    <GlassCard3D>
      <form onSubmit={handleSubmit} className="auth-form-layout">
        {/* Cabecera del formulario */}
        <div className="auth-form-header">
          <h2 className="auth-title">Log in</h2>
          <p className="auth-subtitle">Enter your credentials to access your dashboard</p>
        </div>

        {/* Campo de correo electrónico */}
        <div className="input-group">
          <label>Email address</label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />
        </div>

        {/* Campo de contraseña */}
        <div className="input-group">
          <label>Password</label>
          <input
            type="password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            required
          />
        </div>

        {/* Subcomponente de recordar sesión */}
        <RememberCheckbox checked={rememberMe} onChange={setRememberMe} />

        {/* Botón principal de acceso */}
        <button type="submit" className="btn-auth-submit-wide">
          Sign in to my account
        </button>
      </form>
    </GlassCard3D>
  );
};

export default Login;