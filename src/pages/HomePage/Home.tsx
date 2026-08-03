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
  const progress = useScrollProgress(700);

  return (
    <div className="home-scroll-container">
      {/* Contenedor con efecto sticky para el Hero interactivo */}
      <div className="scroll-track">
        <div 
          className="sticky-viewport" 
          style={{ 
            backgroundColor: progress > 0.4 ? "#ffffff" : "transparent",
            backgroundImage: progress <= 0.4 ? "url('/hero.jpeg')" : "none",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            transition: "background-color 0.4s ease"
          }}
        >
          <HeroText progress={progress} />
          <GridText progress={progress} />
          <MorphGrid progress={progress} />
        </div>
      </div>

      {/* Secciones informativas de la landing page */}
      <SavingsTabsSection />
      <VirtualCardsSection />
      <SecuritySection />
      
      <StocksSection />
      <UserCounterSection />
      <AiAssistantSection />
      <PlanSelectionSection />
      <FooterMenu />
    </div>
  );
};

export default Home;