import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { DashboardSidebar, type TabType } from "./DashboardSidebar"

// Importación de las vistas del dashboard
import InicioView from "../../components/Inicio/InicioView";
import BalanceView from "../../components/Dashboard/Balance/BalanceView";
import TransferenciasView from "../../components/Transfers/TransferenciasView";
import CryptoView from "../../components/Dashboard/Crypto/CryptoView";
import AssistanceView from "../../components/Dashboard/Chat/AssistanceView";
import { UserProfileModal } from "../../components/Dashboard/UserProfileModal";

import "../../styles/Dashboard.css";
import "../../styles/AssistanceView.css";

interface UserData {
  name?: string;
  avatar?: string;
  [key: string]: any;
}

export const DashBoardPage = () => {
  const [activeTab, setActiveTab] = useState<TabType>("inicio");
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<UserData>({});
  const navigate = useNavigate();

  // Cargar y escuchar actualizaciones del usuario actual desde el localStorage
  useEffect(() => {
    const fetchUserData = () => {
      const storedUser = localStorage.getItem("currentUser");
      if (storedUser) {
        try {
          setCurrentUser(JSON.parse(storedUser));
        } catch (error) {
          console.error("Error parsing user data:", error);
        }
      }
    };

    fetchUserData();

    // Escuchar el evento de actualización de perfil en tiempo real
    window.addEventListener("userUpdated", fetchUserData);
    return () => {
      window.removeEventListener("userUpdated", fetchUserData);
    };
  }, []);

  // Función para cerrar sesión de usuario
  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    navigate("/login");
  };

  // Obtener el título dinámico según la pestaña activa
  const getPageTitle = () => {
    switch (activeTab) {
      case "inicio": return "Home";
      case "balance": return "Account Balance";
      case "transferencias": return "Transfers";
      case "crypto": return "Crypto Market";
      case "assistance": return "AI Assistant";
      default: return "Dashboard";
    }
  };

  // Obtener iniciales si no hay foto configurada
  const getInitials = (name?: string) => {
    if (!name) return "JD";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="revolut-layout">
      {/* Barra lateral de navegación encapsulada */}
      <DashboardSidebar activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Contenedor central de la interfaz */}
      <main className="revolut-main-container">
        <header className="revolut-top-bar">
          <h1 className="revolut-page-title">{getPageTitle()}</h1>

          <div className="revolut-top-actions">
            <button className="btn-revolut-secondary" onClick={handleLogout}>
              Log out
            </button>

            {/* Avatar o foto de perfil interactiva */}
            <div
              className="user-avatar-badge"
              onClick={() => setIsProfileModalOpen(true)}
              style={{ 
                cursor: "pointer", 
                overflow: "hidden", 
                display: "flex", 
                alignItems: "center", 
                justifyContent: "center",
                padding: 0
              }}
            >
              {currentUser?.avatar ? (
                <img 
                  src={currentUser.avatar} 
                  alt={currentUser.name || "User"} 
                  style={{ width: "100%", height: "100%", objectFit: "cover" }} 
                />
              ) : (
                getInitials(currentUser?.name)
              )}
            </div>
          </div>
        </header>

        {/* Panel principal dinámico donde se cargan las vistas */}
        <section className="revolut-dashboard-card">
          {activeTab === "inicio" && <InicioView />}
          {activeTab === "balance" && <BalanceView />}
          {activeTab === "transferencias" && <TransferenciasView onTransfer={(dest, amt) => console.log(dest, amt)} />}
          {activeTab === "crypto" && <CryptoView />}
          {activeTab === "assistance" && <AssistanceView />}
        </section>
      </main>

      {/* Modal de perfil de usuario */}
      {isProfileModalOpen && (
        <UserProfileModal
          isOpen={isProfileModalOpen}
          onClose={() => setIsProfileModalOpen(false)}
          onUserUpdated={() => {
            const updated = localStorage.getItem("currentUser");
            if (updated) setCurrentUser(JSON.parse(updated));
          }}
        />
      )}
    </div>
  );
};

export default DashBoardPage;