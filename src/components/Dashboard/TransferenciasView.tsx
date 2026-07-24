import { useState } from "react";

interface TransferenciasViewProps {
  onTransfer: (destinatario: string, monto: number) => void;
}

const TransferenciasView = ({ onTransfer }: TransferenciasViewProps) => {
  const [destinatario, setDestinatario] = useState("");
  const [monto, setMonto] = useState("");
  const contactos = ["Janire Longarte", "Carlos Mendoza", "Sara Peláez"];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!destinatario || !monto) return;
    onTransfer(destinatario, parseFloat(monto));
    setMonto("");
    setDestinatario("");
  };

  return (
    <div className="view-transferencias">
      <h3 className="section-internal-title">Enviar dinero a contactos</h3>
      
      <div className="contactos-flex">
        {contactos.map((c, i) => (
          <button key={i} type="button" className="contacto-card-btn" onClick={() => setDestinatario(c)}>
            <div className="contacto-avatar">{c.charAt(0)}</div>
            <div className="contacto-name">{c}</div>
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="transfer-revolut-form">
        <div className="revolut-input-box">
          <label>Destinatario</label>
          <input type="text" value={destinatario} onChange={(e) => setDestinatario(e.target.value)} placeholder="Nombre o IBAN" required />
        </div>
        <div className="revolut-input-box">
          <label>Monto a enviar (€)</label>
          <input type="number" value={monto} onChange={(e) => setMonto(e.target.value)} placeholder="0.00" required />
        </div>
        <button type="submit" className="btn-revolut-primary-action">Confirmar Envío Inmediato</button>
      </form>
    </div>
  );
};

export default TransferenciasView;