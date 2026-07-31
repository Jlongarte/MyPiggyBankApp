interface BalanceKpiGridProps {
  totalIncome: number;
  totalExpenses: number;
  netTotal: number;
}

export const BalanceKpiGrid = ({ totalIncome, totalExpenses, netTotal }: BalanceKpiGridProps) => {
  return (
    <div className="balance-kpi-grid">
      {/* Tarjeta de Ingresos Totales */}
      <div className="kpi-card">
        <span className="kpi-label">Total Income</span>
        <div className="kpi-value-row">
          <h2 className="kpi-amount inc-text">
            +{totalIncome.toLocaleString("en-US", { style: "currency", currency: "EUR" })}
          </h2>
        </div>
      </div>

      {/* Tarjeta de Gastos Totales */}
      <div className="kpi-card">
        <span className="kpi-label">Total Expenses</span>
        <div className="kpi-value-row">
          <h2 className="kpi-amount exp-text">
            -{totalExpenses.toLocaleString("en-US", { style: "currency", currency: "EUR" })}
          </h2>
        </div>
      </div>

      {/* Tarjeta de Resultado Neto */}
      <div className="kpi-card">
        <span className="kpi-label">Net Result</span>
        <div className="kpi-value-row">
          <h2 className="kpi-amount" style={{ color: netTotal >= 0 ? "#10b981" : "#ef4444" }}>
            {netTotal >= 0 ? "+" : ""}
            {netTotal.toLocaleString("en-US", { style: "currency", currency: "EUR" })}
          </h2>
        </div>
      </div>
    </div>
  );
};