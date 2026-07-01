import { useState } from "react";
import BalanceCard from "./components/BalanceCard";
import TransactionList from "./components/TransactionList";
import TransactionForm from "./components/TransactionForm";

// 1. Definimos una interfaz interna para saber qué estructura tiene una transacción en nuestra lista
interface TransactionItem {
  id: string;
  date: string;
  description: string;
  amount: number;
  type: "ingreso" | "gasto";
  transferedTo?: string;
}

const DashBoard = () => {
  // 2. Estados dinámicos para el saldo y las transacciones
  const [balance, setBalance] = useState<number>(1000);
  const [transactions, setTransactions] = useState<TransactionItem[]>([
    {
      id: "1",
      date: "2026-07-01",
      description: "Depósito inicial",
      amount: 1000,
      type: "ingreso",
    },
  ]);

  // 3. Función que procesa el nuevo movimiento enviado por el formulario
  const handleAddTransaction = (newTx: {
    type: "ingreso" | "gasto" | "transferencia";
    description: string;
    amount: number;
  }) => {
    // A) Actualizamos el saldo dependiendo de si es ingreso o gasto
    if (newTx.type === "gasto") {
      if (newTx.amount > balance) {
        alert("¡Fondos insuficientes para realizar este gasto!");
        return; // Cancelamos la operación si no hay dinero
      }
      setBalance((prev) => prev - newTx.amount);
    } else {
      setBalance((prev) => prev + newTx.amount);
    }

    // B) Creamos el objeto completo con ID y Fecha para el historial
    const fullTransaction: TransactionItem = {
      id: Date.now().toString(), // ID único basado en el tiempo
      date: new Date().toISOString().split("T")[0], // Fecha actual en formato YYYY-MM-DD
      description: newTx.description,
      amount: newTx.amount,
      type: newTx.type,
      // Si quisiéramos un destinatario real podríamos sacarlo de un input, de momento lo dejamos opcional
      transferedTo: newTx.type === "gasto" ? "Destinatario simulado" : undefined,
    };

    // C) Agregamos la nueva transacción al inicio de la lista
    setTransactions((prevTransactions) => [fullTransaction, ...prevTransactions]);
  };

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto", fontFamily: "sans-serif" }}>
      <h1>DashBoard</h1>
      
      {/* Pasamos el saldo del estado */}
      <BalanceCard balance={balance} />
      
      <div style={{ display: "flex", gap: "20px", marginTop: "20px", flexWrap: "wrap" }}>
        {/* Pasamos la función que manejará el envío */}
        <TransactionForm onSubmit={handleAddTransaction} />
        
        {/* Pasamos la lista de transacciones del estado */}
        <TransactionList transactions={transactions} />
      </div>
    </div>
  );
};

export default DashBoard;