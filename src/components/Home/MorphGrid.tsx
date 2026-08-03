

interface Props {
  progress: number;
}

const MorphGrid: React.FC<Props> = ({ progress }) => {
  const entryX = (1 - progress) * 220; 
  const entryY = (1 - progress) * 260;
  
  const centerOpacity = progress > 0.05 ? Math.min(1, (progress - 0.05) * 2) : 0;
  const sidesOpacity = progress > 0.3 ? (progress - 0.3) * 1.8 : 0;

  return (
    <div className="morph-grid-section" style={{ opacity: centerOpacity }}>
      
      {/* Texto superior y botón */}
      <div className="morph-header-content">
        <h2 className="second-title counter-title">
          Your salary, reimagined
        </h2>
        <p className="morph-subtitle">
          Spend smartly, send quickly, sort your salary automatically, and watch your savings grow — all with a PiggyBank account.
        </p>
        <button className="morph-action-btn">
          Move your salary
        </button>
      </div>

      {/* Contenedor de las 3 imágenes */}
      <div className="morph-cards-container">
        
        {/* Tarjeta 1: Café (Izquierda) */}
        <div 
          className="morph-card side-card-left"
          style={{
            transform: `translateX(${(1 - progress) * -180}px) translateY(${(1 - progress) * 60}px) scale(${0.75 + progress * 0.15})`,
            opacity: sidesOpacity
          }}
        >
          <img src="./coffee.webp" alt="Coffee" className="morph-card-img" />
        </div>

        {/* Tarjeta 2: Chica (Centro - Protagonista) */}
        <div 
          className="morph-card center-card-hero"
          style={{
            transform: `translate(${entryX}px, ${entryY}px) scale(${0.65 + progress * 0.35})`,
            width: `${300 + progress * 40}px`,
            height: `${460 + progress * 20}px`
          }}
        >
          <img src="./girl.webp" alt="Girl" className="morph-card-img" />
        </div>

        {/* Tarjeta 3: Man (Derecha) */}
        <div 
          className="morph-card side-card-right"
          style={{
            transform: `translateX(${(1 - progress) * 180}px) translateY(${(1 - progress) * 60}px) scale(${0.75 + progress * 0.15})`,
            opacity: sidesOpacity
          }}
        >
          <img src="./man.webp" alt="Man" className="morph-card-img" />
        </div>

      </div>
    </div>
  );
};

export default MorphGrid;