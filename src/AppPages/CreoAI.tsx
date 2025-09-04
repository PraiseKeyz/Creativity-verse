import React, { useState } from "react";
import { FaPaperPlane, FaRobot, FaEllipsisH, FaImage } from "react-icons/fa";

type Message = {
  id: number;
  text?: string;
  image?: string; // base64 or file url
  sender: "user" | "ai";
};

const CreoAI: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: "👋 Hi, I’m your AI assistant. Ask me anything!", sender: "ai" },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const sendMessage = async () => {
    if (!input.trim() && !imagePreview) return;

    const newMessage: Message = {
      id: Date.now(),
      text: input || undefined,
      image: imagePreview || undefined,
      sender: "user",
    };

    setMessages((prev) => [...prev, newMessage]);
    setInput("");
    setImagePreview(null);
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: Date.now(),
        text: `🤖 AI received your message${newMessage.image ? " with an image" : ""}!`,
        sender: "ai",
      };
      setMessages((prev) => [...prev, aiResponse]);
      setIsTyping(false);
    }, 2500);
  };

  return (
    <main className="h-[100%] bg-[#121212] text-white flex flex-col">
      {/* Chat container */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-end ${
              msg.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            {msg.sender === "ai" && (
              <div className="w-8 h-8 rounded-full bg-[#232323] flex items-center justify-center mr-2">
                <FaRobot className="text-[#FF6F00]" />
              </div>
            )}
            <div
              className={`max-w-[70%] px-4 py-2 rounded-2xl space-y-2 ${
                msg.sender === "user"
                  ? "bg-[var(--color-brand-orange)] text-black rounded-br-none"
                  : "bg-[#232323] text-white rounded-bl-none"
              }`}
            >
              {msg.text && <p>{msg.text}</p>}
              {msg.image && (
                <img
                  src={msg.image}
                  alt="uploaded"
                  className="rounded-lg max-h-60 object-cover"
                />
              )}
            </div>
          </div>
        ))}

        {/* Typing animation */}
        {isTyping && (
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#232323] flex items-center justify-center">
              <FaRobot className="text-[#FF6F00]" />
            </div>
            <div className="bg-[#232323] text-white px-4 py-2 rounded-2xl rounded-bl-none flex items-center gap-1">
              <FaEllipsisH className="animate-pulse" />
            </div>
          </div>
        )}
      </div>

      {/* Input bar */}
      <div className="p-4 border-t border-gray-800 flex items-center gap-2 bg-[#1a1a1a]">
        {/* Image Upload */}
        <label className="p-3 bg-[#232323] rounded-full cursor-pointer hover:opacity-80">
          <FaImage className="text-lg" />
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageUpload}
          />
        </label>

        {/* Text Input */}
        <input
          type="text"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          className="flex-1 px-4 py-2 rounded-full bg-[#232323] border border-gray-700 focus:border-[var(--color-brand-orange)] outline-none"
        />

        {/* Send Button */}
        <button
          onClick={sendMessage}
          className="p-3 bg-[var(--color-brand-orange)] text-black rounded-full hover:opacity-90 active:scale-95 transition"
        >
          <FaPaperPlane />
        </button>
      </div>

      {/* Image Preview before sending */}
      {imagePreview && (
        <div className="p-2 border-t border-gray-800 bg-[#1a1a1a] flex items-center justify-between">
          <img
            src={imagePreview}
            alt="preview"
            className="h-20 rounded-md object-cover"
          />
          <button
            onClick={() => setImagePreview(null)}
            className="px-3 py-1 text-xs bg-red-500 rounded-md hover:bg-red-600"
          >
            Remove
          </button>
        </div>
      )}
    </main>
  );
};

export default CreoAI;
