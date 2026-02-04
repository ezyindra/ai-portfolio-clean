"use client";

import { useEffect, useRef, useState } from "react";

type ChatMessage = {
  role: "user" | "ai";
  text: string;
};

// Use Next.js API route (Vercel compatible)
const API_URL = "/api/chat";

export const AIChat = () => {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState<ChatMessage[]>([]);
  const [typing, setTyping] = useState(false);

  const bottomRef = useRef<HTMLDivElement>(null);

  // Auto scroll
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat, typing]);

  const typeText = async (text: string) => {
    let current = "";

    for (let char of text) {
      current += char;
      setChat((prev) => [
        ...prev.slice(0, -1),
        { role: "ai", text: current },
      ]);
      await new Promise((r) => setTimeout(r, 12));
    }

    setTyping(false);
  };

  const sendMessage = async () => {
    if (!message.trim() || typing) return;

    const userMessage = message.trim();
    setMessage("");

    setChat((prev) => [...prev, { role: "user", text: userMessage }]);
    setTyping(true);

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage }),
      });

      const data = await res.json();

      if (!res.ok || !data?.reply) {
        throw new Error("Bad response");
      }

      setChat((prev) => [...prev, { role: "ai", text: "" }]);
      await typeText(data.reply);
    } catch {
      setTyping(false);
      setChat((prev) => [
        ...prev,
        {
          role: "ai",
          text: "⚠️ Indra AI is temporarily unavailable. Please try again in a moment.",
        },
      ]);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto bg-black/60 backdrop-blur-xl border border-purple-500/30 rounded-2xl p-6 shadow-xl">
      <h2 className="text-2xl font-semibold text-purple-400 mb-4">
        Indra AI — Personal Assistant
      </h2>

      <div className="h-80 overflow-y-auto space-y-4 mb-4 pr-2">
        {chat.map((msg, i) => (
          <div
            key={i}
            className={`p-3 rounded-xl max-w-[80%] ${
              msg.role === "user"
                ? "ml-auto bg-purple-600 text-white"
                : "mr-auto bg-gray-800 text-gray-200"
            }`}
          >
            {msg.text}
          </div>
        ))}

        {typing && (
          <div className="mr-auto bg-gray-800 text-gray-400 p-3 rounded-xl animate-pulse">
            Indra AI is typing...
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      <div className="flex gap-2">
        <input
          className="flex-1 bg-gray-900 border border-purple-500/40 rounded-lg px-4 py-2 text-white outline-none focus:border-purple-400"
          placeholder="Ask me anything about Indra..."
          value={message}
          disabled={typing}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />

        <button
          onClick={sendMessage}
          disabled={typing || !message.trim()}
          className="bg-purple-600 hover:bg-purple-700 px-6 py-2 rounded-lg text-white font-medium transition disabled:opacity-50"
        >
          Send
        </button>
      </div>
    </div>
  );
};
