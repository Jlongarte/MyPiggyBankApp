

interface CryptoItem {
  id: string;
  name: string;
  symbol: string;
  price: number;
  change: number;
  icon: string;
  lastUpdateDirection?: "up" | "down" | null;
}

interface CryptoTableProps {
  cryptos: CryptoItem[];
  selectedCoinId?: string;
  onSelectCoin: (coin: CryptoItem) => void;
}

export const CryptoTable = ({ cryptos, selectedCoinId, onSelectCoin }: CryptoTableProps) => {
  return (
    <div className="crypto-table-revolut">
      {cryptos.map((coin) => (
        <div
          key={coin.id}
          className="crypto-row-rev"
          onClick={() => onSelectCoin(coin)}
          style={{
            cursor: "pointer",
            background: selectedCoinId === coin.id ? "rgba(255, 255, 255, 0.04)" : "transparent",
            paddingLeft: "12px",
            paddingRight: "12px",
            borderRadius: "10px",
          }}
        >
          <div className="c-left">
            <img src={coin.icon} alt={coin.name} className="c-img" />
            <div>
              <div className="c-name">{coin.name}</div>
              <div className="c-symbol">{coin.symbol}</div>
            </div>
          </div>
          <div className="c-right">
            <div
              className={`c-price ${
                coin.lastUpdateDirection === "up"
                  ? "price-tick-up"
                  : coin.lastUpdateDirection === "down"
                  ? "price-tick-down"
                  : ""
              }`}
            >
              {coin.price.toLocaleString("en-US", { style: "currency", currency: "USD" })}
            </div>
            <div className={`c-change ${coin.change >= 0 ? "p" : "n"}`}>
              {coin.change >= 0 ? "+" : ""}{coin.change.toFixed(2)}%
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};