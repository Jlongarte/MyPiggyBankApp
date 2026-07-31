import { useState, FormEvent } from "react";

interface ChatInputAreaProps {
  quickPrompts: string[];
  onSendMessage: (text: string) => void;
}

export const ChatInputArea = ({ quickPrompts, onSendMessage }: ChatInputAreaProps) => {
  const [inputMessage, setInputMessage] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;
    onSendMessage(inputMessage);
    setInputMessage("");
  };

  return (
    <>
      <div className="quick-prompts-bar">
        {quickPrompts.map((prompt, index) => (
          <button
            key={index}
            type="button"
            className="prompt-chip"
            onClick={() => onSendMessage(prompt)}
          >
            {prompt}
          </button>
        ))}
      </div>

      <form className="chat-input-row" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Ask your question to PiggyBot..."
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
        />
        <button type="submit" className="btn-send-message">
          Send ➔
        </button>
      </form>
    </>
  );
};