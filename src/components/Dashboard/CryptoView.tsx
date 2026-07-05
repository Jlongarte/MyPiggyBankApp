// src/components/Dashboard/CryptoView.tsx
import type { CryptoCoin } from "../../types.ts"; // Ajusta la ruta a tu archivo types según tu estructura

interface CryptoViewProps {
  cryptoData: CryptoCoin[];
}

const CryptoView = ({ cryptoData }: CryptoViewProps) => {
  return (
    <div className="view-crypto">
      <h3 className="section-internal-title">Mercado de Activos</h3>
      <div className="crypto-table-revolut">
        {cryptoData.map((coin) => (
          <div key={coin.id} className="crypto-row-rev">
            <div className="c-left">
              <img src={coin.image} alt="" className="c-img" />
              <div>
                <div className="c-name">{coin.name}</div>
                <div className="c-symbol">{coin.symbol}</div>
              </div>
            </div>
            <div className="c-right">
              <div className="c-price">
                {coin.current_price.toLocaleString("es-ES", { style: "currency", currency: "EUR" })}
              </div>
              <div className={`c-change ${coin.price_change_percentage_24h >= 0 ? "p" : "n"}`}>
                {coin.price_change_percentage_24h >= 0 ? "+" : ""}{coin.price_change_percentage_24h?.toFixed(2)}%
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CryptoView;