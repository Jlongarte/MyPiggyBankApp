import { useState, useEffect, useRef } from "react";

interface ChatMessage {
  id: number;
  type: "user" | "ai" | "typing";
  text: string;
  triggerProgress: number;
}

const conversation: ChatMessage[] = [
  { id: 1, type: "user", text: "What can I get with my RevPoints?", triggerProgress: 0.2 },
  { id: 2, type: "ai", text: "You have 11,276 RevPoints, here's what you can do with them:", triggerProgress: 0.5 },
  { id: 3, type: "typing", text: "•••", triggerProgress: 0.8 }
];

const AiAssistantSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  
  // Estado para las coordenadas del ratón (Halo del Cursor)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

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

  // Función para capturar el movimiento del ratón relativo a la sección
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    
    // Calculamos los píxeles exactos relativos al contenedor
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  const lightPosition = -50 + progress * 200;

  return (
    <div 
      className="ai-scroll-wrapper" 
      ref={containerRef}
      onMouseMove={handleMouseMove} 
    >
      <div className="ai-sticky-viewport">
        
        {/* HAZ DE LUZ AMBIENTAL DE SCROLL ORIGINAL */}
        <div className="ai-ambient-glow" style={{ left: `${lightPosition}%` }} />

        {/* HALO BLANCO QUE SIGUE AL CURSOR */}
        <div 
          className="ai-cursor-halo"
          style={{
            transform: `translate3d(${mousePos.x}px, ${mousePos.y}px, 0px) translate(-50%, -50%)`
          }}
        />

        {/* TEXTO SUPERIOR */}
        <div className="ai-top-content">
          <h2 className="ai-title">Ask, and AIR makes it happen</h2>
          <p className="ai-subtitle">
            AI by Revolut, AIR, is your 24/7 personal assistant. Just open your app, swipe, and ask away.
          </p>
          <button className="btn-ai-learn">Learn more</button>
        </div>

        {/* SMARTPHONE Y CHAT */}
        <div className="ai-phone-container">
          <div className="ai-phone-body">
            <div className="ai-chat-header">
              <span className="chat-close">✕</span>
              <span className="chat-title">AIR</span>
              <div className="chat-avatar-orb"></div>
            </div>

            <div className="ai-chat-messages-box">
              {conversation.map((msg) => {
                const isVisible = progress >= msg.triggerProgress;
                return (
                  <div
                    key={msg.id}
                    className={`chat-bubble ${msg.type}-bubble ${isVisible ? "visible" : ""}`}
                    style={{
                      opacity: isVisible ? 1 : 0,
                      transform: `translateY(${isVisible ? 0 : 20}px)`
                    }}
                  >
                    {msg.type === "typing" ? (
                      <span className="typing-dots">{msg.text}</span>
                    ) : (
                      <p>{msg.text}</p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AiAssistantSection;