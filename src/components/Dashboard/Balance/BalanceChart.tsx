import ReactECharts from "echarts-for-react";

export type TimeRange = "1W" | "1M" | "6M" | "1Y";

interface BalanceChartProps {
  timeRange: TimeRange;
  onTimeRangeChange: (range: TimeRange) => void;
  currentData: {
    categories: string[];
    income: number[];
    expenses: number[];
    balance: number[];
  };
}

export const BalanceChart = ({ timeRange, onTimeRangeChange, currentData }: BalanceChartProps) => {
  
  // Configuración de ECharts para el flujo de caja
  const getOption = () => {
    return {
      backgroundColor: "transparent",
      animationDuration: 800,
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "shadow" // Resalta la columna al pasar el cursor
        },
        backgroundColor: "rgba(11, 18, 32, 0.95)",
        borderColor: "rgba(255, 255, 255, 0.12)",
        borderWidth: 1,
        textStyle: { color: "#ffffff", fontSize: 13 },
        extraCssText: "backdrop-filter: blur(12px); border-radius: 12px; box-shadow: 0 10px 30px rgba(0,0,0,0.5);",
        formatter: (params: any[]) => {
          let header = `<div style="font-size: 11px; color: #8a919e; font-weight: 700; text-transform: uppercase; margin-bottom: 6px;">${params[0].name}</div>`;
          let content = "";
          params.forEach((item) => {
            const val = item.value.toLocaleString("en-US", { style: "currency", currency: "EUR" });
            content += `
              <div style="display: flex; justify-content: space-between; gap: 20px; font-size: 13px; margin-top: 4px;">
                <span style="color: ${item.color.colorStops ? item.color.colorStops[0].color : item.color}; font-weight: 600;">
                  ${item.seriesName}:
                </span>
                <span style="font-weight: 700; color: #fff;">${val}</span>
              </div>
            `;
          });
          return header + content;
        }
      },
      legend: {
        data: ["Income", "Expenses", "Net Savings"],
        textStyle: { color: "#8a919e", fontSize: 12, fontWeight: "600" },
        top: "0%"
      },
      grid: {
        top: "15%",
        left: "2%",
        right: "2%",
        bottom: "5%",
        containLabel: true
      },
      xAxis: {
        type: "category",
        data: currentData.categories,
        axisLine: { show: false },
        axisTick: { show: false },
        axisLabel: { color: "#8a919e", fontSize: 12, fontWeight: "600" }
      },
      yAxis: {
        type: "value",
        splitLine: { lineStyle: { color: "rgba(255, 255, 255, 0.05)" } },
        axisLabel: { color: "#8a919e", fontSize: 11, formatter: "€{value}" }
      },
      series: [
        {
          name: "Income",
          type: "bar",
          barGap: "20%",
          barCategoryGap: "40%",
          itemStyle: {
            borderRadius: [6, 6, 0, 0],
            color: {
              type: "linear",
              x: 0, y: 0, x2: 0, y2: 1,
              colorStops: [
                { offset: 0, color: "#10b981" }, 
                { offset: 1, color: "rgba(16, 185, 129, 0.2)" }
              ]
            }
          },
          data: currentData.income
        },
        {
          name: "Expenses",
          type: "bar",
          itemStyle: {
            borderRadius: [6, 6, 0, 0],
            color: {
              type: "linear",
              x: 0, y: 0, x2: 0, y2: 1,
              colorStops: [
                { offset: 0, color: "#ef4444" }, 
                { offset: 1, color: "rgba(239, 68, 68, 0.2)" }
              ]
            }
          },
          data: currentData.expenses
        },
        {
          name: "Net Savings",
          type: "line",
          smooth: true,
          symbolSize: 8,
          itemStyle: { color: "#3b82f6" },
          lineStyle: { width: 3, color: "#3b82f6" },
          data: currentData.balance
        }
      ]
    };
  };

  return (
    <>
      {/* Cabecera y selector temporal */}
      <div className="chart-header-row" style={{ marginTop: "24px" }}>
        <div>
          <h3 className="section-internal-title" style={{ margin: 0 }}>Cash Flow Comparison</h3>
          <p className="section-subtitle-sm">Side-by-side analysis between incoming and outgoing funds</p>
        </div>

        <div className="time-range-pills">
          {(["1W", "1M", "6M", "1Y"] as TimeRange[]).map((range) => (
            <button
              key={range}
              className={`pill-btn ${timeRange === range ? "active" : ""}`}
              onClick={() => onTimeRangeChange(range)}
            >
              {range}
            </button>
          ))}
        </div>
      </div>

      {/* Renderizado del gráfico de barras dobles */}
      <div className="echarts-glass-container">
        <ReactECharts option={getOption()} style={{ height: "380px", width: "100%" }} />
      </div>
    </>
  );
};