// src/features/home/components/MorphGrid.tsx
interface Props { progress: number; }

const MorphGrid: React.FC<Props> = ({ progress }) => {
  return (
    <div className="cards-grid-wrapper">
      
      {/* Tarjeta Izquierda (image_dbb2a2.jpg) */}
      <div className="side-card left-card" style={{
        opacity: progress > 0.4 ? (progress - 0.4) * 2.5 : 0,
        transform: `translateX(${(1 - progress) * 100}px) translateY(${(1 - progress) * 50}px)`
      }}>
        <div className="card-inner-content">
          <span className="card-category">Personal · EUR</span>
          <h3 className="card-amount">3126 €</h3>
          <span className="card-badge">Cuentas</span>
        </div>
      </div>

      {/* Tarjeta Central (Mutación de image_dbb227.jpg a image_dbb2a2.jpg) */}
      <div className="center-card-morph" style={{
        width: progress === 1 ? "320px" : `calc(100vw - ${(1 - progress) * (100 - 22.2)}vw)`, 
        height: progress === 1 ? "420px" : `calc(100vh - ${(1 - progress) * (100 - 46.6)}vh)`,
        borderRadius: `${progress * 24}px`,
        boxShadow: progress > 0.5 ? "0 20px 40px rgba(0,0,0,0.12)" : "none"
      }}>
        <div className="morph-bg-image"></div>
        <div className="morph-card-content" style={{ padding: progress > 0.8 ? "32px 24px" : "10% 8%" }}>
          <span className="card-category">Personal</span>
          <h3 className="card-amount" style={{ fontSize: progress > 0.8 ? "2rem" : "3.5rem" }}>6012 €</h3>
          <span className="card-badge">Cuentas</span>
          
          <div className="card-footer-item center-footer" style={{ opacity: progress > 0.7 ? (progress - 0.7) * 3.3 : 0 }}>
            <div className="footer-icon wallet">💼</div>
            <div>
              <p className="footer-title">Sueldo</p>
              <span className="positive">+2550 €</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tarjeta Derecha (image_dbb2a2.jpg) */}
      <div className="side-card right-card" style={{
        opacity: progress > 0.4 ? (progress - 0.4) * 2.5 : 0,
        transform: `translateX(-${(1 - progress) * 100}px) translateY(${(1 - progress) * 50}px)`
      }}>
        <div className="card-inner-content">
          <span className="card-category">Personal</span>
          <h3 className="card-amount">2350 €</h3>
          <span className="card-badge">Cuentas</span>
        </div>
      </div>

    </div>
  );
};

export default MorphGrid;