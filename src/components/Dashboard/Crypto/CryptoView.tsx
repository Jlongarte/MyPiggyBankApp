// src/components/Dashboard/CryptoView.tsx
import { useState, useEffect, useRef } from "react";
import { CryptoChart } from "./CryptoChart";
import { CryptoTable } from "./CryptoTable";

interface CryptoItem {
  id: string;          
  name: string;        
  symbol: string;      
  price: number;       
  change: number;      
  icon: string;        
  lastUpdateDirection?: "up" | "down" | null;
}

interface ChartDataPoint {
  time: string;
  price: number;
}

const MONEDAS_CONFIG = [
  { symbol: "BTCUSDT", name: "Bitcoin", code: "btc", icon: "https://assets.coingecko.com/coins/images/1/small/bitcoin.png" },
  { symbol: "ETHUSDT", name: "Ethereum", code: "eth", icon: "https://assets.coingecko.com/coins/images/279/small/ethereum.png" },
  { symbol: "SOLUSDT", name: "Solana", code: "sol", icon: "https://assets.coingecko.com/coins/images/4128/small/solana.png" },
  { symbol: "BNBUSDT", name: "BNB", code: "bnb", icon: "https://assets.coingecko.com/coins/images/825/small/bnb-icon2_2x.png" },
  { symbol: "XRPUSDT", name: "XRP", code: "xrp", icon: "https://assets.coingecko.com/coins/images/44/small/xrp-symbol-white-128.png" },
  { symbol: "ADAUSDT", name: "Cardano", code: "ada", icon: "https://assets.coingecko.com/coins/images/975/small/cardano.png" },
  { symbol: "AVAXUSDT", name: "Avalanche", code: "avax", icon: "https://assets.coingecko.com/coins/images/12559/small/Avalanche_Circle_RedWhite_Trans.png" },
  { symbol: "DOGEUSDT", name: "Dogecoin", code: "doge", icon: "https://assets.coingecko.com/coins/images/5/small/dogecoin.png" },
  { symbol: "DOTUSDT", name: "Polkadot", code: "dot", icon: "https://assets.coingecko.com/coins/images/12171/small/polkadot.png" },
  { symbol: "LINKUSDT", name: "Chainlink", code: "link", icon: "https://assets.coingecko.com/coins/images/877/small/chainlink-new-logo.png" },
];

export const CryptoView = () => {
  const [cryptos, setCryptos] = useState<CryptoItem[]>([]);
  const [selectedCoin, setSelectedCoin] = useState<CryptoItem | null>(null);
  const [chartData, setChartData] = useState<ChartDataPoint[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [loadingChart, setLoadingChart] = useState<boolean>(false);

  const wsRef = useRef<WebSocket | null>(null);

  // 1. Carga inicial de precios 24h (Tabla)
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const response = await fetch("https://api.binance.com/api/v3/ticker/24hr");
        const data = await response.json();

        const initialCryptos: CryptoItem[] = MONEDAS_CONFIG.map((config) => {
          const ticker = data.find((t: any) => t.symbol === config.symbol);
          return {
            id: config.symbol,
            name: config.name,
            symbol: config.code,
            price: ticker ? parseFloat(ticker.lastPrice) : 0,
            change: ticker ? parseFloat(ticker.priceChangePercent) : 0,
            icon: config.icon,
          };
        });

        setCryptos(initialCryptos);
        setSelectedCoin(initialCryptos[0]);
        setLoading(false);
      } catch (error) {
        console.error("Error al cargar criptos:", error);
        setLoading(false);
      }
    };

    fetchInitialData();
  }, []);

  // 2. Cargar gráfico histórico de 24h (Klines de Binance - Intervalo de 1h)
  useEffect(() => {
    if (!selectedCoin) return;

    const fetchHistoricalChart = async () => {
      setLoadingChart(true);
      try {
        const res = await fetch(`https://api.binance.com/api/v3/klines?symbol=${selectedCoin.id}&interval=1h&limit=24`);
        const klines = await res.json();

        const formattedPoints: ChartDataPoint[] = klines.map((k: any) => {
          const date = new Date(k[0]);
          const timeLabel = `${date.getHours().toString().padStart(2, "0")}:00`;
          return {
            time: timeLabel,
            price: parseFloat(k[4]),
          };
        });

        setChartData(formattedPoints);
        setLoadingChart(false);
      } catch (error) {
        console.error("Error al obtener histórico del gráfico:", error);
        setLoadingChart(false);
      }
    };

    fetchHistoricalChart();
  }, [selectedCoin?.id]);

  // 3. WebSocket solo para la tabla (Tiempo real / Parpadeos)
  useEffect(() => {
    if (cryptos.length === 0) return;

    const streams = MONEDAS_CONFIG.map((c) => `${c.symbol.toLowerCase()}@ticker`).join("/");
    const ws = new WebSocket(`wss://stream.binance.com:9443/ws/${streams}`);
    wsRef.current = ws;

    ws.onmessage = (event) => {
      const message = JSON.parse(event.data);
      if (!message.s || !message.c) return;

      const symbol = message.s;
      const newPrice = parseFloat(message.c);
      const newChange = parseFloat(message.P);

      setCryptos((prev) =>
        prev.map((coin) => {
          if (coin.id === symbol) {
            const direction = newPrice > coin.price ? "up" : newPrice < coin.price ? "down" : null;
            return {
              ...coin,
              price: newPrice,
              change: newChange,
              lastUpdateDirection: direction,
            };
          }
          return coin;
        })
      );
    };

    return () => {
      if (ws.readyState === WebSocket.OPEN) ws.close();
    };
  }, [loading]);

  if (loading) {
    return <div className="revolut-loading">Loading crypto market...</div>;
  }

  return (
    <div className="crypto-view">
      {/* Cabecera */}
      <div className="crypto-header-ws">
        <div>
          <h2 style={{ margin: 0, fontSize: "1.4rem" }}>Crypto Market</h2>
          <span style={{ fontSize: "0.82rem", color: "#5f6670" }}>Performance over the last 24 hours</span>
        </div>
        <div className="ws-live-badge">
          <div className="ws-pulse-dot"></div>
          REAL-TIME TABLE
        </div>
      </div>

      {/* Gráfico estable (Últimas 24 horas) encapsulado */}
      {selectedCoin && (
        <CryptoChart
          selectedCoin={selectedCoin}
          chartData={chartData}
          loadingChart={loadingChart}
        />
      )}

      {/* Tabla de criptomonedas encapsulada */}
      <CryptoTable
        cryptos={cryptos}
        selectedCoinId={selectedCoin?.id}
        onSelectCoin={(coin) => setSelectedCoin(coin)}
      />
    </div>
  );
};

export default CryptoView;