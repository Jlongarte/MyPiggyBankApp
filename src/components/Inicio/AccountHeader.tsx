

interface AccountHeaderProps {
  balance: string;
  currencySymbol: string;
  accountType: string;
  countryFlag: string;
  onDownloadStatement: () => void;
}

export const AccountHeader: React.FC<AccountHeaderProps> = ({
  balance,
  currencySymbol,
  accountType,
  countryFlag,
  onDownloadStatement,
}) => {
  return (
    <div className="revolut-top-bar" style={{ marginBottom: "24px", background: "transparent" }}>
      <div className="balance-header-block" style={{ margin: 0 }}>
        <div className="balance-main-amount" style={{ fontSize: "2.2rem" }}>
          {balance} {currencySymbol} <span style={{ fontSize: "1.1rem", color: "#5f6670" }}>▼</span>
        </div>
        <div className="balance-subtitle" style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <span>{countryFlag}</span> {accountType}
        </div>
      </div>

      <div className="revolut-top-actions">
        <button className="btn-revolut-secondary" onClick={onDownloadStatement}>
          Extracto
        </button>
      </div>
    </div>
  );
};