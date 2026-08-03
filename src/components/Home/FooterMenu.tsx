interface FooterColumn {
  title: string;
  links: string[];
}

const footerNavigation: FooterColumn[] = [
  {
    title: "Crypto",
    links: ["Cryptocurrencies", "PB Ramp", "PB X"],
  },
  {
    title: "Investments",
    links: ["Stocks", "Stocks & ISA Accounts", "Commodities"],
  },
  {
    title: "Global Finance",
    links: [
      "International Transfers",
      "Airport Lounges",
      "Insurance",
      "PB AI",
      "AI",
    ],
  },
  {
    title: "Help",
    links: [
      "Contact",
      "Help Center",
      "System Status",
      "Developer API",
      "Sitemap",
    ],
  },
  {
    title: "Security & Protection",
    links: [
      "How We Protect Your Money",
      "Report a Lost Device",
      "Fraud Information",
      "Security Issues",
      "Security Report",
    ],
  },
  {
    title: "Plans",
    links: [
      "Standard",
      "Plus",
      "Premium",
      "Metal",
      "Ultra",
      "Compare Plans",
    ],
  },
  {
    title: "Accounts",
    links: [
      "Bank Account",
      "Joint Account",
      "Business Account",
      "Savings Account",
      "For ages 16–17",
      "Parents & Guardians",
    ],
  },
  {
    title: "Smart Spending",
    links: [
      "Cards",
      "Send & Receive",
      "Money Management",
      "RevPoints",
      "Linked Accounts",
      "Shops",
    ],
  },
];

const legalLinks: string[] = [
  "Website Terms",
  "Legal Agreements",
  "Complaints",
  "Privacy",
  "Modern Slavery Policy",
  "Customer Vulnerability",
  "Candidate Data Privacy Notice",
];

const FooterMenu: React.FC = () => {
  return (
    <footer className="pb-footer-menu-section">
      <div className="footer-global-wrapper">
        {/* ================= PARTE SUPERIOR: MEGAMENÚ ================= */}
        <div className="footer-menu-container">
          {footerNavigation.map((col, idx) => (
            <div key={idx} className="footer-menu-column">
              <h4 className="footer-column-title">{col.title}</h4>
              <ul className="footer-column-links">
                {col.links.map((link, linkIdx) => (
                  <li key={linkIdx}>
                    <a
                      href={`#${link.toLowerCase().replace(/\s+/g, "-")}`}
                      className="footer-link-item"
                    >
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
            <a href="#facebook" className="social-icon">
              Meta
            </a>
            <a href="#instagram" className="social-icon">
              Insta
            </a>
            <a href="#x" className="social-icon">
              X
            </a>
            <a href="#linkedin" className="social-icon">
              In
            </a>
            <a href="#tiktok" className="social-icon">
              TikTok
            </a>
          </div>
        </div>

        {/* ================= PARTE INFERIOR: LEGAL & COPYRIGHT ================= */}
        <div className="footer-legal-bottom">
          <div className="footer-country-selector">
            <span className="country-flag">🇪🇸</span>
            <span className="country-name">Spain</span>
          </div>

          <div className="footer-legal-links-grid">
            {legalLinks.map((link, idx) => (
              <a
                key={idx}
                href={`#${link.toLowerCase().replace(/\s+/g, "-")}`}
                className="footer-legal-link"
              >
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