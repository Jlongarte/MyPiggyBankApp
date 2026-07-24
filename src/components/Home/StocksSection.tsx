// src/features/home/components/StocksSection.tsx
import { useEffect, useRef } from "react";

interface StocksSectionProps {
  /** Puedes pasar opcionalmente la ruta de tu vídeo si la tienes local o usar una por defecto */
  videoUrl?: string;
}

const StocksSection: React.FC<StocksSectionProps> = ({ 
  videoUrl = "./video.mp4" 
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // IntersectionObserver asegura que el vídeo se mantenga reproduciendo
    // en bucle siempre que la sección sea visible en la pantalla
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            video.play().catch((error) => {
              console.log("Autoplay reactivado por observador:", error);
            });
          } else {
            video.pause(); // Ahorra recursos cuando el usuario hace scroll fuera de la sección
          }
        });
      },
      { threshold: 0.25 } // Se activa cuando al menos el 25% de la sección es visible
    );

    observer.observe(video);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section className="revolut-stocks-section">
      <div className="stocks-container">
        
        {/* TEXTO SUPERIOR (ESTILO MODO OSCURO DE REVOLUT) */}
        <div className="stocks-top-content">
          <h2 className="stocks-title">
            Explore 5,000+ stocks and ETFs
          </h2>
          <p className="stocks-subtitle">
            From Apple to Zoom, invest in some of the biggest and most influential companies in the world, commission-free within your monthly allowance.<sup>2</sup>
          </p>
          <span className="stocks-risk-disclaimer">
            Other fees may apply. Capital at risk.
          </span>
          <button className="btn-stocks-action">Try it out</button>
        </div>

        {/* CONTENEDOR DEL VÍDEO EN BUCLE INFINITO */}
        <div className="stocks-video-wrapper">
          <video
            ref={videoRef}
            src={videoUrl}
            autoPlay
            loop
            muted
            playsInline
            className="stocks-loop-video"
          />
        </div>

      </div>
    </section>
  );
};

export default StocksSection;