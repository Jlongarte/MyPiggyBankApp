// src/components/Dashboard/InicioView.tsx

import { AccountHeader } from "./AccountHeader";
import { TransactionList, type Transaction } from "./TransactionList";

export const InicioView = () => {
  const transactions: Transaction[] = [
    { 
      id: "1", 
      concept: "Ahorra Mas", 
      date: "9 feb, 10:50", 
      amount: "-25,46 £", 
      secondaryAmount: "-29,09 €", 
      isPositive: false, 
      logoUrl: "https://images.avada.io/media/v1/AGT_N3gzT5E_W2JgN3gzT5E_W2Jg/shops/1/products/24039/original/mercadona-logo-vector.png" 
    },
    { 
      id: "2", 
      concept: "Metro de Madrid", 
      date: "6 feb, 17:40", 
      amount: "-28,47 £", 
      secondaryAmount: "-32,70 €", 
      isPositive: false, 
      logoUrl: "https://assets.stickpng.com/images/580b57fcd9996e24bc43c529.png" 
    },
    { 
      id: "3", 
      concept: "HMSHost International", 
      date: "6 feb, 6:27", 
      amount: "-6,51 £", 
      secondaryAmount: "-382,50 TRY", 
      isPositive: false, 
      logoUrl: "https://1000marcas.net/wp-content/uploads/2020/02/Repsol-Logo.png" 
    },
    { 
      id: "4", 
      concept: "McDonald's", 
      date: "5 feb, 22:02", 
      amount: "-10,70 £", 
      secondaryAmount: "-53 AED", 
      isPositive: false, 
      icon: "🍔" 
    },
    { 
      id: "5", 
      concept: "Dubai Duty Free", 
      date: "5 feb, 21:55", 
      amount: "-0,96 £", 
      secondaryAmount: "-4,75 AED", 
      isPositive: false, 
      icon: "✈️" 
    },
    { 
      id: "6", 
      concept: "Arabia Taxi", 
      date: "5 feb, 21:09", 
      amount: "-7,56 £", 
      secondaryAmount: "-37,50 AED", 
      isPositive: false, 
      icon: "🚕" 
    },
    { 
      id: "7", 
      concept: "تاورز مارت", 
      date: "5 feb, 19:13", 
      amount: "-0,61 £", 
      secondaryAmount: "-3 AED", 
      isPositive: false, 
      icon: "🛒" 
    },
    { 
      id: "8", 
      concept: "تاورز مارت", 
      date: "5 feb, 14:06", 
      amount: "-1,82 £", 
      secondaryAmount: "-9 AED", 
      isPositive: false, 
      icon: "🛒" 
    },
    { 
      id: "9", 
      concept: "The Tap House", 
      date: "5 feb, 12:49", 
      amount: "-6,63 £", 
      secondaryAmount: "-33 AED", 
      isPositive: false, 
      icon: "🍺" 
    },
  ];

  const handleDownloadStatement = () => {
    try {
      let fileContent = "========================================\n";
      fileContent += "   THEPIGGYBANK - EXTRACTO DE CUENTA\n";
      fileContent += "   Saldo actual: 26,31 GBP (Personal)\n";
      fileContent += "========================================\n\n";
      fileContent += "HISTORIAL DE TRANSACCIONES:\n\n";

      transactions.forEach((tx, index) => {
        fileContent += `${index + 1}. ${tx.concept}\n`;
        fileContent += `   Fecha: ${tx.date}\n`;
        fileContent += `   Importe: ${tx.amount}`;
        if (tx.secondaryAmount) {
          fileContent += ` (${tx.secondaryAmount})`;
        }
        fileContent += `\n----------------------------------------\n`;
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
    } catch (error) {
      console.error("Error al generar el extracto:", error);
    }
  };

  return (
    <div className="inicio-view" style={{ background: "transparent", padding: "0" }}>
      <AccountHeader 
        balance="26,31"
        currencySymbol="£"
        accountType="Personal · GBP"
        countryFlag="🇬🇧"
        onDownloadStatement={handleDownloadStatement}
      />
      
      <TransactionList 
        transactions={transactions} 
        onViewAll={() => console.log("Ver todo")} 
      />
    </div>
  );
};

export default InicioView;