// src/features/home/Home.tsx
import { useScrollProgress } from "../../hooks/useScrollProgress";
import HeroText from "../../components/Home/HeroText";
import GridText from "../../components/Home/GridText";
import MorphGrid from "../../components/Home/MorphGrid";
import SecuritySection from "../../components/Home/SecuritySection";
import SavingsTabsSection from "../../components/Home/SavingsTabsSection";
import VirtualCardsSection from "../../components/Home/VirtualCardsSection";
import AiAssistantSection from "../../components/Home/AiAssistantSection";
import StocksSection from "../../components/Home/StocksSection";
import UserCounterSection from "../../components/Home/UserCounterSection";
import PlanSelectionSection from "../../components/Home/PlanSelectionSection";
import FooterMenu from "../../components/Home/FooterMenu";
import "../../styles/Home.css";

const Home = () => {
  // Obtener el progreso de desplazamiento mediante nuestro hook personalizado
  const progress = useScrollProgress(700);

  return (
    <div className="home-scroll-container">
      {/* Contenedor con efecto sticky para el Hero interactivo */}
      <div className="scroll-track">
        <div 
          className="sticky-viewport" 
          style={{ backgroundColor: progress > 0.5 ? "#ffffff" : "#2182ca" }}
        >
          {/* Repartimos el progreso a cada pieza del puzle visual */}
          <HeroText progress={progress} />
          <GridText progress={progress} />
          <MorphGrid progress={progress} />
        </div>
      </div>

      {/* Secciones informativas de la landing page */}
      <SavingsTabsSection />
      <SecuritySection />
      <VirtualCardsSection />
      <StocksSection />
      <UserCounterSection />
      <AiAssistantSection />
      <PlanSelectionSection />
      <FooterMenu />
    </div>
  );
};

export default Home;