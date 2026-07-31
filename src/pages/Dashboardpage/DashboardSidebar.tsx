// src/components/Dashboard/DashboardSidebar.tsx
import { 
  Home, 
  BarChart2, 
  Send, 
  Coins, 
  Bot 
} from "lucide-react";

export type TabType = "inicio" | "balance" | "transferencias" | "crypto" | "assistance";

interface DashboardSidebarProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

export const DashboardSidebar = ({ activeTab, onTabChange }: DashboardSidebarProps) => {
  return (
    <aside className="revolut-sidebar">
      <div className="revolut-sidebar-logo">🐷</div>

      <nav className="revolut-sidebar-nav">
        <button
          className={`nav-item-btn ${activeTab === "inicio" ? "active" : ""}`}
          onClick={() => onTabChange("inicio")}
        >
          <div className="nav-icon-wrapper">
            <Home size={22} strokeWidth={2} />
          </div>
          <span className="nav-text">Home</span>
        </button>

        <button
          className={`nav-item-btn ${activeTab === "balance" ? "active" : ""}`}
          onClick={() => onTabChange("balance")}
        >
          <div className="nav-icon-wrapper">
            <BarChart2 size={22} strokeWidth={2} />
          </div>
          <span className="nav-text">Balance</span>
        </button>

        <button
          className={`nav-item-btn ${activeTab === "transferencias" ? "active" : ""}`}
          onClick={() => onTabChange("transferencias")}
        >
          <div className="nav-icon-wrapper">
            <Send size={22} strokeWidth={2} />
          </div>
          <span className="nav-text">Transfer</span>
        </button>

        <button
          className={`nav-item-btn ${activeTab === "crypto" ? "active" : ""}`}
          onClick={() => onTabChange("crypto")}
        >
          <div className="nav-icon-wrapper">
            <Coins size={22} strokeWidth={2} />
          </div>
          <span className="nav-text">Crypto</span>
        </button>

        <button
          className={`nav-item-btn ${activeTab === "assistance" ? "active" : ""}`}
          onClick={() => onTabChange("assistance")}
        >
          <div className="nav-icon-wrapper">
            <Bot size={22} strokeWidth={2} />
          </div>
          <span className="nav-text">Assistant</span>
        </button>
      </nav>
    </aside>
  );
};