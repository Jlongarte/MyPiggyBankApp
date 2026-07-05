
import "../styles/CryptoMarket.css";
import { useState, useEffect } from "react";

// Declaramos las interfaces locales estrictas aquí mismo
export interface CryptoCoin {
  id: string;
  name: string;
  symbol: string;
  current_price: number;
  price_change_percentage_24h: number;
  image: string;
}

const CryptoMarketPage = () => {
  const [cryptoData, setCryptoData] = useState<CryptoCoin[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadMarketData = async () => {
      try {
        // Ejecutamos la llamada HTTP real directa a internet
        const response = await fetch(
          "https://api.coingecko.com/api/v3/coins/markets?vs_currency=eur&order=market_cap_desc&per_page=6&page=1&sparkline=false"
        );

        if (!response.ok) {
          throw new Error(`Error HTTP: ${response.status}`);
        }

        const data = await response.json();

        // Mapeamos los datos reales del servidor
        const mappedData = data.map((coin: any) => ({
          id: coin.id,
          name: coin.name,
          symbol: coin.symbol.toUpperCase(),
          current_price: coin.current_price,
          price_change_percentage_24h: coin.price_change_percentage_24h,
          image: coin.image
        }));

        setCryptoData(mappedData);
      } catch (error) {
        console.error("Error al conectar con la API:", error);
      } finally {
        setLoading(false);
      }
    };

    loadMarketData();
  }, []);

  if (loading) {
    return <div className="market-loading">Cargando precios en tiempo real...</div>;
  }

  return (
    <div className="crypto-page-container">
      <h2 className="market-title">Mercado de Criptomonedas</h2>
      <div className="crypto-grid-list">
        {cryptoData.map((coin) => (
          <div key={coin.id} className="crypto-coin-row">
            <div className="coin-info-block">
              <img src={coin.image} alt={coin.name} className="coin-api-thumb" />
              <div>
                <span className="coin-api-name">{coin.name}</span>
                <span className="coin-api-symbol">{coin.symbol}</span>
              </div>
            </div>
            <div className="coin-price-block">
              <span className="coin-api-price">
                {coin.current_price.toLocaleString("es-ES", { style: "currency", currency: "EUR" })}
              </span>
              <span className={`coin-api-change ${coin.price_change_percentage_24h >= 0 ? "positive" : "negative"}`}>
                {coin.price_change_percentage_24h >= 0 ? "+" : ""}{coin.price_change_percentage_24h.toFixed(2)}%
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CryptoMarketPage;