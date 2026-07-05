// src/features/home/components/VirtualCardsSection.tsx
import { useState, useEffect, useRef } from "react";

const VirtualCardsSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const totalHeight = rect.height - window.innerHeight;
      const scrolledIntoSection = -rect.top;

      if (scrolledIntoSection >= 0 && scrolledIntoSection <= totalHeight) {
        setProgress(scrolledIntoSection / totalHeight);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="virtual-scroll-wrapper" ref={containerRef}>
      <div className="virtual-sticky-viewport">
        
        {/* ================= TEXTO SUPERIOR COMPLETAMENTE FIJO ================= */}
        <div className="virtual-top-content">
          <h2 className="virtual-title">Go virtual</h2>
          <p className="virtual-subtitle">
            Create and add virtual cards to your Apple Wallet or Google Wallet to start paying right away.
          </p>
          <button className="btn-create-card">Create a card</button>
        </div>

        {/* ================= ESCENA 3D (SMARTPHONE Y TARJETAS) ================= */}
        <div className="virtual-scene-3d">
          
          {/* El Smartphone inclinado estilo Revolut */}
          <div className="phone-mockup-3d">
            <div className="phone-screen-content">
              {/* Tarjeta Morada que ya está fija/dentro del teléfono */}
              <div className="phone-active-card">
                <span className="card-logo-mini">vbank</span>
                <span className="card-type-tag">VIRTUAL</span>
              </div>
              
              {/* Controles de la interfaz del teléfono abajo */}
              <div className="phone-ui-controls">
                <span className="ui-icon">👁️</span>
                <span className="ui-icon">❄️</span>
                <span className="ui-icon">⚙️</span>
              </div>
            </div>
          </div>

          {/* TARJETA NEGRA (Vuela desde la izquierda/abajo hacia el teléfono) */}
          <div 
            className="flying-card black-card"
            style={{
              transform: `translate3d(${-200 + (progress * 200)}px, ${150 - (progress * 150)}px, ${progress * 50}px) rotateX(30deg) rotateY(-40deg) rotateZ(15deg)`,
              opacity: progress < 0.9 ? 1 - (progress * 0.5) : 0
            }}
          >
            <span className="card-logo-mini">vbank</span>
            <span className="card-type-tag">VIRTUAL</span>
          </div>

          {/* TARJETA NEÓN REVOLUT (Vuela desde arriba/derecha y se posiciona en el slot) */}
          <div 
            className="flying-card neon-card"
            style={{
              transform: `translate3d(${(1 - progress) * 350}px, -${(1 - progress) * 200}px, 0px) rotateX(32deg) rotateY(-38deg) rotateZ(18deg)`,
              opacity: 1
            }}
          >
            <span className="card-logo-mini dark-text">vbank</span>
            <span className="card-type-tag dark-text">VIRTUAL</span>
          </div>

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