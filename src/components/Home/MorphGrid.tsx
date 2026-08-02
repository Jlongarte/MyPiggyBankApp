import { motion, MotionValue } from "framer-motion";

interface Props {
  progress: number; // Mantenemos tu hook de progreso actual
}

const MorphGrid: React.FC<Props> = ({ progress }) => {
  // Transformaciones dramáticas basadas en el scroll (progress de 0 a 1)
  
  // Las tarjetas laterales entran desde los extremos con un giro y desplazamiento elegante
  const leftCardX = (1 - progress) * -180;
  const rightCardX = (1 - progress) * 180;
  const cardsOpacity = progress > 0.15 ? (progress - 0.15) * 1.4 : 0;

  // Efecto de expansión dramática de la tarjeta central (simulando salir del frame)
  const centerWidth = 280 + progress * 100; // Pasa de estrecha (tipo móvil) a ancha
  const centerHeight = 400 + progress * 120;
  const centerScale = 0.75 + progress * 0.25;

  return (
    <div className="cards-grid-wrapper" style={{ opacity: cardsOpacity }}>
      
      {/* Tarjeta Izquierda */}
      <div 
        className="side-card left-card" 
        style={{
          transform: `translateX(${leftCardX}px) translateY(${(1 - progress) * 40}px) scale(${0.85 + progress * 0.15})`,
          opacity: cardsOpacity
        }}
      >
        <div className="card-inner-content">
          <span className="card-category">Personal · EUR</span>
          <h3 className="card-amount">€3,126</h3>
          <span className="card-badge">Accounts</span>
        </div>
      </div>

      {/* Tarjeta Central (Efecto expansión tipo app de Revolut) */}
      <div 
        className="center-card-morph" 
        style={{
          width: `${centerWidth}px`,
          height: `${centerHeight}px`,
          transform: `scale(${centerScale})`,
          borderRadius: `${12 + progress * 16}px`,
          boxShadow: progress > 0.4 ? "0 30px 60px rgba(0, 0, 0, 0.3)" : "0 10px 20px rgba(0,0,0,0.1)"
        }}
      >
        <div className="morph-bg-image"></div>
        <div className="morph-card-content" style={{ padding: progress > 0.7 ? "32px 24px" : "16px" }}>
          <span className="card-category">Personal</span>
          <h3 className="card-amount" style={{ fontSize: progress > 0.7 ? "2.2rem" : "2.8rem" }}>£6,012</h3>
          <span className="card-badge">Accounts</span>
          
          <div 
            className="card-footer-item center-footer" 
            style={{ 
              opacity: progress > 0.6 ? (progress - 0.6) * 2.5 : 0,
              transform: `translateY(${(1 - progress) * 20}px)`
            }}
          >
            <div className="footer-icon wallet">🔒</div>
            <div>
              <p className="footer-title">PROTECTED</p>
              <span className="positive">SWITCH GUARANTEE</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tarjeta Derecha */}
      <div 
        className="side-card right-card" 
        style={{
          transform: `translateX(${rightCardX}px) translateY(${(1 - progress) * 40}px) scale(${0.85 + progress * 0.15})`,
          opacity: cardsOpacity
        }}
      >
        <div className="card-inner-content">
          <span className="card-category">Personal</span>
          <h3 className="card-amount">£2,350</h3>
          <span className="card-badge">Accounts</span>
        </div>
      </div>

    </div>
  );
};

export default MorphGrid;