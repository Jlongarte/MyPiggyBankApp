

export interface CryptoCoin {
  id: string;
  name: string;
  symbol: string;
  current_price: number;
  price_change_percentage_24h: number;
  image: string;
}

interface CryptoCardGridProps {
  cryptoData: CryptoCoin[];
}

export const CryptoCardGrid = ({ cryptoData }: CryptoCardGridProps) => {
  return (
    <div className="crypto-grid-list">
      {cryptoData.map((coin) => (
        <div key={coin.id} className="crypto-coin-row">
          {/* Información de la criptomoneda */}
          <div className="coin-info-block">
            <img src={coin.image} alt={coin.name} className="coin-api-thumb" />
            <div>
              <span className="coin-api-name">{coin.name}</span>
              <span className="coin-api-symbol">{coin.symbol}</span>
            </div>
          </div>

          {/* Bloque de precio y variación porcentual */}
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
  );
};