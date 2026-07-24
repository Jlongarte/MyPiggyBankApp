
import { useEffect, useState, useRef } from "react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import type { CryptoCoin } from "../../types";

interface CryptoViewProps {
  cryptoData: CryptoCoin[];
}

interface LivePrice {
  price: number;
  direction: "up" | "down" | "neutral";
}

// Datos simulados de tendencia para la gráfica interactiva del activo seleccionado
const mockSparklines: Record<string, { time: string; price: number }[]> = {
  bitcoin: [
    { time: "00:00", price: 82100 }, { time: "04:00", price: 82400 },
    { time: "08:00", price: 81900 }, { time: "12:00", price: 83100 },
    { time: "16:00", price: 83800 }, { time: "20:00", price: 84200 }
  ],
  ethereum: [
    { time: "00:00", price: 3100 }, { time: "04:00", price: 3150 },
    { time: "08:00", price: 3080 }, { time: "12:00", price: 3220 },
    { time: "16:00", price: 3290 }, { time: "20:00", price: 3310 }
  ]
};

const CryptoView = ({ cryptoData }: CryptoViewProps) => {
  const [livePrices, setLivePrices] = useState<Record<string, LivePrice>>({});
  const [selectedCoin, setSelectedCoin] = useState<CryptoCoin | null>(null);
  const prevPricesRef = useRef<Record<string, number>>({});

  // Selecciona la primera moneda por defecto cuando cargan los datos
  useEffect(() => {
    if (cryptoData.length > 0 && !selectedCoin) {
      setSelectedCoin(cryptoData[0]);
    }
  }, [cryptoData]);

  // Conexión WebSocket multicanal de Binance
  useEffect(() => {
    const streams = ["btceur@trade", "etheur@trade", "soleur@trade", "adaeur@trade", "xrpeur@trade"].join("/");
    const socket = new WebSocket(`wss://stream.binance.com:9443/ws/${streams}`);

    socket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        const symbol = data.s; // Ej: "BTCEUR"
        const newPrice = parseFloat(data.p);

        const symbolMap: Record<string, string> = {
          BTCEUR: "bitcoin",
          ETHEUR: "ethereum",
          SOLEUR: "solana",
          ADAEUR: "cardano",
          XRPEUR: "ripple"
        };

        const coinId = symbolMap[symbol];

        if (coinId) {
          const oldPrice = prevPricesRef.current[coinId] || newPrice;
          const direction = newPrice > oldPrice ? "up" : newPrice < oldPrice ? "down" : "neutral";
          prevPricesRef.current[coinId] = newPrice;

          setLivePrices((prev) => ({
            ...prev,
            [coinId]: { price: newPrice, direction }
          }));
        }
      } catch (err) {
        console.error("Error en socket:", err);
      }
    };

    return () => socket.close();
  }, []);

  // Genera datos dinámicos para el gráfico del activo seleccionado
  const activeCoinPrice = selectedCoin
    ? livePrices[selectedCoin.id]?.price || selectedCoin.current_price
    : 0;

  const chartData = selectedCoin && mockSparklines[selectedCoin.id]
    ? mockSparklines[selectedCoin.id]
    : [
        { time: "00:00", price: activeCoinPrice * 0.96 },
        { time: "06:00", price: activeCoinPrice * 0.98 },
        { time: "12:00", price: activeCoinPrice * 0.97 },
        { time: "18:00", price: activeCoinPrice * 1.02 },
        { time: "24:00", price: activeCoinPrice }
      ];

  return (
    <div className="view-crypto">
      <div className="crypto-header-ws">
        <h3 className="section-internal-title">Mercado de Criptoactivos</h3>
        <div className="ws-live-badge">
          <span className="ws-pulse-dot"></span>
          WEBSOCKET MULTI-STREAM
        </div>
      </div>

      {/* --- PANEL DEL GRÁFICO INTERACTIVO --- */}
      {selectedCoin && (
        <div className="crypto-chart-card" style={{ background: "rgba(255,255,255,0.02)", padding: "20px", borderRadius: "16px", marginBottom: "28px", border: "1px solid rgba(255,255,255,0.05)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <img src={selectedCoin.image} alt="" style={{ width: "28px", height: "28px" }} />
              <div>
                <strong style={{ fontSize: "1.1rem" }}>{selectedCoin.name}</strong>
                <span style={{ color: "#5f6670", fontSize: "0.85rem", marginLeft: "8px" }}>{selectedCoin.symbol}</span>
              </div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: "1.3rem", fontWeight: 700 }}>
                {activeCoinPrice.toLocaleString("es-ES", { style: "currency", currency: "EUR" })}
              </div>
            </div>
          </div>

          <div style={{ width: "100%", height: "200px" }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="cryptoGlow" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="time" stroke="#5f6670" fontSize={11} axisLine={false} tickLine={false} />
                <YAxis hide domain={["auto", "auto"]} />
                <Tooltip contentStyle={{ background: "#0b1220", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "8px", color: "#fff" }} />
                <Area type="monotone" dataKey="price" stroke="#10b981" strokeWidth={2.5} fill="url(#cryptoGlow)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* --- LISTA DE 10 CRIPTOS --- */}
      <div className="crypto-table-revolut">
        {cryptoData.map((coin) => {
          const liveData = livePrices[coin.id];
          const displayPrice = liveData ? liveData.price : coin.current_price;
          const isSelected = selectedCoin?.id === coin.id;

          return (
            <div
              key={coin.id}
              className={`crypto-row-rev ${isSelected ? "selected-row" : ""}`}
              onClick={() => setSelectedCoin(coin)}
              style={{
                cursor: "pointer",
                padding: "14px 12px",
                borderRadius: "12px",
                background: isSelected ? "rgba(255, 255, 255, 0.05)" : "transparent",
                transition: "background 0.2s"
              }}
            >
              <div className="c-left">
                <img src={coin.image} alt={coin.name} className="c-img" />
                <div>
                  <div className="c-name">{coin.name}</div>
                  <div className="c-symbol">{coin.symbol}</div>
                </div>
              </div>

              <div className="c-right">
                <div className={`c-price ${liveData ? `price-tick-${liveData.direction}` : ""}`}>
                  {displayPrice.toLocaleString("es-ES", { style: "currency", currency: "EUR" })}
                </div>
                <div className={`c-change ${coin.price_change_percentage_24h >= 0 ? "p" : "n"}`}>
                  {coin.price_change_percentage_24h >= 0 ? "+" : ""}{coin.price_change_percentage_24h?.toFixed(2)}%
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CryptoView;