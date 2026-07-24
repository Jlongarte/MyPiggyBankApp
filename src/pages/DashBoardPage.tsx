// src/pages/DashBoardPage.tsx
import { useState, useEffect } from "react";
import type { Transaction, CryptoCoin } from "../types.ts"; // Ajusta la ruta a tu archivo types según tu estructura
import InicioView from "../components/Dashboard/InicioView";
import BalanceView from "../components/Dashboard/BalanceView";
import CryptoView from "../components/Dashboard/CryptoView";
import "../styles/Dashboard.css";

const DashBoardPage = () => {
  const [activeTab, setActiveTab] = useState<"inicio" | "balance" | "transferencias" | "crypto">("inicio");
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [cryptoData, setCryptoData] = useState<CryptoCoin[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const resTx = await fetch("https://jsonplaceholder.typicode.com/todos?_limit=8");
        const jsonTx = await resTx.json();
        
        // Mapeamos cumpliendo estrictamente con tu interfaz extendida de Transaction
        const mappedTx: Transaction[] = jsonTx.map((item: any) => {
          const isExpense = item.id % 2 === 0;
          return {
            id: `tx-${item.id}`,
            concept: item.title.charAt(0).toUpperCase() + item.title.slice(1, 18),
            amount: isExpense ? (item.id * 7.4) : (item.id * 12.5),
            type: isExpense ? "expense" : "income",
            date: `Hoy, ${10 + item.id}:50`,
            category: isExpense ? "Transferencia" : "Salario"
          };
        });
        setTransactions(mappedTx);

       
        const resCrypto = await fetch(
          "https://api.coingecko.com/api/v3/coins/markets?vs_currency=eur&order=market_cap_desc&per_page=10&page=1&sparkline=false"
        );
        if (resCrypto.ok) {
          const jsonCrypto = await resCrypto.json();
          setCryptoData(
            jsonCrypto.map((c: any) => ({
              id: c.id,
              name: c.name,
              symbol: c.symbol.toUpperCase(),
              current_price: c.current_price,
              price_change_percentage_24h: c.price_change_percentage_24h,
              image: c.image
            }))
          );
        }
      } catch (err) {
        console.error("Error cargando los datos del Dashboard:", err);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const handleNewTransfer = (destinatario: string, monto: number) => {
    // Rellenamos el contrato completo de tu interfaz
    const nuevaTx: Transaction = {
      id: `tx-${Date.now()}`,
      concept: `A ${destinatario}`,
      amount: monto,
      type: "expense",
      date: "Ahora mismo",
      category: "Envio Inmediato"
    };
    setTransactions([nuevaTx, ...transactions]);
    alert(`¡Transferencia de ${monto}€ completada!`);
    setActiveTab("inicio");
  };

  if (loading) return <div className="revolut-loading">Sincronizando con The Piggy Bank...</div>;

  return (
    <div className="revolut-layout">
      <aside className="revolut-sidebar">
        <div className="revolut-sidebar-logo">R</div>
        <nav className="revolut-sidebar-nav">
          <button className={`nav-item-btn ${activeTab === "inicio" ? "active" : ""}`} onClick={() => setActiveTab("inicio")}>
            <span className="nav-icon">🏠</span><span className="nav-text">Inicio</span>
          </button>
          <button className={`nav-item-btn ${activeTab === "balance" ? "active" : ""}`} onClick={() => setActiveTab("balance")}>
            <span className="nav-icon">📊</span><span className="nav-text">Balance</span>
          </button>
          <button className={`nav-item-btn ${activeTab === "transferencias" ? "active" : ""}`} onClick={() => setActiveTab("transferencias")}>
            <span className="nav-icon">💸</span><span className="nav-text">Enviar</span>
          </button>
          <button className={`nav-item-btn ${activeTab === "crypto" ? "active" : ""}`} onClick={() => setActiveTab("crypto")}>
            <span className="nav-icon">🪙</span><span className="nav-text">Cripto</span>
          </button>
        </nav>
      </aside>

      <div className="revolut-main-container">
        <header className="revolut-top-bar">
          <h1 className="revolut-page-title">
            {activeTab === "inicio" && "Inicio"}
            {activeTab === "balance" && "Análisis del Balance"}
            {activeTab === "transferencias" && "Transferencias"}
            {activeTab === "crypto" && "Inversiones"}
          </h1>
          <div className="revolut-top-actions">
            <button className="btn-revolut-secondary" onClick={() => alert("IBAN: ES21 0049 1234 5678\nTitular: Cliente VIP")}>
              💼 Datos de la cuenta
            </button>
            <div className="user-avatar-badge">JL</div>
          </div>
        </header>

        <main className="revolut-dashboard-card">
          {activeTab === "inicio" && <InicioView transactions={transactions} />}
          {activeTab === "balance" && <BalanceView transactions={transactions} />}
          {activeTab === "transferencias" && <TransferenciasView onTransfer={handleNewTransfer} />}
          {activeTab === "crypto" && <CryptoView cryptoData={cryptoData} />}
        </main>
      </div>
    </div>
  );
};

export default DashBoardPage;