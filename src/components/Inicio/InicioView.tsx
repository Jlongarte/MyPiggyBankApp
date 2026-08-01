// src/components/Dashboard/InicioView.tsx
import { useState } from "react";
import { AccountHeader } from "./AccountHeader";
import { TransactionList, type Transaction } from "./TransactionList";
import { TransactionDetailDrawer } from "./TransactionDetailDrawer";

export const InicioView = () => {
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);

  const transactions: Transaction[] = [
    { 
      id: "1", 
      concept: "Carrefour", 
      date: "9 feb, 10:50", 
      amount: "-25,46 £", 
      secondaryAmount: "-29,09 €", 
      isPositive: false, 
      logoUrl: "./carrefour.png",
      address: "Calle de Bravo Murillo 125, Madrid"
    },
    { 
      id: "2", 
      concept: "Metro de Madrid", 
      date: "6 feb, 17:40", 
      amount: "-28,47 £", 
      secondaryAmount: "-32,70 €", 
      isPositive: false, 
      logoUrl: "./metro-madrid.png",
      address: "Estación de Sol, Madrid"
    },
    { 
      id: "3", 
      concept: "HMSHost International", 
      date: "6 feb, 6:27", 
      amount: "-6,51 £", 
      secondaryAmount: "-382,50 TRY", 
      isPositive: false, 
      logoUrl: "./emirates.png",
      address: "Aeropuerto Adolfo Suárez T4, Madrid"
    },
    { 
      id: "4", 
      concept: "McDonald's", 
      date: "5 feb, 22:02", 
      amount: "-10,70 £", 
      secondaryAmount: "-53 AED", 
      isPositive: false, 
      logoUrl: "./mcdonalds.png",
      address: "Gran Vía 31, Madrid"
    },
    { 
      id: "5", 
      concept: "Dubai Duty Free", 
      date: "5 feb, 21:55", 
      amount: "-0,96 £", 
      secondaryAmount: "-4,75 AED", 
      isPositive: false, 
      icon: "✈️",
      address: "Terminal 3, Dubai International Airport"
    },
    { 
      id: "6", 
      concept: "Arabia Taxi", 
      date: "5 feb, 21:09", 
      amount: "-7,56 £", 
      secondaryAmount: "-37,50 AED", 
      isPositive: false, 
      logoUrl: "./taxi.png",
      address: "Sheikh Zayed Road, Dubai"
    },
    { 
      id: "7", 
      concept: "تاورز مارت", 
      date: "5 feb, 19:13", 
      amount: "-0,61 £", 
      secondaryAmount: "-3 AED", 
      isPositive: false, 
      icon: "🛒",
      address: "Al Barsha, Dubai"
    },
    { 
      id: "8", 
      concept: "تاورز مارت", 
      date: "5 feb, 14:06", 
      amount: "-1,82 £", 
      secondaryAmount: "-9 AED", 
      isPositive: false, 
      icon: "🛒",
      address: "Downtown Dubai"
    },
    { 
      id: "9", 
      concept: "The Tap House", 
      date: "5 feb, 12:49", 
      amount: "-6,63 £", 
      secondaryAmount: "-33 AED", 
      isPositive: false, 
      logoUrl: "./taphouse.jpg",
      address: "Palm Jumeirah, Dubai"
    },
  ];

  const handleDownloadStatement = () => {
    let fileContent = "========================================\n";
    fileContent += "   THEPIGGYBANK - EXTRACTO DE CUENTA\n";
    fileContent += "   Saldo actual: 26,31 GBP (Personal)\n";
    fileContent += "========================================\n\n";
    fileContent += "HISTORIAL DE TRANSACCIONES:\n\n";

    transactions.forEach((tx, index) => {
      fileContent += `${index + 1}. ${tx.concept} - ${tx.address || "Madrid"}\n`;
      fileContent += `   Fecha: ${tx.date} | Importe: ${tx.amount}\n`;
      fileContent += `----------------------------------------\n`;
    });

    const blob = new Blob([fileContent], { type: "text/plain;charset=utf-8" });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "extracto-thepiggybank.txt");
    document.body.appendChild(link);
    link.click();
    setTimeout(() => {
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    }, 100);
  };

  return (
    <div className="inicio-view-layout" style={{ display: "flex", gap: "24px", position: "relative" }}>
      {/* Contenido principal izquierdo */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <AccountHeader 
          balance="26,31"
          currencySymbol="£"
          accountType="Personal · GBP"
          countryFlag="🇬🇧"
          onDownloadStatement={handleDownloadStatement}
        />
        
        <TransactionList 
          transactions={transactions} 
          selectedTxId={selectedTransaction?.id}
          onSelectTransaction={(tx) => setSelectedTransaction(tx)}
          onViewAll={() => console.log("Ver todo")} 
        />
      </div>

      {/* Ventana deslizante derecha con detalles y mapa */}
      <TransactionDetailDrawer 
        transaction={selectedTransaction} 
        onClose={() => setSelectedTransaction(null)} 
      />
    </div>
  );
};

export default InicioView;