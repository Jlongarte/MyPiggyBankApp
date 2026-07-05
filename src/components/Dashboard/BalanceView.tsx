// src/components/Dashboard/BalanceView.tsx
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const mockChartData = [
  { name: "Sem 1", saldo: 400 },
  { name: "Sem 2", saldo: 1200 },
  { name: "Sem 3", saldo: 900 },
  { name: "Sem 4", saldo: 2631 }
];

const BalanceView = () => {
  return (
    <div className="view-balance" style={{ height: "100%" }}>
      <h3 className="section-internal-title">Evolución de Activos</h3>
      <div style={{ width: "100%", height: "380px", marginTop: "20px" }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={mockChartData}>
            <defs>
              <linearGradient id="chartGlow" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#0052ff" stopOpacity={0.35}/>
                <stop offset="95%" stopColor="#0052ff" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" vertical={false} />
            <XAxis dataKey="name" stroke="#5f6670" fontSize={12} />
            <YAxis stroke="#5f6670" fontSize={12} />
            <Tooltip contentStyle={{ background: "#0b1220", border: "1px solid rgba(255,255,255,0.1)", color: "#fff" }} />
            <Area type="monotone" dataKey="saldo" stroke="#0052ff" strokeWidth={3} fill="url(#chartGlow)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default BalanceView; // <-- Exportación por defecto obligatoria