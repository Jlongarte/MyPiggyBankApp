import ReactECharts from "echarts-for-react";

interface ChartDataPoint {
  time: string;
  price: number;
}

interface CryptoChartProps {
  selectedCoin: {
    name: string;
    symbol: string;
    price: number;
    change: number;
    icon: string;
  };
  chartData: ChartDataPoint[];
  loadingChart: boolean;
}

export const CryptoChart = ({ selectedCoin, chartData, loadingChart }: CryptoChartProps) => {
  // Determinar color de la línea según rendimiento positivo o negativo
  const isUp = selectedCoin.change >= 0;
  const lineColor = isUp ? "#10b981" : "#ef4444";

  // Opciones de configuración para ECharts
  const getChartOption = () => {
    return {
      backgroundColor: "transparent",
      tooltip: {
        trigger: "axis",
        backgroundColor: "rgba(12, 18, 32, 0.9)",
        borderColor: "rgba(255, 255, 255, 0.1)",
        textStyle: { color: "#fff" },
        formatter: (params: any) => {
          const val = params[0].value.toLocaleString("en-US", { style: "currency", currency: "USD" });
          return `<div style="font-size: 11px; color: #8a919e;">${params[0].name}</div>
                  <div style="font-weight: 700; color: #fff;">${val}</div>`;
        },
      },
      grid: { top: "10%", left: "3%", right: "3%", bottom: "12%", containLabel: true },
      xAxis: {
        type: "category",
        data: chartData.map((d) => d.time),
        axisLine: { show: false },
        axisTick: { show: false },
        axisLabel: { color: "#5f6670", fontSize: 10, interval: 3 },
      },
      yAxis: {
        type: "value",
        scale: true,
        splitLine: { lineStyle: { color: "rgba(255, 255, 255, 0.03)" } },
        axisLabel: { color: "#5f6670", fontSize: 10, formatter: (val: number) => `$${val >= 1000 ? (val / 1000).toFixed(0) + 'k' : val}` },
      },
      series: [
        {
          data: chartData.map((d) => d.price),
          type: "line",
          smooth: true,
          symbol: "none",
          itemStyle: { color: lineColor },
          lineStyle: { width: 3, color: lineColor },
          areaStyle: {
            color: {
              type: "linear",
              x: 0, y: 0, x2: 0, y2: 1,
              colorStops: [
                { offset: 0, color: isUp ? "rgba(16, 185, 129, 0.25)" : "rgba(239, 68, 68, 0.25)" },
                { offset: 1, color: "transparent" },
              ],
            },
          },
        },
      ],
    };
  };

  return (
    <div style={{ background: "rgba(255, 255, 255, 0.02)", border: "1px solid rgba(255, 255, 255, 0.05)", borderRadius: "16px", padding: "20px", marginBottom: "28px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <img src={selectedCoin.icon} alt={selectedCoin.name} style={{ width: "36px", height: "36px" }} />
          <div>
            <h3 style={{ margin: 0, fontSize: "1.1rem" }}>{selectedCoin.name} ({selectedCoin.symbol.toUpperCase()})</h3>
            <span style={{ fontSize: "1.4rem", fontWeight: 800 }}>
              {selectedCoin.price.toLocaleString("en-US", { style: "currency", currency: "USD" })}
            </span>
          </div>
        </div>
        <span className={`c-change ${selectedCoin.change >= 0 ? "p" : "n"}`} style={{ fontSize: "1.1rem", fontWeight: 700 }}>
          {selectedCoin.change >= 0 ? "+" : ""}{selectedCoin.change.toFixed(2)}%
        </span>
      </div>

      {loadingChart ? (
        <div style={{ height: "260px", display: "flex", justifyContent: "center", alignItems: "center", color: "#5f6670" }}>
          Loading historical chart...
        </div>
      ) : (
        <ReactECharts option={getChartOption()} style={{ height: "260px", width: "100%" }} />
      )}
    </div>
  );
};