

interface PlanCard {
  id: string;
  name: string;
  price: string;
  description: string;
  isWide?: boolean; 
}

const plansData: PlanCard[] = [
  {
    id: "standard",
    name: "Standard",
    price: "Gratis",
    description: "Para las finanzas básicas: todo lo que necesitas para gestionar mejor tu dinero en un solo lugar. Enviar dinero al extranjero o ceñirte a un presupuesto nunca ha sido tan fácil."
  },
  {
    id: "plus",
    name: "Plus",
    price: "3,99 €/mes",
    description: "Para los que gastan de forma inteligente: accede a ventajas adicionales como límites más altos para gastar en el extranjero y seguros para tus compras cotidianas por una cuota mensual asequible."
  },
  {
    id: "premium",
    name: "Premium",
    price: "7,99 €/mes",
    description: "Para elevar tu día a día: accede a suscripciones exclusivas, mejores tasas de ahorro e intercambio de divisas sin límites."
  },
  {
    id: "metal",
    name: "Metal",
    price: "14,99 €/mes",
    description: "Para viajeros globales y operadores: relájate con seguro de viaje premium, límites mejorados y suscripciones asociadas valoradas en más de 2.200 € al año.",
    isWide: true
  },
  {
    id: "ultra",
    name: "Ultra",
    price: "55 €/mes (oferta de lanzamiento)",
    description: "Para quienes buscan lo mejor de The Piggy Bank: obtén beneficios excepcionales como acceso ilimitado a salas VIP de aeropuertos, datos globales mensuales, suscripciones premium asociadas y cobertura de cancelación.",
    isWide: true
  }
];

const PlanSelectionSection: React.FC = () => {
  return (
    <section className="pb-plans-section">
      <div className="plans-container">
        
        <h2 className="plans-main-title">Elige tu plan</h2>

        {/* REJILLA DE TARJETAS ASIMÉTRICA */}
        <div className="plans-grid">
          {plansData.map((plan) => (
            <div 
              key={plan.id} 
              className={`plan-card-item ${plan.isWide ? "card-wide" : "card-standard"}`}
            >
              <div className="plan-card-header">
                <h3 className="plan-name">{plan.name}</h3>
                <p className="plan-price">{plan.price}</p>
              </div>
              
              <p className="plan-description">{plan.description}</p>
              
              {/* BOTÓN INTERACTIVO DE LA FLECHA */}
              <div className="plan-arrow-btn">
                <svg 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2.5" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                  className="arrow-icon-svg"
                >
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default PlanSelectionSection;