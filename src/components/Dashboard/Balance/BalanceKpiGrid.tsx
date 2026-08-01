
interface BalanceKpiGridProps {
  totalIncome: number;
  totalExpenses: number;
  netTotal: number;
}

export const BalanceKpiGrid: React.FC<BalanceKpiGridProps> = ({ totalIncome, totalExpenses, netTotal }) => {
  return (
    <div className="balance-kpi-custom-grid">
      {/* Tarjeta de Ingresos Totales */}
      <div className="kpi-custom-card">
        <span className="kpi-custom-label">Total Income</span>
        <div className="kpi-custom-value-row">
          <h2 className="kpi-custom-amount inc-text">
            +{totalIncome.toLocaleString("en-US", { style: "currency", currency: "EUR" })}
          </h2>
        </div>
      </div>

      {/* Tarjeta de Gastos Totales */}
      <div className="kpi-custom-card">
        <span className="kpi-custom-label">Total Expenses</span>
        <div className="kpi-custom-value-row">
          <h2 className="kpi-custom-amount exp-text">
            -{totalExpenses.toLocaleString("en-US", { style: "currency", currency: "EUR" })}
          </h2>
        </div>
      </div>

      {/* Tarjeta de Resultado Neto */}
      <div className="kpi-custom-card">
        <span className="kpi-custom-label">Net Result</span>
        <div className="kpi-custom-value-row">
          <h2 className="kpi-custom-amount" style={{ color: netTotal >= 0 ? "#10b981" : "#ef4444" }}>
            {netTotal >= 0 ? "+" : ""}
            {netTotal.toLocaleString("en-US", { style: "currency", currency: "EUR" })}
          </h2>
        </div>
      </div>
    </div>
  );
};