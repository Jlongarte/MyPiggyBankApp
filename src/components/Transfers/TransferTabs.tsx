

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
        Enviar dinero
      </button>
      <button 
        className={`mode-tab-btn ${activeTab === "request" ? "active" : ""}`}
        onClick={() => onTabChange("request")}
      >
        Solicitar dinero
      </button>
    </div>
  );
};