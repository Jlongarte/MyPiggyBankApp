import { useState, FormEvent } from "react"; 

interface Contact {
  id: string;
  name: string;
  email: string;
  initials: string;
}

interface TransferModalFormProps {
  selectedContact: Contact;
  onSubmit: (amount: string) => void;
  onCancel: () => void;
}

export const TransferModalForm = ({ selectedContact, onSubmit, onCancel }: TransferModalFormProps) => {
  const [amount, setAmount] = useState<string>("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!amount) return;
    onSubmit(amount);
    setAmount("");
  };

  return (
    <div className="transfer-box">
      <h4>Send money to: {selectedContact.name}</h4>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="amount">Amount to transfer (€)</label>
          <input 
            type="number" 
            id="amount"
            min="1"
            step="0.01"
            placeholder="0.00"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn-buy">Confirm Transfer</button>
        <button 
          type="button" 
          className="btn-buy" 
          style={{ backgroundColor: "#6c757d", marginTop: "5px" }}
          onClick={onCancel}
        >
          Cancel
        </button>
      </form>
    </div>
  );
};