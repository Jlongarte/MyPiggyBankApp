import { useState, useEffect, useRef } from "react";

interface TabData {
  id: string;
  label: string;
  title: string;
  subtitle: string;
  amount: string;
  bgImage: string;
}

const tabs: TabData[] = [
  {
    id: "adventure",
    label: "Adventure",
    title: "Save with a 5% AER (variable)",
    subtitle: "Grow your money with interest paid every day. And withdraw anytime you need, with no penalties or fees.",
    amount: "£1,326",
    bgImage: "https://images.pexels.com/photos/20504932/pexels-photo-20504932.jpeg?_gl=1*fnh4w2*_ga*MTg2NjU5OTA5OC4xNzgzMDg1ODky*_ga_8JE65Q40S6*czE3ODMwODU4OTEkbzEkZzEkdDE3ODMwODU5MzYkajE1JGwwJGgw" 
  },
  {
    id: "wedding",
    label: "Wedding",
    title: "Save for your big day",
    subtitle: "Set up a shared pool or a personal vault to easily hit your wedding goals together, with daily returns.",
    amount: "€5,400",
    bgImage: "https://images.pexels.com/photos/30013220/pexels-photo-30013220.jpeg?_gl=1*1ciuxz3*_ga*MTg2NjU5OTA5OC4xNzgzMDg1ODky*_ga_8JE65Q40S6*czE3ODMwODU4OTEkbzEkZzEkdDE3ODMwODU5MDkkajQyJGwwJGgw" 
  },
  {
    id: "moving",
    label: "Moving",
    title: "Your dream house is closer",
    subtitle: "Keep your moving budget organized in multi-currency sub-accounts with instant access whenever plans change.",
    amount: "$4,780",
    bgImage: "https://images.pexels.com/photos/4545197/pexels-photo-4545197.jpeg?auto=compress&h=491&dpr=1" 
  }
];

const SavingsTabsSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
   
const handleScroll = () => {
  if (!containerRef.current) return;

  const rect = containerRef.current.getBoundingClientRect();
  const totalHeight = rect.height - window.innerHeight; 
  const scrolledIntoSection = -rect.top;

  if (scrolledIntoSection >= 0 && scrolledIntoSection <= totalHeight) {
    const progress = scrolledIntoSection / totalHeight;
    const currentTab = Math.min(tabs.length - 1, Math.floor(progress * tabs.length));
    setActiveIdx(currentTab);
  }
};

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="savings-scroll-wrapper" ref={containerRef}>
      <div className="savings-sticky-viewport">
        
        {/* ================= CAPA DE IMÁGENES EN CROSS-FADE ================= */}
        <div className="savings-bg-gallery">
          {tabs.map((tab, idx) => (
            <div
              key={tab.id}
              className={`savings-bg-slide ${idx === activeIdx ? "active" : ""}`}
              style={{ backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.1) 40%, rgba(0,0,0,0.5) 100%), url(${tab.bgImage})` }}
            />
          ))}
        </div>

        {/* ================= CONTENIDO TEXTO SUPERIOR ================= */}
        <div className="savings-top-content">
          <h2 className="savings-title">{tabs[activeIdx].title}</h2>
          <p className="savings-subtitle">{tabs[activeIdx].subtitle}</p>
          <span className="savings-disclaimer">Open an Instant Access Savings account between 5 June 2026 and 4 August 2026 to benefit from the boosted rate. T&Cs apply.</span>
          <button className="btn-explore-savings">Explore Savings</button>
        </div>

        {/* ================= TARJETA CENTRAL GLASSMORPHISM ================= */}
        <div className="savings-glass-card">
          <span className="glass-tag">{tabs[activeIdx].label === "Adventure" ? "New adventure" : tabs[activeIdx].label === "Wedding" ? "Big day" : "Dream house"}</span>
          <h3 className="glass-amount">{tabs[activeIdx].amount}</h3>
          <span className="glass-badge">Accounts</span>
          
          <div className="glass-actions">
            <span className="glass-btn-circle">+</span>
            <span className="glass-btn-circle">⇄</span>
            <span className="glass-btn-circle">🏛️</span>
            <span className="glass-btn-circle">•••</span>
          </div>
        </div>

        {/* ================= SELECTOR DE PESTAÑAS INFERIOR ================= */}
        <div className="savings-tabs-selector">
          {tabs.map((tab, idx) => (
            <button
              key={tab.id}
              className={`tab-pill-btn ${idx === activeIdx ? "active" : ""}`}
              onClick={() => {
                // Permitimos también interactuar haciendo click manual
                if (containerRef.current) {
                  const rect = containerRef.current.getBoundingClientRect();
                  const segmentHeight = (rect.height - window.innerHeight) / tabs.length;
                  window.scrollTo({
                    top: window.scrollY + rect.top + segmentHeight * idx + 50,
                    behavior: "smooth"
                  });
                }
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

      </div>
    </div>
  );
};

export default SavingsTabsSection;