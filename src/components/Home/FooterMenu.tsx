

interface FooterColumn {
  title: string;
  links: string[];
}

const footerNavigation: FooterColumn[] = [
  { title: "Cripto", links: ["Criptomonedas", "PB Ramp", "PB X"] },
  { title: "Inversiones", links: ["Acciones", "Acciones y Cuentas ISA", "Materias Primas"] },
  { title: "Finanzas Globales", links: ["Transferencias Internacionales", "Salas VIP", "Seguros", "PB AI", "AIR"] },
  { title: "Ayuda", links: ["Contacto", "Centro de Ayuda", "Estado del Sistema", "API para Desarrolladores", "Mapa del Sitio"] },
  { title: "Seguridad y Protección", links: ["Cómo Protegemos tu Dinero", "Reportar Dispositivo Perdido", "Información sobre Fraudes", "Errores de Seguridad", "Informe de Seguridad"] },
  { title: "Planes", links: ["Standard", "Plus", "Premium", "Metal", "Ultra", "Comparar Planes"] },
  { title: "Cuentas", links: ["Cuenta Bancaria", "Cuenta Conjunta", "Cuenta Profesional", "Cuenta de Ahorros", "Para jóvenes de 16-17 años", "Padres y Tutores"] },
  { title: "Gasto Inteligente", links: ["Tarjetas", "Enviar y Recibir", "Gestión del Dinero", "RevPoints", "Cuentas Vinculadas", "Tiendas"] }
];

const legalLinks: string[] = [
  "Términos de la Web",
  "Acuerdos Legales",
  "Reclamaciones",
  "Privacidad",
  "Política contra la Esclavitud Moderna",
  "Vulnerabilidad del Cliente",
  "Declaración de Privacidad de Datos para Candidatos"
];

const FooterMenu: React.FC = () => {
  return (
    <footer className="pb-footer-menu-section">
      <div className="footer-global-wrapper">
        
        {/* ================= PARTE SUPERIOR: MEGAMENÚ (image_fa2000.png) ================= */}
        <div className="footer-menu-container">
          {footerNavigation.map((col, idx) => (
            <div key={idx} className="footer-menu-column">
              <h4 className="footer-column-title">{col.title}</h4>
              <ul className="footer-column-links">
                {col.links.map((link, linkIdx) => (
                  <li key={linkIdx}>
                    <a href={`#${link.toLowerCase().replace(/\s+/g, "-")}`} className="footer-link-item">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* ================= PARTE CENTRAL: BRANDING & RRSS ================= */}
        <div className="footer-brand-bar">
          <div className="footer-logo">The Piggy Bank</div>
          <div className="footer-socials">
            <a href="#facebook" className="social-icon">Meta</a>
            <a href="#instagram" className="social-icon">Insta</a>
            <a href="#x" className="social-icon">X</a>
            <a href="#linkedin" className="social-icon">In</a>
            <a href="#tiktok" className="social-icon">TikTok</a>
          </div>
        </div>

        {/* ================= PARTE INFERIOR: LEGAL & COPYRIGHT ================= */}
        <div className="footer-legal-bottom">
          <div className="footer-country-selector">
            <span className="country-flag">🇪🇸</span>
            <span className="country-name">España</span>
          </div>

          <div className="footer-legal-links-grid">
            {legalLinks.map((link, idx) => (
              <a key={idx} href={`#${link.toLowerCase().replace(/\s+/g, "-")}`} className="footer-legal-link">
                {link}
              </a>
            ))}
          </div>

          <div className="footer-copyright">
            © The Piggy Bank Europe SL 2026
          </div>
        </div>

      </div>
    </footer>
  );
};

export default FooterMenu;