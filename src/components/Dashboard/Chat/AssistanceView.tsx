import { useState } from "react";
import { ChatMessages } from "./ChatMessages";
import { ChatInputArea } from "./ChatInputArea";
import "../../../styles/Dashboard.css";

interface Message {
  id: string;
  sender: "bot" | "user";
  text: string;
  time: string;
}

export const AssistanceView = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      sender: "bot",
      text: "Hello! I'm PiggyBot 🐷, your personal financial assistant. How can I help you today?",
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    },
  ]);

  const getBotResponse = (userText: string): string => {
    const text = userText.toLowerCase();

    if (text.includes("balance") || text.includes("saldo") || text.includes("cuanto tengo")) {
      return "Your current net worth is €2,631.00. You've had a positive return of +14.2% this month.";
    }
    if (text.includes("gasto") || text.includes("gastos") || text.includes("he gastado")) {
      return "Over the last month, you've spent a total of €819.00. Your highest spending category was 'Subscriptions & Services'.";
    }
    if (text.includes("cripto") || text.includes("bitcoin") || text.includes("inversión")) {
      return "The crypto market is active today. Bitcoin is trading with significant gains. You can check the 'Crypto Market' tab for more details.";
    }
    if (text.includes("enviar") || text.includes("transferir") || text.includes("transferencia")) {
      return "To send money to someone, go to the 'Send Money' tab in the sidebar. You only need their email address!";
    }
    if (text.includes("hola") || text.includes("buenas")) {
      return "Hello again! 😊 How can I assist you with your finances today?";
    }

    return "I understand your request. Since I'm currently a demo financial assistant, I recommend checking the 'Balance' or 'Transactions' tabs to view your account details.";
  };

  const handleSendMessage = (query: string) => {
    if (!query.trim()) return;

    const currentTime = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: "user",
      text: query,
      time: currentTime,
    };

    setMessages((prev) => [...prev, userMsg]);

    setTimeout(() => {
      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: "bot",
        text: getBotResponse(query),
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => [...prev, botMsg]);
    }, 600);
  };

  const quickPrompts = [
    "What is my current balance?",
    "How much have I spent this month?",
    "How can I send money?",
    "Crypto market overview",
  ];

  return (
    <div className="assistance-container">
      {/* Cabecera del Chat */}
      <div className="chat-header">
        <div className="bot-avatar">🐷</div>
        <div>
          <h3 className="bot-name">PiggyBot Assist</h3>
          <span className="bot-status">● Online — Financial Intelligence</span>
        </div>
      </div>

      {/* Cuerpo de Mensajes encapsulado */}
      <ChatMessages messages={messages} />

      {/* Zona de Prompts e Input encapsulada */}
      <ChatInputArea quickPrompts={quickPrompts} onSendMessage={handleSendMessage} />
    </div>
  );
};

export default AssistanceView;