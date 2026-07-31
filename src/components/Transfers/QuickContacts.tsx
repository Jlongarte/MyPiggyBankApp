

export interface Contact {
  name: string;
  username: string;
  avatar: string;
}

interface QuickContactsProps {
  contacts: Contact[];
  onSelectContact: (name: string) => void;
}

export const QuickContacts: React.FC<QuickContactsProps> = ({ contacts, onSelectContact }) => {
  return (
    <div className="contacts-section-wrapper">
      <span className="section-internal-title">Contactos frecuentes</span>
      <div className="contacts-grid-extended">
        {contacts.map((c, index) => (
          <button 
            key={index} 
            type="button" 
            className="contact-pill-card"
            onClick={() => onSelectContact(c.name)}
          >
            <div className="contact-avatar-circle">{c.avatar}</div>
            <div className="contact-info">
              <span className="c-name">{c.name}</span>
              <span className="c-user">{c.username}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};