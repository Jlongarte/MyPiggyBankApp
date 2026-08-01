// src/components/Dashboard/UserProfileModal.tsx
import { useState, useEffect, FormEvent, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import { ModalAccountData } from "./ModalAccountData";
import { ModalAccountSettings } from "./ModalAccountSettings";

interface UserProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUserUpdated: () => void;
}

type ModalTab = "datos" | "ajustes";

export const UserProfileModal = ({ isOpen, onClose, onUserUpdated }: UserProfileModalProps) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<ModalTab>("datos");

  // Estados de datos de usuario
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

  // Sincronizar datos al abrir el modal
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

  // Manejar subida de foto 
  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
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

  // Guardar cambios generales del perfil
  const handleSaveProfile = (e: FormEvent) => {
    e.preventDefault();
    updateUserInStorage(userData);
    
    // Disparamos el evento global para avisar al DashBoardPage en tiempo real
    window.dispatchEvent(new Event("userUpdated"));

    onUserUpdated();
    alert("Profile successfully updated!");
    onClose();
  };

  // Cambio de contraseña
  const handleChangePassword = (e: FormEvent) => {
    e.preventDefault();
    setPassError(null);
    setPassSuccess(false);

    if (passwords.oldPassword !== userData.password) {
      setPassError("The old password is incorrect.");
      return;
    }

    if (passwords.newPassword !== passwords.confirmPassword) {
      setPassError("The new password and confirmation do not match.");
      return;
    }

    if (passwords.newPassword.length < 4) {
      setPassError("The new password must be at least 4 characters long.");
      return;
    }

    const updatedUser = { ...userData, password: passwords.newPassword };
    setUserData(updatedUser);
    updateUserInStorage(updatedUser);

    // Disparamos el evento global también por si acaso
    window.dispatchEvent(new Event("userUpdated"));

    setPassSuccess(true);
    setPasswords({ oldPassword: "", newPassword: "", confirmPassword: "" });
  };

  // Helper para persistencia en localStorage
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

  // Cerrar sesión
  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    localStorage.removeItem("sessionExpiration");
    navigate("/login");
  };

  return (
    <div className="modal-backdrop-glass" onClick={onClose}>
      <div className="profile-modal-card" onClick={(e) => e.stopPropagation()}>
        
        {/* Cabecera con pestañas (Tabs) */}
        <div className="modal-header">
          <div className="modal-tabs-pill">
            <button
              className={`modal-tab-btn ${activeTab === "datos" ? "active" : ""}`}
              onClick={() => setActiveTab("datos")}
            >
              📋 Account Data
            </button>
            <button
              className={`modal-tab-btn ${activeTab === "ajustes" ? "active" : ""}`}
              onClick={() => setActiveTab("ajustes")}
            >
              ⚙️ Account Settings
            </button>
          </div>
          <button className="btn-close-modal" onClick={onClose}>✕</button>
        </div>

        {/* Pestaña 1: Datos de la cuenta (Solo lectura) */}
        {activeTab === "datos" && (
          <ModalAccountData
            userData={userData}
            avatarPreview={avatarPreview}
            onLogout={handleLogout}
          />
        )}

        {/* Pestaña 2: Ajustes de la cuenta (Editable) */}
        {activeTab === "ajustes" && (
          <ModalAccountSettings
            userData={userData}
            setUserData={setUserData}
            avatarPreview={avatarPreview}
            onImageUpload={handleImageUpload}
            onSaveProfile={handleSaveProfile}
            onChangePassword={handleChangePassword}
            passwords={passwords}
            setPasswords={setPasswords}
            passError={passError}
            passSuccess={passSuccess}
            onLogout={handleLogout}
          />
        )}

      </div>
    </div>
  );
};

export default UserProfileModal;