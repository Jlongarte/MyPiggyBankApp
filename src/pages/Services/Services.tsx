import { useState } from "react";
import { TransferModalForm } from "./TransferModalForm";
import "../../styles/Services.css";

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

  // Estado para saber a qué contacto se le quiere enviar dinero
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);

  // Manejar el envío de la transferencia
  const handleTransferSubmit = (amount: string) => {
    if (!selectedContact) return;
    alert(`Transfer of €${amount} successfully sent to ${selectedContact.name}!`);
    setSelectedContact(null);
  };

  return (
    <div className="services-container">
      <h2>Transfer Services</h2>
      <p>Select a frequent contact to make a fast money transfer:</p>

      {/* Cuadrícula de contactos */}
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

      {/* Formulario dinámico encapsulado: solo aparece si hay un contacto seleccionado */}
      {selectedContact && (
        <TransferModalForm
          selectedContact={selectedContact}
          onSubmit={handleTransferSubmit}
          onCancel={() => setSelectedContact(null)}
        />
      )}
    </div>
  );
};

export default Services;