// src/components/Dashboard/TransactionDetailDrawer.tsx
import React from "react";
import { type Transaction } from "./TransactionList";

interface TransactionDetailDrawerProps {
  transaction: Transaction | null;
  onClose: () => void;
}

export const TransactionDetailDrawer: React.FC<TransactionDetailDrawerProps> = ({ transaction, onClose }) => {
  if (!transaction) return null;

  const mapQuery = encodeURIComponent(transaction.address || transaction.concept || "Madrid");
  const mapEmbedUrl = `https://maps.google.com/maps?q=${mapQuery}&t=&z=15&ie=UTF8&iwloc=&output=embed`;

  return (
    <div className="tx-drawer-overlay" onClick={onClose}>
      <div className="tx-drawer-panel" onClick={(e) => e.stopPropagation()}>
        {/* Drawer Header */}
        <div className="tx-drawer-header">
          <h3>Transaction details</h3>
          <button className="tx-drawer-close-btn" onClick={onClose}>✕</button>
        </div>

        {/* Main Details Body */}
        <div className="tx-drawer-body">
          <div className="tx-drawer-amount-section">
            <div className={`tx-drawer-amount ${transaction.isPositive ? "positive" : "negative"}`}>
              {transaction.amount}
            </div>
            {transaction.secondaryAmount && (
              <div className="tx-drawer-subamount">{transaction.secondaryAmount}</div>
            )}
            <div className="tx-drawer-concept">{transaction.concept}</div>
            <div className="tx-drawer-date">{transaction.date}</div>
          </div>

          <div className="tx-drawer-section-divider" />

          {/* Location and Map Section */}
          <div className="tx-location-section">
            <span className="section-internal-title">Merchant location</span>
            <p className="tx-address-text">
              📍 {transaction.address || "Main Street 45, Suite 2, Madrid, Spain"}
            </p>

            <div className="tx-map-container">
              <iframe
                title="map-location"
                src={mapEmbedUrl}
                width="100%"
                height="180"
                style={{ border: 0, borderRadius: "14px" }}
                allowFullScreen={false}
                loading="lazy"
              />
            </div>
          </div>

          {/* Additional Info Section */}
          <div className="tx-extra-info">
            <div className="info-row">
              <span className="info-label">Status</span>
              <span className="info-value status-success">Completed</span>
            </div>
            <div className="info-row">
              <span className="info-label">Payment type</span>
              <span className="info-value">Physical card with chip</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};