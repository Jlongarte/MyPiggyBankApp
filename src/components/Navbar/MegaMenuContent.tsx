

const LINKEDIN_URL = "https://www.linkedin.com/in/janire-gonzalez-garayoa";

export const MegaMenuContent = () => {
  return (
    <>
      <div className="mega-menu-header">
        <a href={LINKEDIN_URL} target="_blank" rel="noreferrer" className="discover-link">
          Discover PiggyBank <span className="arrow">→</span>
        </a>
      </div>

      <div className="mega-menu-grid">
        {/* Columna 1 */}
        <div className="mega-col">
          <span className="col-title">Accounts</span>
          <a href={LINKEDIN_URL} target="_blank" rel="noreferrer" className="dropdown-link">
            <span>Bank Account</span> <span className="hover-arrow">→</span>
          </a>
          <a href={LINKEDIN_URL} target="_blank" rel="noreferrer" className="dropdown-link">
            <span>Joint Account</span> <span className="hover-arrow">→</span>
          </a>
          <a href={LINKEDIN_URL} target="_blank" rel="noreferrer" className="dropdown-link">
            <span>Savings Account</span> <span className="hover-arrow">→</span>
          </a>

          <span className="col-title margin-top">Smart Spending</span>
          <a href={LINKEDIN_URL} target="_blank" rel="noreferrer" className="dropdown-link">
            <span>Cards</span> <span className="hover-arrow">→</span>
          </a>
          <a href={LINKEDIN_URL} target="_blank" rel="noreferrer" className="dropdown-link">
            <span>Send & Receive</span> <span className="hover-arrow">→</span>
          </a>
        </div>

        {/* Columna 2 */}
        <div className="mega-col">
          <span className="col-title">Security & Protection</span>
          <a href={LINKEDIN_URL} target="_blank" rel="noreferrer" className="dropdown-link">
            <span>How We Protect Your Money</span> <span className="hover-arrow">→</span>
          </a>
          <a href={LINKEDIN_URL} target="_blank" rel="noreferrer" className="dropdown-link">
            <span>Report Lost Device</span> <span className="hover-arrow">→</span>
          </a>

          <span className="col-title margin-top">Investments</span>
          <a href={LINKEDIN_URL} target="_blank" rel="noreferrer" className="dropdown-link">
            <span>Stocks & Shares</span> <span className="hover-arrow">→</span>
          </a>
          <a href={LINKEDIN_URL} target="_blank" rel="noreferrer" className="dropdown-link">
            <span>Crypto Market</span> <span className="hover-arrow">→</span>
          </a>
        </div>

        {/* Columna 3 */}
        <div className="mega-col">
          <span className="col-title">Connectivity</span>
          <a href={LINKEDIN_URL} target="_blank" rel="noreferrer" className="dropdown-link">
            <span>Mobile Plans</span> <span className="hover-arrow">→</span>
          </a>

          <span className="col-title margin-top">Finances</span>
          <a href={LINKEDIN_URL} target="_blank" rel="noreferrer" className="dropdown-link">
            <span>International Transfers</span> <span className="hover-arrow">→</span>
          </a>

          <span className="col-title margin-top">Help</span>
          <a href={LINKEDIN_URL} target="_blank" rel="noreferrer" className="dropdown-link">
            <span>Contact Us</span> <span className="hover-arrow">→</span>
          </a>
        </div>

        {/* Columna 4 */}
        <div className="mega-col">
          <span className="col-title">Plans</span>
          <a href={LINKEDIN_URL} target="_blank" rel="noreferrer" className="dropdown-link">
            <span>Standard</span> <span className="hover-arrow">→</span>
          </a>
          <a href={LINKEDIN_URL} target="_blank" rel="noreferrer" className="dropdown-link">
            <span>Premium</span> <span className="hover-arrow">→</span>
          </a>
          <a href={LINKEDIN_URL} target="_blank" rel="noreferrer" className="dropdown-link">
            <span>Ultra</span> <span className="hover-arrow">→</span>
          </a>
        </div>
      </div>
    </>
  );
};