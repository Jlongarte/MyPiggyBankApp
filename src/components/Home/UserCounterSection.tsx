import { useState, useEffect, useRef } from "react";

const UserCounterSection: React.FC = () => {
  const [count, setCount] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Si la sección es visible y no ha animado antes, arranca el contador
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          let start = 0;
          const end = 75; // Representa 75 millones
          const duration = 2000; // 2 segundos de animación fluida
          const startTime = performance.now();

          const animate = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Función de desaceleración (Ease Out) para que frene elegantemente al final
            const easeProgress = 1 - Math.pow(1 - progress, 3);
            
            const currentCount = Math.floor(easeProgress * end);
            setCount(currentCount);

            if (progress < 1) {
              requestAnimationFrame(animate);
            }
          };

          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.3 } // Se activa cuando se ve el 30% de la sección
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section className="pb-counter-section" ref={sectionRef}>
      <div className="counter-container">
        
        {/* TITULAR PRINCIPAL CON CONTADOR DINÁMICO */}
        
        <h2 className="counter-main-title">
          Únete a los más de <span className="blue-brand-number">{count}M+</span> de usuarios que ya confían en The Piggy Bank
        <img src="/favicon.webp" alt="Logo de The Piggy Bank" className="counter-logo" />
        </h2>
        
        <button className="btn-counter-download">Descarga la app</button>

        {/* --- TEXTO LEGAL Y DISCLAIMER ADAPTADO  --- */}
        <div className="counter-legal-box">
          <p className="legal-index-marker">1</p>
          <p>
            La rentabilidad del 5% TAE (variable) es una oferta por tiempo limitado válida exclusivamente para nuevos clientes de The Piggy Bank. La promoción estará vigente para cuentas de Ahorro con Acceso Instantáneo abiertas en el periodo correspondiente de este año. Dicha tasa bonificada se aplicará sobre saldos aptos según condiciones de contratación. Al finalizar el periodo promocional, los tipos de interés se ajustarán a los planes estándar vigentes descritos en nuestra plataforma. Tarifas e impuestos aplicables según la legislación fiscal española vigente.
          </p>
          <p>
            SERVICIOS DE INVERSIÓN: Capital en riesgo. El valor de las inversiones puede tanto subir como bajar, y es posible que recupere menos de su inversión inicial o que pierda la totalidad de sus fondos. Las rentabilidades pasadas no constituyen un indicador fiable de resultados futuros. Las fluctuaciones en los tipos de cambio pueden afectar al rendimiento global de sus activos.
          </p>
          <p>
            The Piggy Bank Ltd. ofrece exclusivamente servicios de ejecución pura para acciones y ETFs. No se proporciona asesoramiento financiero ni recomendaciones personalizadas. Como inversor independiente, debe tomar sus propias decisiones o buscar asesoramiento profesional cualificado si no está seguro de la idoneidad de alguna inversión para sus circunstancias o necesidades específicas. Consulte nuestros Términos de Negocio y Declaración de Riesgos antes de operar.
          </p>
        </div>

      </div>
    </section>
  );
};

export default UserCounterSection;