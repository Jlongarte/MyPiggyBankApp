// src/components/Dashboard/TransactionList.tsx
import React from "react";

export interface Transaction {
  id: string;
  concept: string;
  date: string;
  amount: string;
  secondaryAmount?: string;
  isPositive: boolean;
  icon?: string;
  logoUrl?: string;
}

interface TransactionListProps {
  transactions: Transaction[];
  onViewAll?: () => void;
}

export const TransactionList: React.FC<TransactionListProps> = ({ transactions, onViewAll }) => {
  return (
    <div className="revolut-dashboard-card" style={{ background: "transparent", border: "none", padding: "0" }}>
      <div className="revolut-tx-list">
        {transactions.map((tx) => (
          <div key={tx.id} className="revolut-tx-row" style={{ background: "transparent" }}>
            <div className="tx-row-left">
              {tx.logoUrl ? (
                <div className="tx-logo-circle" style={{ 
                  width: "42px", 
                  height: "42px", 
                  borderRadius: "50%", 
                  backgroundColor: "#ffffff", 
                  display: "flex", 
                  alignItems: "center", 
                  justifyContent: "center",
                  overflow: "hidden",
                  border: "1px solid rgba(255,255,255,0.08)"
                }}>
                  <img src={tx.logoUrl} alt={tx.concept} style={{ width: "70%", height: "70%", objectFit: "contain" }} />
                </div>
              ) : (
                <div className={`tx-avatar-circle ${tx.isPositive ? "inc" : "exp"}`}>
                  {tx.icon}
                </div>
              )}
              <div>
                <div className="tx-concept-text">{tx.concept}</div>
                <div className="tx-date-text">{tx.date}</div>
              </div>
            </div>
            
            <div style={{ textAlign: "right" }}>
              <div className={`tx-amount-text ${tx.isPositive ? "positive" : "negative"}`}>
                {tx.amount}
              </div>
              {tx.secondaryAmount && (
                <div style={{ fontSize: "0.8rem", color: "#5f6670", marginTop: "2px", fontWeight: 500 }}>
                  {tx.secondaryAmount}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <div style={{ textAlign: "center", marginTop: "28px" }}>
        <button className="btn-text-only" onClick={onViewAll} style={{ fontSize: "0.95rem", color: "#ffffff", fontWeight: 600, background: "transparent" }}>
          Ver todo
        </button>
      </div>
    </div>
  );
};