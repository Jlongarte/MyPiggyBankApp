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

        <h2 className="second-title counter-title">
          Join over <span className="blue-brand-number">{count}M+</span> users
          who already trust
        </h2>

        <img
          src="/logo2.webp"
          alt="The Piggy Bank logo"
          className="counter-logo"
        />

        <button className="btn-counter-download">Download the app</button>

        {/* --- TEXTO LEGAL Y DISCLAIMER ADAPTADO --- */}
        <div className="counter-legal-box">
          <p className="legal-index-marker">1</p>

          <p>
            The 5% APY (variable) is a limited-time offer available exclusively
            to new The Piggy Bank customers. The promotion applies only to
            Instant Access Savings Accounts opened during the eligible period
            this year. The promotional rate applies to qualifying balances
            subject to the account terms and conditions. Once the promotional
            period ends, interest rates will revert to the standard rates
            available for your selected plan, as described on our platform.
            Applicable taxes and fees are subject to local regulations.
          </p>

          <p>
            INVESTMENT SERVICES: Your capital is at risk. The value of
            investments can go down as well as up, and you may receive back less
            than your original investment or lose it entirely. Past performance
            is not a reliable indicator of future results. Exchange rate
            fluctuations may also affect the overall return on your investments.
          </p>

          <p>
            The Piggy Bank Ltd. provides execution-only services for stocks and
            ETFs. We do not provide investment advice or personalized
            recommendations. As an independent investor, you are responsible for
            making your own investment decisions or seeking professional
            financial advice if you are unsure whether an investment is suitable
            for your personal circumstances. Please read our Terms of Business
            and Risk Disclosure before investing.
          </p>
        </div>
      </div>
    </section>
  );
};

export default UserCounterSection;