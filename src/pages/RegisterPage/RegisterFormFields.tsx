import { ChangeEvent } from "react";
import { Link } from "react-router-dom";

interface RegisterFormFieldsProps {
  formData: any;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onAddressChange: (field: string, value: string) => void;
}

export const RegisterFormFields = ({ formData, onChange, onAddressChange }: RegisterFormFieldsProps) => {
  return (
    <>
      {/* Fila 1: Nombre y Apellidos */}
      <div className="form-grid-dual">
        <div className="input-group">
          <label>First name</label>
          <input
            type="text"
            name="name"
            placeholder="John"
            value={formData.name}
            onChange={onChange}
            required
          />
        </div>
        <div className="input-group">
          <label>Last name</label>
          <input
            type="text"
            name="lastName"
            placeholder="Doe"
            value={formData.lastName}
            onChange={onChange}
            required
          />
        </div>
      </div>

      {/* Fila 2: Email y Teléfono */}
      <div className="form-grid-dual">
        <div className="input-group">
          <label>Email address</label>
          <input
            type="email"
            name="email"
            placeholder="mail@example.com"
            value={formData.email}
            onChange={onChange}
            required
          />
        </div>
        <div className="input-group">
          <label>Mobile phone</label>
          <input
            type="tel"
            name="phoneNumber"
            placeholder="+1 555 000 000"
            value={formData.phoneNumber}
            onChange={onChange}
            required
          />
        </div>
      </div>

      {/* Fila 3: Dirección de residencia */}
      <fieldset className="form-address-fieldset">
        <legend>Residential Address</legend>
        <div className="form-grid-address-quad">
          <div className="input-group">
            <label>Street & Number</label>
            <input
              type="text"
              placeholder="Main Ave 123"
              value={formData.address.street}
              onChange={(e) => onAddressChange("street", e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label>City</label>
            <input
              type="text"
              placeholder="New York"
              value={formData.address.city}
              onChange={(e) => onAddressChange("city", e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label>Postal Code</label>
            <input
              type="text"
              placeholder="10001"
              value={formData.address.postCode}
              onChange={(e) => onAddressChange("postCode", e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label>Country</label>
            <input
              type="text"
              placeholder="United States"
              value={formData.address.country}
              onChange={(e) => onAddressChange("country", e.target.value)}
              required
            />
          </div>
        </div>
      </fieldset>

      {/* Fila 4: Contraseña y Botón de Envío */}
      <div className="form-footer-action">
        <div className="input-group">
          <label>Password</label>
          <input
            type="password"
            name="password"
            placeholder="••••••••"
            value={formData.password}
            onChange={onChange}
            required
          />
        </div>
        <button type="submit" className="btn-auth-submit-wide">
          Create account
        </button>
      </div>

      {/* Enlace de redirección a Login */}
      <div className="auth-footer-link-box">
        <span>Already have an account? </span>
        <Link to="/login" className="auth-redirect-link">
          Log in
        </Link>
      </div>
    </>
  );
};