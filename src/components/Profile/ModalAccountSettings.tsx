// src/components/Dashboard/Profile/ModalAccountSettings.tsx
import {  FormEvent, ChangeEvent } from "react";

interface ModalAccountSettingsProps {
  userData: any;
  setUserData: (data: any) => void;
  avatarPreview: string | null;
  onImageUpload: (e: ChangeEvent<HTMLInputElement>) => void;
  onSaveProfile: (e: FormEvent) => void;
  onChangePassword: (e: FormEvent) => void;
  passwords: { oldPassword: string; newPassword: string; confirmPassword: string };
  setPasswords: (pass: any) => void;
  passError: string | null;
  passSuccess: boolean;
  onLogout: () => void;
}

export const ModalAccountSettings = ({
  userData,
  setUserData,
  avatarPreview,
  onImageUpload,
  onSaveProfile,
  onChangePassword,
  passwords,
  setPasswords,
  passError,
  passSuccess,
  onLogout,
}: ModalAccountSettingsProps) => {
  return (
    <div className="profile-tab-content">
      {/* Formulario de edición de perfil y avatar */}
      <form onSubmit={onSaveProfile} className="profile-modal-form">
        <div className="avatar-upload-container">
          <div className="avatar-circle-large">
            {avatarPreview ? (
              <img src={avatarPreview} alt="Profile" className="avatar-img-full" />
            ) : (
              <span className="avatar-initials-large">
                {userData.name?.[0]}{userData.lastName?.[0]}
              </span>
            )}
          </div>
          <label htmlFor="avatar-file-input" className="btn-change-photo">
            Change profile picture
          </label>
          <input
            id="avatar-file-input"
            type="file"
            accept="image/*"
            onChange={onImageUpload}
            style={{ display: "none" }}
          />
        </div>

        <div className="form-grid-dual">
          <div className="input-group-sm">
            <label>First name</label>
            <input
              type="text"
              value={userData.name || ""}
              onChange={(e) => setUserData({ ...userData, name: e.target.value })}
              required
            />
          </div>
          <div className="input-group-sm">
            <label>Last name</label>
            <input
              type="text"
              value={userData.lastName || ""}
              onChange={(e) => setUserData({ ...userData, lastName: e.target.value })}
              required
            />
          </div>
        </div>

        <div className="input-group-sm">
          <label>Phone number</label>
          <input
            type="tel"
            value={userData.phoneNumber || ""}
            onChange={(e) => setUserData({ ...userData, phoneNumber: e.target.value })}
          />
        </div>

        <button type="submit" className="btn-save-profile-sm">
          Save profile
        </button>
      </form>

      <hr className="modal-divider" />

      {/* Formulario de cambio de contraseña */}
      <form onSubmit={onChangePassword} className="change-pass-form">
        <h4 className="section-title-sm">Change password</h4>

        {passError && <div className="pass-alert error">{passError}</div>}
        {passSuccess && <div className="pass-alert success">Password successfully updated!</div>}

        <div className="input-group-sm">
          <label>Old password</label>
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
            <label>New password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={passwords.newPassword}
              onChange={(e) => setPasswords({ ...passwords, newPassword: e.target.value })}
              required
            />
          </div>
          <div className="input-group-sm">
            <label>Confirm password</label>
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
          <button type="button" className="btn-logout" onClick={onLogout}>
            Log out
          </button>
          <button type="submit" className="btn-save-profile">
            Update password
          </button>
        </div>
      </form>
    </div>
  );
};