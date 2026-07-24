
import type { Transaction } from "../../types"; 

interface InicioViewProps {
  transactions: Transaction[];
}

const InicioView = ({ transactions }: InicioViewProps) => {
  return (
    <div className="view-inicio">
      <div className="balance-header-block">
        <div className="balance-main-amount">
          26,31 € <span className="arrow-down-indicator">▼</span>
        </div>
        <div className="balance-subtitle">🇬🇧 Personal · GBP</div>
      </div>

      <div className="tx-list-title-row">
        <span>Historial de transacciones</span>
        <button className="btn-text-only">Ver todo</button>
      </div>

      <div className="revolut-tx-list">
        {transactions.map((tx) => (
          <div key={tx.id} className="revolut-tx-row">
            <div className="tx-row-left">
              {/* Usamos el tipo "income" o "expense" */}
              <div className={`tx-avatar-circle ${tx.type === "expense" ? "exp" : "inc"}`}>
                {tx.concept.charAt(0)}
              </div>
              <div>
                <div className="tx-concept-text">{tx.concept}</div>
                <div className="tx-date-text">
                  {tx.date} • <span className="tx-category-badge">{tx.category}</span>
                </div>
              </div>
            </div>
            <div className={`tx-amount-text ${tx.type === "expense" ? "negative" : "positive"}`}>
              {tx.type === "income" ? "+" : ""}{tx.amount.toFixed(2)} EUR
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InicioView;