import { useState } from "react";
import { BalanceKpiGrid } from "./BalanceKpiGrid";
import { BalanceChart, type TimeRange } from "./BalanceChart";

export const BalanceView = () => {
  const [timeRange, setTimeRange] = useState<TimeRange>("1M");

  // Obtener datos comparativos según el filtro temporal seleccionado
  const getComparativeData = () => {
    switch (timeRange) {
      case "1W":
        return {
          categories: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
          income: [150, 0, 350, 0, 1200, 0, 0],
          expenses: [45, 80, 120, 30, 210, 150, 95],
          balance: [105, -80, 230, -30, 990, -150, -95]
        };
      case "1M":
      default:
        return {
          categories: ["Week 1", "Week 2", "Week 3", "Week 4"],
          income: [1200, 450, 800, 1500],
          expenses: [350, 620, 290, 819],
          balance: [850, -170, 510, 681]
        };
      case "6M":
        return {
          categories: ["Feb", "Mar", "Apr", "May", "Jun", "Jul"],
          income: [2100, 1950, 2300, 2100, 2500, 2800],
          expenses: [1400, 1800, 1250, 1600, 1750, 1920],
          balance: [700, 150, 1050, 500, 750, 880]
        };
      case "1Y":
        return {
          categories: ["Jan", "Mar", "May", "Jul", "Sep", "Nov"],
          income: [2000, 2200, 2100, 2400, 2300, 2900],
          expenses: [1500, 1600, 1700, 1800, 1400, 2100],
          balance: [500, 600, 400, 600, 900, 800]
        };
    }
  };

  const currentData = getComparativeData();

  // Calcular totales para los KPIs
  const totalIncome = currentData.income.reduce((a, b) => a + b, 0);
  const totalExpenses = currentData.expenses.reduce((a, b) => a + b, 0);
  const netTotal = totalIncome - totalExpenses;

  return (
    <div className="view-balance-pro">
      {/* Tarjetas KPI de resumen superior */}
      <BalanceKpiGrid
        totalIncome={totalIncome}
        totalExpenses={totalExpenses}
        netTotal={netTotal}
      />

      {/* Gráfico y filtros temporales */}
      <BalanceChart
        timeRange={timeRange}
        onTimeRangeChange={setTimeRange}
        currentData={currentData}
      />
    </div>
  );
};

export default BalanceView;