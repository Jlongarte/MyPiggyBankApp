

interface TransferTabsProps {
  activeTab: "send" | "request";
  onTabChange: (tab: "send" | "request") => void;
}

export const TransferTabs: React.FC<TransferTabsProps> = ({ activeTab, onTabChange }) => {
  return (
    <div className="transfers-mode-tabs">
      <button 
        className={`mode-tab-btn ${activeTab === "send" ? "active" : ""}`}
        onClick={() => onTabChange("send")}
      >
        Send Transfer
      </button>
      <button 
        className={`mode-tab-btn ${activeTab === "request" ? "active" : ""}`}
        onClick={() => onTabChange("request")}
      >
        Request Money
      </button>
    </div>
  );
};