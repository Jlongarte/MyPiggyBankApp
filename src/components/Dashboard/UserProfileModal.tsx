// src/components/Dashboard/UserProfileModal.tsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface UserProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUserUpdated: () => void;
}

type ModalTab = "datos" | "ajustes";

export const UserProfileModal = ({ isOpen, onClose, onUserUpdated }: UserProfileModalProps) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<ModalTab>("datos");

  // Datos del usuario
  const [userData, setUserData] = useState<any>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

  // Estados para el cambio de contraseña
  const [passwords, setPasswords] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: ""
  });
  const [passError, setPassError] = useState<string | null>(null);
  const [passSuccess, setPassSuccess] = useState<boolean>(false);

  useEffect(() => {
    if (isOpen) {
      const current = JSON.parse(localStorage.getItem("currentUser") || "{}");
      const users = JSON.parse(localStorage.getItem("users") || "[]");
      const fullUser = users.find((u: any) => u.email === current.email) || current;

      setUserData(fullUser);
      setAvatarPreview(fullUser.avatar || null);
      setActiveTab("datos");
      setPasswords({ oldPassword: "", newPassword: "", confirmPassword: "" });
      setPassError(null);
      setPassSuccess(false);
    }
  }, [isOpen]);

  if (!isOpen || !userData) return null;

  // Subida de foto en Base64
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setAvatarPreview(base64String);
        setUserData({ ...userData, avatar: base64String });
      };
      reader.readAsDataURL(file);
    }
  };

  // Guardar cambios generales de usuario (teléfono, dirección, foto, etc.)
  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateUserInStorage(userData);
    onUserUpdated();
    alert("¡Perfil actualizado con éxito!");
    onClose();
  };

  // Cambio seguro de contraseña
  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    setPassError(null);
    setPassSuccess(false);

    // 1. Validar contraseña antigua
    if (passwords.oldPassword !== userData.password) {
      setPassError("La contraseña antigua no es correcta.");
      return;
    }

    // 2. Validar que coincidan la nueva y la confirmación
    if (passwords.newPassword !== passwords.confirmPassword) {
      setPassError("La nueva contraseña y su confirmación no coinciden.");
      return;
    }

    if (passwords.newPassword.length < 4) {
      setPassError("La nueva contraseña debe tener al menos 4 caracteres.");
      return;
    }

    // 3. Actualizar contraseña
    const updatedUser = { ...userData, password: passwords.newPassword };
    setUserData(updatedUser);
    updateUserInStorage(updatedUser);

    setPassSuccess(true);
    setPasswords({ oldPassword: "", newPassword: "", confirmPassword: "" });
  };

  // Helper para guardar en localStorage
  const updateUserInStorage = (userToSave: any) => {
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const updatedUsers = users.map((u: any) => (u.email === userToSave.email ? userToSave : u));
    localStorage.setItem("users", JSON.stringify(updatedUsers));

    localStorage.setItem(
      "currentUser",
      JSON.stringify({
        id: userToSave.id,
        name: userToSave.name,
        lastName: userToSave.lastName,
        email: userToSave.email,
        avatar: userToSave.avatar
      })
    );
  };

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    localStorage.removeItem("sessionExpiration");
    navigate("/login");
  };

  return (
    <div className="modal-backdrop-glass" onClick={onClose}>
      <div className="profile-modal-card" onClick={(e) => e.stopPropagation()}>
        
        {/* CABECERA CON TABS */}
        <div className="modal-header">
          <div className="modal-tabs-pill">
            <button
              className={`modal-tab-btn ${activeTab === "datos" ? "active" : ""}`}
              onClick={() => setActiveTab("datos")}
            >
              📋 Datos de la cuenta
            </button>
            <button
              className={`modal-tab-btn ${activeTab === "ajustes" ? "active" : ""}`}
              onClick={() => setActiveTab("ajustes")}
            >
              ⚙️ Ajustes de la cuenta
            </button>
          </div>
          <button className="btn-close-modal" onClick={onClose}>✕</button>
        </div>

        {/* ---------------- PESTAÑA 1: DATOS DE LA CUENTA (SOLO LECTURA) ---------------- */}
        {activeTab === "datos" && (
          <div className="profile-tab-content">
            <div className="avatar-upload-container">
              <div className="avatar-circle-large">
                {avatarPreview ? (
                  <img src={avatarPreview} alt="Perfil" className="avatar-img-full" />
                ) : (
                  <span className="avatar-initials-large">
                    {userData.name?.[0]}{userData.lastName?.[0]}
                  </span>
                )}
              </div>
            </div>

            <div className="readonly-data-grid">
              <div className="readonly-item">
                <span className="readonly-label">Nombre completo</span>
                <span className="readonly-value">{userData.name} {userData.lastName}</span>
              </div>

              <div className="readonly-item">
                <span className="readonly-label">Correo electrónico</span>
                <span className="readonly-value">{userData.email}</span>
              </div>

              <div className="readonly-item">
                <span className="readonly-label">Teléfono móvil</span>
                <span className="readonly-value">{userData.phoneNumber || "No especificado"}</span>
              </div>

              <div className="readonly-item">
                <span className="readonly-label">Dirección</span>
                <span className="readonly-value">
                  {userData.address?.street
                    ? `${userData.address.street}, ${userData.address.city || ""} (${userData.address.country || ""})`
                    : "No especificada"}
                </span>
              </div>
            </div>

            <div className="profile-modal-actions single-right">
              <button type="button" className="btn-logout" onClick={handleLogout}>
                Cerrar sesión
              </button>
            </div>
          </div>
        )}

        {/* ---------------- PESTAÑA 2: AJUSTES DE LA CUENTA (EDITABLE Y CONTRASEÑA) ---------------- */}
        {activeTab === "ajustes" && (
          <div className="profile-tab-content">
            {/* EDICIÓN DE PERFIL Y FOTO */}
            <form onSubmit={handleSaveProfile} className="profile-modal-form">
              <div className="avatar-upload-container">
                <div className="avatar-circle-large">
                  {avatarPreview ? (
                    <img src={avatarPreview} alt="Perfil" className="avatar-img-full" />
                  ) : (
                    <span className="avatar-initials-large">
                      {userData.name?.[0]}{userData.lastName?.[0]}
                    </span>
                  )}
                </div>
                <label htmlFor="avatar-file-input" className="btn-change-photo">
                  Cambiar foto de perfil
                </label>
                <input
                  id="avatar-file-input"
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  style={{ display: "none" }}
                />
              </div>

              <div className="form-grid-dual">
                <div className="input-group-sm">
                  <label>Nombre</label>
                  <input
                    type="text"
                    value={userData.name || ""}
                    onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                    required
                  />
                </div>
                <div className="input-group-sm">
                  <label>Apellidos</label>
                  <input
                    type="text"
                    value={userData.lastName || ""}
                    onChange={(e) => setUserData({ ...userData, lastName: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="input-group-sm">
                <label>Teléfono</label>
                <input
                  type="tel"
                  value={userData.phoneNumber || ""}
                  onChange={(e) => setUserData({ ...userData, phoneNumber: e.target.value })}
                />
              </div>

              <button type="submit" className="btn-save-profile-sm">
                Guardar perfil
              </button>
            </form>

            <hr className="modal-divider" />

            {/* SECCIÓN CAMBIAR CONTRASEÑA */}
            <form onSubmit={handleChangePassword} className="change-pass-form">
              <h4 className="section-title-sm">Cambiar contraseña</h4>

              {passError && <div className="pass-alert error">{passError}</div>}
              {passSuccess && <div className="pass-alert success">¡Contraseña actualizada correctamente!</div>}

              <div className="input-group-sm">
                <label>Contraseña antigua</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={passwords.oldPassword}
                  onChange={(e) => setPasswords({ ...passwords, oldPassword: e.target.value })}
                  required
                />
              </div>

              <div className="form-grid-dual">
                <div className="input-group-sm">
                  <label>Nueva contraseña</label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    value={passwords.newPassword}
                    onChange={(e) => setPasswords({ ...passwords, newPassword: e.target.value })}
                    required
                  />
                </div>
                <div className="input-group-sm">
                  <label>Confirmar contraseña</label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    value={passwords.confirmPassword}
                    onChange={(e) => setPasswords({ ...passwords, confirmPassword: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="profile-modal-actions">
                <button type="button" className="btn-logout" onClick={handleLogout}>
                  Cerrar sesión
                </button>
                <button type="submit" className="btn-save-profile">
                  Actualizar contraseña
                </button>
              </div>
            </form>
          </div>
        )}

      </div>
    </div>
  );
};