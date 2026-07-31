import { useEffect, useRef } from "react";

interface Message {
  id: string;
  sender: "bot" | "user";
  text: string;
  time: string;
}

interface ChatMessagesProps {
  messages: Message[];
}

export const ChatMessages = ({ messages }: ChatMessagesProps) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="chat-body">
      {messages.map((msg) => (
        <div key={msg.id} className={`message-row ${msg.sender}`}>
          {msg.sender === "bot" && <div className="msg-avatar">🐷</div>}
          <div className="message-bubble">
            <p className="message-text">{msg.text}</p>
            <span className="message-time">{msg.time}</span>
          </div>
        </div>
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
};