// src/features/home/Home.tsx
import { useState, useEffect } from "react";
import HeroText from "../components/Home/HeroText";
import GridText from "../components/Home/GridText";
import MorphGrid from "../components/Home/MorphGrid";
import "../styles/Home.css";
import SecuritySection from "../components/Home/SecuritySection";
import SavingsTabsSection from "../components/Home/SavingsTabsSection";
import VirtualCardsSection from "../components/Home/VirtualCardsSection";
import AiAssistantSection from "../components/Home/AiAssistantSection";
import StocksSection from "../components/Home/StocksSection";
import UserCounterSection from "../components/Home/UserCounterSection";
import PlanSelectionSection from "../components/Home/PlanSelectionSection";
import FooterMenu from "../components/Home/FooterMenu";

const Home = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const maxScroll = 700;
      const currentProgress = Math.min(1, Math.max(0, window.scrollY / maxScroll));
      setProgress(currentProgress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="home-scroll-container">
      <div className="scroll-track">
        <div className="sticky-viewport" style={{
          backgroundColor: progress > 0.5 ? "#ffffff" : "#2182ca"
        }}>
          {/* Repartimos el progreso a cada pieza del puzle */}
          <HeroText progress={progress} />
          <GridText progress={progress} />
          <MorphGrid progress={progress} />
        </div>
      </div>
      <SavingsTabsSection />
        <SecuritySection />
        <VirtualCardsSection />
        <StocksSection />
        <UserCounterSection />
        <AiAssistantSection />
        <PlanSelectionSection />
        <FooterMenu/>
        
      
    </div>
  );
};

export default Home;