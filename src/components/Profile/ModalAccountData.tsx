

interface ModalAccountDataProps {
  userData: any;
  avatarPreview: string | null;
  onLogout: () => void;
}

export const ModalAccountData = ({ userData, avatarPreview, onLogout }: ModalAccountDataProps) => {
  return (
    <div className="profile-tab-content">
      {/* Contenedor del Avatar */}
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
      </div>

      {/* Cuadrícula de datos de solo lectura */}
      <div className="readonly-data-grid">
        <div className="readonly-item">
          <span className="readonly-label">Full name</span>
          <span className="readonly-value">{userData.name} {userData.lastName}</span>
        </div>

        <div className="readonly-item">
          <span className="readonly-label">Email address</span>
          <span className="readonly-value">{userData.email}</span>
        </div>

        <div className="readonly-item">
          <span className="readonly-label">Mobile phone</span>
          <span className="readonly-value">{userData.phoneNumber || "Not specified"}</span>
        </div>

        <div className="readonly-item">
          <span className="readonly-label">Address</span>
          <span className="readonly-value">
            {userData.address?.street
              ? `${userData.address.street}, ${userData.address.city || ""} (${userData.address.country || ""})`
              : "Not specified"}
          </span>
        </div>
      </div>

      {/* Botón de cierre de sesión */}
      <div className="profile-modal-actions single-right">
        <button type="button" className="btn-logout" onClick={onLogout}>
          Log out
        </button>
      </div>
    </div>
  );
};