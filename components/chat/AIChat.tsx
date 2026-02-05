"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type ChatMessage = {
  role: "user" | "ai";
  text: string;
};

const API_URL = "/api/chat";

export const AIChat = () => {
  const [open, setOpen] = useState(true);
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState<ChatMessage[]>([]);
  const [typing, setTyping] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  /* Auto scroll */
  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [chat, typing]);

  /* Autofocus when opened */
  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  const typeText = async (text: string) => {
    let current = "";

    setChat((prev) => [...prev, { role: "ai", text: "" }]);

    for (const char of text) {
      current += char;

      setChat((prev) => {
        const updated = [...prev];
        updated[updated.length - 1] = { role: "ai", text: current };
        return updated;
      });

      await new Promise((r) => setTimeout(r, 8));
    }

    setTyping(false);
  };

  const sendMessage = async () => {
    if (!message.trim() || typing) return;

    const userMessage = message;
    setMessage("");
    setTyping(true);

    setChat((prev) => [...prev, { role: "user", text: userMessage }]);

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage }),
      });

      const result = await res.json();

      await typeText(result.reply || "No reply received.");

    } catch {
      setTyping(false);
      setChat((prev) => [
        ...prev,
        { role: "ai", text: "⚠️ Indra AI is temporarily offline." },
      ]);
    }
  };

  return (
    <>
      {/* Reopen */}
      {!open && (
        <motion.button
          whileHover={{ scale: 1.08 }}
          onClick={() => setOpen(true)}
          className="fixed bottom-10 right-10 z-[999]
          bg-cyan-400 text-black px-6 py-2 rounded-full shadow-xl"
        >
          Open Indra AI
        </motion.button>
      )}

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.4 }}
            drag
            dragMomentum={false}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-[999]
            w-[92vw] max-w-5xl h-[520px]
            bg-gradient-to-br from-[#020617] via-[#050b18] to-black
            border border-cyan-400/40 rounded-2xl p-6
            shadow-[0_0_80px_rgba(0,255,255,.25)]
            backdrop-blur-xl"
          >
            {/* Glow */}
            <div className="absolute inset-0 rounded-2xl bg-cyan-400/10 blur-2xl -z-10" />

            {/* Header */}
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
                <h2 className="text-cyan-400 font-semibold tracking-wide">
                  Indra AI Console
                </h2>
                <span className="text-xs text-cyan-300/60">ONLINE</span>
              </div>

              <button
                onClick={() => setOpen(false)}
                className="text-white/60 hover:text-red-400 transition text-xl"
              >
                ✕
              </button>
            </div>

            {/* Messages */}
            <div
              ref={scrollRef}
              className="h-[360px] overflow-y-auto space-y-4 mb-4 pr-2"
            >
              {chat.map((msg, i) => (
                <div
                  key={i}
                  className={`px-4 py-2 rounded-xl text-sm max-w-[80%] ${
                    msg.role === "user"
                      ? "ml-auto bg-cyan-400 text-black"
                      : "mr-auto bg-white/10 text-cyan-100"
                  }`}
                >
                  {msg.text}
                </div>
              ))}

              {typing && (
                <div className="mr-auto bg-white/10 text-cyan-200 px-4 py-2 rounded-xl animate-pulse text-sm">
                  Indra AI is thinking…
                </div>
              )}
            </div>

            {/* Input */}
            <div className="flex gap-3">
              <input
                ref={inputRef}
                className="flex-1 bg-black/40 border border-cyan-400/40 rounded-lg px-4 py-2 text-white outline-none focus:border-cyan-400"
                placeholder="Ask about Indra..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && !typing && sendMessage()}
              />

              <button
                onClick={sendMessage}
                disabled={typing}
                className="bg-cyan-400 hover:bg-cyan-300 px-6 py-2 rounded-lg text-black transition disabled:opacity-50"
              >
                Send
              </button>
            </div>

            <div className="text-center text-xs text-cyan-400/50 mt-3">
              Drag window • Powered by Indra AI
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
