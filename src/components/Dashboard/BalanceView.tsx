// src/components/Dashboard/BalanceView.tsx
import { useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";

// Interfaces de tipos
type TimeRange = "1W" | "1M" | "6M" | "1Y";

interface DataPoint {
  date: string;
  balance: number;
  income: number;
  expenses: number;
}

// Datos de ejemplo enriquecidos para diferentes rangos
const timeSeriesData: Record<TimeRange, DataPoint[]> = {
  "1W": [
    { date: "Lun", balance: 2100, income: 400, expenses: 120 },
    { date: "Mar", balance: 2250, income: 200, expenses: 50 },
    { date: "Mié", balance: 2180, income: 0, expenses: 70 },
    { date: "Jue", balance: 2400, income: 300, expenses: 80 },
    { date: "Vie", balance: 2350, income: 50, expenses: 100 },
    { date: "Sáb", balance: 2580, income: 280, expenses: 50 },
    { date: "Dom", balance: 2631, income: 100, expenses: 49 }
  ],
  "1M": [
    { date: "Sem 1", balance: 1400, income: 1600, expenses: 200 },
    { date: "Sem 2", balance: 1850, income: 700, expenses: 250 },
    { date: "Sem 3", balance: 2200, income: 550, expenses: 200 },
    { date: "Sem 4", balance: 2631, income: 800, expenses: 369 }
  ],
  "6M": [
    { date: "Ene", balance: 1100, income: 1500, expenses: 400 },
    { date: "Feb", balance: 1450, income: 800, expenses: 450 },
    { date: "Mar", balance: 1800, income: 950, expenses: 600 },
    { date: "Abr", balance: 1950, income: 600, expenses: 450 },
    { date: "May", balance: 2300, income: 850, expenses: 500 },
    { date: "Jun", balance: 2631, income: 900, expenses: 569 }
  ],
  "1Y": [
    { date: "Q1", balance: 1200, income: 3000, expenses: 1800 },
    { date: "Q2", balance: 1800, income: 3200, expenses: 2600 },
    { date: "Q3", balance: 2100, income: 2900, expenses: 2600 },
    { date: "Q4", balance: 2631, income: 3500, expenses: 2969 }
  ]
};

// Tooltip Personalizado con Glassmorphism
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload as DataPoint;
    return (
      <div className="balance-custom-tooltip">
        <p className="tooltip-date">{label}</p>
        <div className="tooltip-row">
          <span>Balance:</span>
          <strong className="tooltip-val-balance">{data.balance.toLocaleString("es-ES")} €</strong>
        </div>
        <div className="tooltip-row">
          <span>Ingresos:</span>
          <span className="tooltip-val-inc">+{data.income} €</span>
        </div>
        <div className="tooltip-row">
          <span>Gastos:</span>
          <span className="tooltip-val-exp">-{data.expenses} €</span>
        </div>
      </div>
    );
  }
  return null;
};

const BalanceView = () => {
  const [range, setRange] = useState<TimeRange>("1M");
  const currentData = timeSeriesData[range];

  // Cálculo de KPIs
  const currentBalance = currentData[currentData.length - 1].balance;
  const totalIncome = currentData.reduce((acc, curr) => acc + curr.income, 0);
  const totalExpenses = currentData.reduce((acc, curr) => acc + curr.expenses, 0);

  return (
    <div className="view-balance-pro">
      
      {/* 1. TARJETAS DE MÉTRICAS KPI */}
      <div className="balance-kpi-grid">
        <div className="kpi-card main-kpi">
          <span className="kpi-label">Balance Neto Actual</span>
          <div className="kpi-value-row">
            <h2 className="kpi-amount">{currentBalance.toLocaleString("es-ES")} €</h2>
            <span className="kpi-badge positive">+12.4%</span>
          </div>
        </div>

        <div className="kpi-card">
          <span className="kpi-label">Ingresos Totales</span>
          <h3 className="kpi-amount inc-text">+{totalIncome.toLocaleString("es-ES")} €</h3>
        </div>

        <div className="kpi-card">
          <span className="kpi-label">Gastos Totales</span>
          <h3 className="kpi-amount exp-text">-{totalExpenses.toLocaleString("es-ES")} €</h3>
        </div>
      </div>

      {/* 2. CABECERA DEL GRÁFICO Y FILTROS TEMPORALES */}
      <div className="chart-header-row">
        <div>
          <h3 className="section-internal-title">Análisis Patrimonial</h3>
          <p className="section-subtitle-sm">Evolución de saldo y flujos financieros</p>
        </div>

        <div className="time-range-pills">
          {(["1W", "1M", "6M", "1Y"] as TimeRange[]).map((r) => (
            <button
              key={r}
              className={`pill-btn ${range === r ? "active" : ""}`}
              onClick={() => setRange(r)}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      {/* 3. GRÁFICO PROFESIONAL DE RECHARTS */}
      <div className="chart-canvas-container">
        <ResponsiveContainer width="100%" height={320}>
          <AreaChart data={currentData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              {/* Degradado Azul Neón Revolut */}
              <linearGradient id="balanceGlow" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#0052ff" stopOpacity={0.45} />
                <stop offset="75%" stopColor="#0052ff" stopOpacity={0.05} />
                <stop offset="100%" stopColor="#0052ff" stopOpacity={0} />
              </linearGradient>
            </defs>

            <CartesianGrid
              strokeDasharray="4 4"
              stroke="rgba(255, 255, 255, 0.05)"
              vertical={false}
            />

            <XAxis
              dataKey="date"
              stroke="#5f6670"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              dy={10}
            />

            <YAxis
              stroke="#5f6670"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(val) => `${val}€`}
            />

            <Tooltip content={<CustomTooltip />} />

            <Area
              type="monotone"
              dataKey="balance"
              stroke="#0052ff"
              strokeWidth={3}
              fill="url(#balanceGlow)"
              activeDot={{
                r: 6,
                fill: "#0052ff",
                stroke: "#ffffff",
                strokeWidth: 2
              }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
};

export default BalanceView;