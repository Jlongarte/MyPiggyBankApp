import { useState } from "react";

const VirtualCardsSection: React.FC = () => {
  // Estado para controlar la pestaña activa: "physical" o "virtual"
  const [activeTab, setActiveTab] = useState<"physical" | "virtual">("virtual");

  return (
    <div className="virtual-scroll-wrapper">
      <div className="virtual-sticky-viewport">
        
        {/* ================= TEXTO SUPERIOR ================= */}
        <div className="virtual-top-content">
          <h2 className="second-title">
            {activeTab === "physical" ? "Get your physical card" : "Go virtual"}
          </h2>
          <p className="virtual-subtitle">
            {activeTab === "physical"
              ? "Order a customizable physical card to spend safely worldwide with contactless and ATM access."
              : "Create and add virtual cards to your Apple Wallet or Google Wallet to start paying right away."}
          </p>
         
        </div>

        {/* ================= VÍDEO DINÁMICO SEGÚN LA PESTAÑA ================= */}
        <div className="virtual-video-wrapper">
          <video 
            key={activeTab} /* La key fuerza al DOM a recargar el vídeo al cambiar de pestaña */
            className="virtual-loop-video"
            autoPlay 
            loop 
            muted 
            playsInline
          >
            {/* Cambia "./CC1.mp4" por el nombre de tu vídeo para tarjetas físicas */}
            <source 
              src={activeTab === "physical" ? "./CC1.mp4" : "./CC2.mp4"} 
              type="video/mp4" 
            />
            Tu navegador no soporta la reproducción de vídeos.
          </video>
        </div>

        {/* ================= SELECTOR DE PESTAÑAS INFERIOR ================= */}
        <div className="virtual-tabs-bottom">
          <button 
            className={`virtual-tab-pill ${activeTab === "physical" ? "active" : ""}`}
            onClick={() => setActiveTab("physical")}
          >
            Physical cards
          </button>
          <button 
            className={`virtual-tab-pill ${activeTab === "virtual" ? "active" : ""}`}
            onClick={() => setActiveTab("virtual")}
          >
            Virtual cards
          </button>
        </div>

      </div>
    </div>
  );
};

export default VirtualCardsSection;