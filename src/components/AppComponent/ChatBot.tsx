import React, { useState } from "react";
import { FaComments, FaTimes, FaPaperPlane, FaUserTie } from "react-icons/fa";

type Message = {
  id: number;
  text: string;
  sender: "user" | "bot" | "agent";
  showAgentCTA?: boolean;
};

const suggestedQueries = [
  {
    id: 0,
    question: "Speak to a customer agent representative",
    answer: "Okay, Our customer agent representative will join you shortly 👩‍💻",
    isAgent: true,
  },
  {
    id: 1,
    question: "How do I reset my password?",
    answer:
      "Click 'Forgot Password' on the login page, enter your email, and follow the reset link sent to your inbox.",
  },
  {
    id: 2,
    question: "I’m having trouble with my listing. What should I do?",
    answer:
      "Visit our Help Center for step-by-step listing guides or contact support with details — we’ll fix it together.",
  },
  {
    id: 3,
    question: "Do you have phone support?",
    answer:
      "Currently, we provide email and live chat support to ensure faster, documented responses.",
  },
  {
    id: 4,
    question: "Where can I find tutorials?",
    answer:
      "Our Help Center includes tutorials, walkthroughs, and tips to guide you through every feature.",
  },
];

const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: "Hi! 👋 I’m your Verse assistant. How can I help?", sender: "bot" },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const sendBotMessage = (text: string, showAgentCTA = true) => {
    setIsTyping(true);
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { id: Date.now(), text, sender: "bot", showAgentCTA },
      ]);
      setIsTyping(false);
    }, 3000);
  };

  const handleSend = () => {
    if (!input.trim()) return;
    const newMessage: Message = { id: Date.now(), text: input, sender: "user" };
    setMessages((prev) => [...prev, newMessage]);
    sendBotMessage("Thanks! Our support team will get back to you shortly 🚀", false);
    setInput("");
  };

  const handleSuggestionClick = (q: string, a: string, isAgent?: boolean) => {
    const userMsg: Message = { id: Date.now(), text: q, sender: "user" };
    setMessages((prev) => [...prev, userMsg]);

    if (isAgent) {
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          { id: Date.now(), text: a, sender: "agent" }, // now agent sender
        ]);
      }, 2000);
    } else {
      sendBotMessage(a, true);
    }
  };

  const handleAgentRequest = () => {
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { id: Date.now(), text: "Okay, Our customer agent representative will join you shortly 👩‍💻", sender: "agent" },
      ]);
    }, 2000);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Toggle button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="p-4 rounded-full bg-[var(--color-brand-orange)] text-black shadow-lg hover:scale-105 transition-transform"
        >
          <FaComments size={22} />
        </button>
      )}

      {/* Chat window */}
      {isOpen && (
        <div className="w-80 md:w-96 h-[32rem] bg-[#1f1f1f] rounded-2xl shadow-2xl border border-gray-700 flex flex-col overflow-hidden">
          {/* Header */}
          <div className="flex justify-between items-center px-4 py-3 bg-[var(--color-brand-orange)] text-black font-semibold">
            <span>Verse Support</span>
            <button onClick={() => setIsOpen(false)} className="text-black hover:opacity-70">
              <FaTimes />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 space-y-3 overflow-y-auto custom-scrollbar">
            {messages.map((msg) => (
              <div key={msg.id} className="flex items-start gap-2">
                {msg.sender === "agent" && (
                  <div className="w-7 h-7 rounded-full bg-green-600 flex items-center justify-center text-white">
                    <FaUserTie size={14} />
                  </div>
                )}
                <div
                  className={`max-w-[80%] px-3 py-2 rounded-lg text-sm ${
                    msg.sender === "user"
                      ? "ml-auto bg-[var(--color-brand-orange)] text-black"
                      : msg.sender === "agent"
                      ? "bg-green-700/20 border border-green-600 text-white"
                      : "bg-[#2b2b2b] text-white"
                  }`}
                >
                  {msg.text}
                </div>
                {msg.sender === "bot" && msg.showAgentCTA && (
                  <button
                    onClick={handleAgentRequest}
                    className="ml-2 mt-1 text-xs text-[var(--color-brand-orange)] underline hover:opacity-80"
                  >
                    Speak with an Agent
                  </button>
                )}
              </div>
            ))}

            {/* Typing Animation */}
            {isTyping && (
              <div className="flex gap-2 items-center bg-[#2b2b2b] text-white px-3 py-2 rounded-lg text-sm w-fit">
                <span className="flex gap-1">
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></span>
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-400"></span>
                </span>
              </div>
            )}

            {/* Suggested Queries */}
            {messages.length === 1 && (
              <div className="mt-4 space-y-2">
                <p className="text-sm text-gray-400">Suggested Questions:</p>
                {suggestedQueries.map((q) => (
                  <button
                    key={q.id}
                    onClick={() => handleSuggestionClick(q.question, q.answer, q.isAgent)}
                    className="w-full text-left px-3 py-2 text-sm rounded-md bg-[#2b2b2b] hover:bg-[#333] transition"
                  >
                    {q.question}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Input */}
          <div className="p-3 border-t border-gray-700 flex items-center gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Type your message..."
              className="flex-1 bg-[#2b2b2b] text-white px-3 py-2 rounded-lg outline-none"
            />
            <button
              onClick={handleSend}
              className="p-2 rounded-lg bg-[var(--color-brand-orange)] text-black hover:scale-95 transition-transform"
            >
              <FaPaperPlane />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBot;
