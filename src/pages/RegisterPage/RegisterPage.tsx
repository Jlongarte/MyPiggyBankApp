// src/pages/RegisterPage.tsx
import { useState, ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { GlassCard3D } from "../../components/Auth/GlassCard3D";
import { RegisterFormFields } from "./RegisterFormFields";
import "../../styles/Auth.css";

export const RegisterPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    password: "",
    address: {
      street: "",
      city: "",
      postCode: "",
      country: "",
    },
  });

  const [error, setError] = useState<string | null>(null);

  // Manejador genérico para campos de texto planos
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Manejador específico para actualizar las propiedades del objeto de dirección
  const handleAddressChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      address: {
        ...prev.address,
        [field]: value,
      },
    }));
  };

  // Manejar el envío del formulario y registro en localStorage
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    const existingUsers = JSON.parse(localStorage.getItem("users") || "[]");
    const userExists = existingUsers.some(
      (user: any) => user.email === formData.email
    );

    if (userExists) {
      setError("An account with this email address already exists.");
      return;
    }

    const newUser = {
      id: Date.now().toString(),
      ...formData,
    };

    localStorage.setItem("users", JSON.stringify([...existingUsers, newUser]));
    alert("Registration completed successfully! You can now log in.");
    navigate("/login");
  };

  return (
    <div className="auth-page-wrapper">
      {/* Luces ambientales de fondo */}
      <div className="auth-ambient-light light-orb-primary" />
      <div className="auth-ambient-light light-orb-secondary" />

      {/* Cabecera superior con marca */}
      <div className="auth-top-header">
        <div className="auth-brand-logo">The Piggy Bank</div>
      </div>

      <GlassCard3D>
        <form onSubmit={handleSubmit} className="auth-form-layout">
          {/* Cabecera del formulario */}
          <div className="auth-form-header">
            <h2 className="auth-title">Create an account</h2>
            <p className="auth-subtitle">
              Enter your details to sign up for The Piggy Bank
            </p>
          </div>

          {error && <div className="register-error-banner">{error}</div>}

          {/* Componente de campos encapsulado */}
          <RegisterFormFields
            formData={formData}
            onChange={handleChange}
            onAddressChange={handleAddressChange}
          />
        </form>
      </GlassCard3D>
    </div>
  );
};

export default RegisterPage;