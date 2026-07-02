
import { useState } from 'react';
import './CryptoMarket.css';

interface CryptoCoin {
    id: string;
    name: string;
    symbol: string;
    price: number;
    change24h: number;
}

const CryptoMarket: React.FC = () => {
    const [coins] = useState<CryptoCoin[]>([
        { id: "1", name: "Bitcoin", symbol: "BTC", price: 43567.89, change24h: 2.5 },
        { id: "2", name: "Ethereum", symbol: "ETH", price: 3123.45, change24h: -1.2 },
        { id: "3", name: "Cardano", symbol: "ADA", price: 1.23, change24h: 0.5 }
    ]);

    const handleBuy = (coinName: string) => {
        alert(`Simulando compra de ${coinName}...`);
    };

    return (
        <div className="crypto-market-container">
            <h2>Mercado Cripto</h2>
            <div className="crypto-grid">
                {coins.map((coin) => {
                    const isPositive = coin.change24h >= 0;

                    return (
                        <div key={coin.id} className="crypto-coin-card">
                            <h3>{coin.name} ({coin.symbol})</h3>
                            <p>Price: ${coin.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}</p>
                            
                            {/* Aplicamos la clase base y sumamos la clase según sea positivo o negativo */}
                            <p className={`crypto-change ${isPositive ? 'positive' : 'negative'}`}>
                                24h Change: {isPositive ? '▲' : '▼'} {Math.abs(coin.change24h)}%
                            </p>
                            
                            <button className="btn-buy" onClick={() => handleBuy(coin.name)}>
                                Comprar
                            </button>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default CryptoMarket;