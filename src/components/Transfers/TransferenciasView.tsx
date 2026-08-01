
import { useState } from "react";
import { TransferTabs } from "./TransferTabs";
import { TransferForm } from "./TransferForm";
import { QuickContacts, type Contact } from "./QuickContacts";
import { TransferHistory, type TransactionItem } from "./TransferHistory";
import "../../styles/Transferencias.css"

interface TransferenciasViewProps {
  onTransfer: (destinatario: string, monto: number) => void;
}

export const TransferenciasView = ({ onTransfer }: TransferenciasViewProps) => {
  const [activeTab, setActiveTab] = useState<"send" | "request">("send");
  const [recipient, setRecipient] = useState("");
  const [popupMessage, setPopupMessage] = useState<string | null>(null);

  const contacts: Contact[] = [
    { name: "Janire G", username: "@janire", avatar: "JG" },
    { name: "Carlos Mendoza", username: "@carlosm", avatar: "CM" },
    { name: "Sara Peláez", username: "@sara_p", avatar: "SP" },
    { name: "Alex Rivero", username: "@rivero", avatar: "AR" },
    { name: "Lucía Torres", username: "@lucia_t", avatar: "LT" },
    { name: "David Gómez", username: "@dgomez", avatar: "DG" },
  ];

  const [history, setHistory] = useState<TransactionItem[]>([
    { id: "1", concept: "Transfer to Carlos Mendoza", date: "Today, 12:15", amount: "-50.00 €", isPositive: false, type: "sent" },
    { id: "2", concept: "Received from Sara Peláez", date: "Yesterday, 18:30", amount: "+120.00 €", isPositive: true, type: "received" },
  ]);

  const handleFormSubmit = (amount: number) => {
    if (activeTab === "send") {
      onTransfer(recipient, amount);
      const newTx: TransactionItem = {
        id: Date.now().toString(),
        concept: `Transfer to ${recipient}`,
        date: "Just now",
        amount: `-${amount.toFixed(2)} €`,
        isPositive: false,
        type: "sent",
      };
      setHistory([newTx, ...history]);
      setPopupMessage(`Transfer of ${amount.toFixed(2)} € sent successfully to ${recipient}!`);
    } else {
      const newTx: TransactionItem = {
        id: Date.now().toString(),
        concept: `Requested from ${recipient}`,
        date: "Just now",
        amount: `+${amount.toFixed(2)} €`,
        isPositive: true,
        type: "requested",
      };
      setHistory([newTx, ...history]);
      setPopupMessage("Request sent!");
    }

    setRecipient("");
  };

  return (
    <div className="transfers-container-modern">
      {popupMessage && (
        <div className="transfer-popup-overlay">
          <div className="transfer-popup-card">
            <div className="popup-icon-success">✓</div>
            <h3>{popupMessage}</h3>
            <button className="btn-popup-close" onClick={() => setPopupMessage(null)}>
              Aceptar
            </button>
          </div>
        </div>
      )}

      <div className="transfers-main-column">
        <TransferTabs activeTab={activeTab} onTabChange={setActiveTab} />
        
        <TransferForm 
          activeTab={activeTab}
          recipient={recipient}
          onRecipientChange={setRecipient}
          onSubmit={handleFormSubmit}
        />

        <QuickContacts 
          contacts={contacts} 
          onSelectContact={setRecipient} 
        />
      </div>

      <TransferHistory history={history} />
    </div>
  );
};

export default TransferenciasView;