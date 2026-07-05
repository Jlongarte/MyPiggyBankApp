// src/features/home/components/StocksSection.tsx
import { useState, useEffect, useRef } from "react";

interface StockCoin {
  id: number;
  symbol: string;
  label: string;
  initialAngle: number; // Ángulo inicial en la órbita (en grados)
}

const stockAssets: StockCoin[] = [
  { id: 1, symbol: "BH", label: "Berkshire Hathaway", initialAngle: 0 },
  { id: 2, symbol: "MSFT", label: "Microsoft", initialAngle: 72 },
  { id: 3, symbol: "AAPL", label: "Apple", initialAngle: 144 },
  { id: 4, symbol: "AMZN", label: "Amazon", initialAngle: 216 },
  { id: 5, symbol: "GOOG", label: "Google", initialAngle: 288 }
];

const StocksSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Calculamos el paso del scroll específicamente cuando la sección cruza la pantalla
      if (rect.top < windowHeight && rect.bottom > 0) {
        const totalDistance = windowHeight + rect.height;
        const currentDistance = windowHeight - rect.top;
        setScrollProgress(currentDistance / totalDistance);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // La rotación base aumentará suavemente con el avance del scroll
  const orbitRotation = scrollProgress * 360;

  return (
    <section className="revolut-stocks-section" ref={sectionRef}>
      <div className="stocks-container">
        
        {/* TEXTO CONTUNDENTE (INVERTIDO: TEXTO NEGRO) */}
        <div className="stocks-top-content">
          <h2 className="stocks-title">Explore 5,000+ stocks and ETFs</h2>
          <p className="stocks-subtitle">
            From Apple to Zoom, invest in some of the biggest and most influential companies in the world, commission-free within your monthly allowance.
          </p>
          <span className="stocks-risk-disclaimer">Other fees may apply. Capital at risk.</span>
          <button className="btn-stocks-action">Try it out</button>
        </div>

        {/* ESCENA ORBITAL 3D DE LAS MONEDAS */}
        <div className="stocks-scene-3d">
          <div 
            className="stocks-orbit-center"
            style={{ transform: `rotateY(${orbitRotation}deg)` }} // La órbita completa gira con el scroll
          >
            {stockAssets.map((asset) => {
              // Cada moneda se auto-posiciona en su ángulo correspondiente de la circunferencia 3D
              const totalAngle = asset.initialAngle;
              
              return (
                <div
                  key={asset.id}
                  className="stock-coin-3d"
                  style={{
                    transform: `rotateY(${totalAngle}deg) translateZ(280px) rotateY(-${totalAngle + orbitRotation}deg)`
                    // El último rotateY contrarresta el giro para que las caras de las monedas miren siempre al usuario
                  }}
                >
                  <div className="coin-metal-edge">
                    <div className="coin-face-front">
                      <div className="coin-inner-emboss">
                        {asset.symbol === "MSFT" ? (
                          /* Renderizado del logo estilo Microsoft simétrico de image_f99c01.jpg */
                          <div className="logo-msft-grid">
                            <span></span><span></span><span></span><span></span>
                          </div>
                        ) : (
                          <span className="coin-text-logo">{asset.symbol}</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};

export default StocksSection;