import { useState, useEffect } from "react";
import { CryptoCardGrid, type CryptoCoin } from "../Crypto/CryptoCardGrid";
import "../../styles/CryptoMarket.css";

const CryptoMarketPage = () => {
  const [cryptoData, setCryptoData] = useState<CryptoCoin[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Carga inicial de datos de mercado desde la API de CoinGecko
  useEffect(() => {
    const loadMarketData = async () => {
      try {
        const response = await fetch(
          "https://api.coingecko.com/api/v3/coins/markets?vs_currency=eur&order=market_cap_desc&per_page=6&page=1&sparkline=false"
        );

        if (!response.ok) {
          throw new Error(`HTTP Error: ${response.status}`);
        }

        const data = await response.json();

        // Mapear la respuesta del servidor al formato tipado del cliente
        const mappedData: CryptoCoin[] = data.map((coin: any) => ({
          id: coin.id,
          name: coin.name,
          symbol: coin.symbol.toUpperCase(),
          current_price: coin.current_price,
          price_change_percentage_24h: coin.price_change_percentage_24h,
          image: coin.image
        }));

        setCryptoData(mappedData);
      } catch (error) {
        console.error("Error connecting to the API:", error);
      } finally {
        setLoading(false);
      }
    };

    loadMarketData();
  }, []);

  // Mostrar estado de carga mientras se obtienen los datos
  if (loading) {
    return <div className="market-loading">Loading real-time prices...</div>;
  }

  return (
    <div className="crypto-page-container">
      <h2 className="market-title">Cryptocurrency Market</h2>
      
      {/* Componente visual de rejilla encapsulado */}
      <CryptoCardGrid cryptoData={cryptoData} />
    </div>
  );
};

export default CryptoMarketPage;