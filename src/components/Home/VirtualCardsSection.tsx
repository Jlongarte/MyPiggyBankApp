// src/components/Home/VirtualCardsSection.tsx
import React from "react";

const VirtualCardsSection: React.FC = () => {
  return (
    <div className="virtual-scroll-wrapper">
      <div className="virtual-sticky-viewport">
        
        {/* ================= TEXTO SUPERIOR ================= */}
        <div className="virtual-top-content">
          <h2 className="virtual-title">Go virtual</h2>
          <p className="virtual-subtitle">
            Create and add virtual cards to your Apple Wallet or Google Wallet to start paying right away.
          </p>
          <button className="btn-create-card">Create a card</button>
        </div>

        {/* ================= VÍDEO REEMPLAZANDO A LA ESCENA 3D ================= */}
        <div className="virtual-video-wrapper">
          <video 
            className="virtual-loop-video"
            autoPlay 
            loop 
            muted 
            playsInline
          >
            {/* Reemplaza este enlace con la ruta de tu vídeo de tarjetas virtuales */}
            <source src="./CC2.mp4" type="video/mp4" />
            Tu navegador không soporta la reproducción de vídeos.
          </video>
        </div>

        {/* ================= SELECTOR DE PESTAÑAS INFERIOR ================= */}
        <div className="virtual-tabs-bottom">
          <button className="virtual-tab-pill">Physical cards</button>
          <button className="virtual-tab-pill active">Virtual cards</button>
        </div>

      </div>
    </div>
  );
};

export default VirtualCardsSection;