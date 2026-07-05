
import { useState } from 'react';
import"../styles/Services.css";

interface Contact {
  id: string;
  name: string;
  email: string;
  initials: string;
}

const Services: React.FC = () => {
  // Lista de contactos agendados simulada
  const [contacts] = useState<Contact[]>([
    { id: "c1", name: "María López", email: "maria@email.com", initials: "ML" },
    { id: "c2", name: "Juan Pérez", email: "juan@email.com", initials: "JP" },
    { id: "c3", name: "Carlos Mendoza", email: "carlos@email.com", initials: "CM" },
    { id: "c4", name: "Ana Gómez", email: "ana@email.com", initials: "AG" },
  ]);

  // Estado para saber a qué contacto le queremos enviar dinero
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [amount, setAmount] = useState<string>('');

  const handleTransferSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedContact || !amount) return;

    alert(`¡Transferencia de $${amount} enviada con éxito a ${selectedContact.name}!`);
    
    // Limpiamos el formulario tras el envío
    setAmount('');
    setSelectedContact(null);
  };

  return (
    <div className="services-container">
      <h2>Servicios de Transferencia</h2>
      <p>Selecciona un contacto frecuente para realizar un envío rápido de dinero:</p>

      {/* Grid de contactos */}
      <div className="contacts-grid">
        {contacts.map((contact) => (
          <div 
            key={contact.id} 
            className="contact-card" 
            onClick={() => setSelectedContact(contact)}
          >
            <div className="avatar">{contact.initials}</div>
            <h3>{contact.name}</h3>
            <p>{contact.email}</p>
          </div>
        ))}
      </div>

      {/* Formulario dinámico: solo aparece si haces clic en un contacto */}
      {selectedContact && (
        <div className="transfer-box">
          <h4>Enviar dinero a: {selectedContact.name}</h4>
          <form onSubmit={handleTransferSubmit}>
            <div className="form-group">
              <label htmlFor="amount">Monto a transferir ($)</label>
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
            <button type="submit" className="btn-buy">Confirmar Envío</button>
            <button 
              type="button" 
              className="btn-buy" 
              style={{ backgroundColor: '#6c757d', marginTop: '5px' }}
              onClick={() => setSelectedContact(null)}
            >
              Cancelar
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Services;