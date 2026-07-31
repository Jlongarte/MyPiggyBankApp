
import { useState, FormEvent, useEffect } from "react"; 

interface TransferFormProps {
  activeTab: "send" | "request";
  recipient: string;
  onRecipientChange: (value: string) => void;
  onSubmit: (amount: number) => void;
}

export const TransferForm: React.FC<TransferFormProps> = ({
  activeTab,
  recipient,
  onRecipientChange,
  onSubmit,
}) => {
  const [amount, setAmount] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!recipient || !amount) return;
    onSubmit(parseFloat(amount));
    setAmount("");
  };

  return (
    <form onSubmit={handleSubmit} className="transfer-card-clean">
      <div className="revolut-input-box">
        <label>
          {activeTab === "send" ? "Enviar a (Nombre, @usuario o IBAN)" : "Solicitar a (Nombre o @usuario)"}
        </label>
        <input 
          type="text" 
          value={recipient} 
          onChange={(e) => onRecipientChange(e.target.value)} 
          placeholder="Ej. Janire Longarte o @usuario" 
          required 
        />
      </div>

      <div className="revolut-input-box">
        <label>Cantidad (€)</label>
        <div className="input-currency-wrapper">
          <input 
            type="number" 
            step="0.01" 
            value={amount} 
            onChange={(e) => setAmount(e.target.value)} 
            placeholder="0.00" 
            required 
          />
          <span className="currency-tag">EUR</span>
        </div>
      </div>

      <button type="submit" className="btn-revolut-primary-action">
        {activeTab === "send" ? "Enviar transferencia" : "Solicitar dinero"}
      </button>
    </form>
  );
};