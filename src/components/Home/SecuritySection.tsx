import { useState, useEffect, useRef } from "react";

const SecuritySection: React.FC = () => {
  const [offsetY, setOffsetY] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      
      // Calculamos la posición del componente respecto a la pantalla
      const rect = sectionRef.current.getBoundingClientRect();
      const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
      
      if (isVisible) {
        // Generamos un desfase suave basado en el scroll interno de esta sección
        setOffsetY((window.innerHeight - rect.top) * 0.08);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="revolut-security-section" ref={sectionRef}>
      <div className="security-container">
        
        {/* Bloque Izquierdo: Textos y Botón  */}
        <div className="security-text-block">
          <h2 className="security-title">Your money’s safe <br /> space</h2>
          <p className="security-subtitle">
            With Revolut Secure, you’re entering the new era of money security — where your bank account has 24/7 protection through proactive, purpose-built defences and a team of specialists.
          </p>
          <button className="btn-security-learn">Learn more</button>
        </div>

        {/* Bloque Derecho: El Escudo 3D con efecto Parallax sutil */}
        <div className="security-visual-block">
          <div 
            className="security-shield-wrapper"
            style={{ transform: `translateY(-${offsetY}px)` }} 
          >
        
            <img 
              src="./shield.png" 
              alt="Revolut Secure Shield" 
              className="security-shield-img"
            />
          </div>
        </div>

      </div>
    </section>
  );
};

export default SecuritySection;