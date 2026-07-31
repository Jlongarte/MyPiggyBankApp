

export interface TransactionItem {
  id: string;
  concept: string;
  date: string;
  amount: string;
  isPositive: boolean;
  type: "sent" | "received" | "requested";
}

interface TransferHistoryProps {
  history: TransactionItem[];
}

export const TransferHistory: React.FC<TransferHistoryProps> = ({ history }) => {
  return (
    <div className="transfers-history-column">
      <span className="section-internal-title">Actividad de transferencias</span>
      
      <div className="transfers-history-list">
        {history.length === 0 ? (
          <p className="no-history-text">No hay transferencias recientes</p>
        ) : (
          history.map((item) => (
            <div key={item.id} className="history-item-row">
              <div className="history-left">
                <div className={`history-icon-badge ${item.type}`}>
                  {item.type === "sent" ? "↗" : item.type === "received" ? "↙" : "⟳"}
                </div>
                <div>
                  <div className="history-concept">{item.concept}</div>
                  <div className="history-date">{item.date}</div>
                </div>
              </div>
              <div className={`history-amount ${item.isPositive ? "positive" : "negative"}`}>
                {item.amount}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};