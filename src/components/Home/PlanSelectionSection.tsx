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
    price: "Free",
    description:
      "For everyday banking: everything you need to manage your money better in one place. Sending money abroad or sticking to a budget has never been easier.",
  },
  {
    id: "plus",
    name: "Plus",
    price: "€3.99/month",
    description:
      "For smart spenders: unlock extra benefits like higher overseas spending limits and insurance for your everyday purchases, all for an affordable monthly fee.",
  },
  {
    id: "premium",
    name: "Premium",
    price: "€7.99/month",
    description:
      "To elevate your everyday life: enjoy exclusive subscriptions, better savings rates, and unlimited foreign exchange.",
  },
  {
    id: "metal",
    name: "Metal",
    price: "€14.99/month",
    description:
      "For global travelers and traders: relax with premium travel insurance, enhanced limits, and partner subscriptions worth over €2,200 per year.",
    isWide: true,
  },
  {
    id: "ultra",
    name: "Ultra",
    price: "€55/month (launch offer)",
    description:
      "For those who want the very best of The Piggy Bank: enjoy exceptional perks such as unlimited airport lounge access, monthly global data, premium partner subscriptions, and trip cancellation coverage.",
    isWide: true,
  },
];

const PlanSelectionSection: React.FC = () => {
  return (
    <section className="pb-plans-section">
      <div className="plans-container">
        <h2 className="plans-title">Choose your plan</h2>

        {/* REJILLA DE TARJETAS ASIMÉTRICA */}
        <div className="plans-grid">
          {plansData.map((plan) => (
            <div
              key={plan.id}
              className={`plan-card-item ${
                plan.isWide ? "card-wide" : "card-standard"
              }`}
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