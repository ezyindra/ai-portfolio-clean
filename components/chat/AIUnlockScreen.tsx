"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { AIChat } from "./AIChat";

type MCQ = {
  question: string;
  options: string[];
  correctIndex: number;
};

export const AIUnlockScreen = () => {
  const [loading, setLoading] = useState(true);
  const [questions, setQuestions] = useState<MCQ[]>([]);
  const [answers, setAnswers] = useState<number[]>([]);
  const [unlocked, setUnlocked] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);
  const [error, setError] = useState("");

  // Initial decrypt animation
  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1800);
    return () => clearTimeout(t);
  }, []);

  // Load MCQs
  useEffect(() => {
    if (loading) return;

    fetch("/api/encryption-quiz", { cache: "no-store" })
      .then((r) => r.json())
      .then((d) => setQuestions(d.questions || []))
      .catch(() => setError("Failed to load verification questions."));
  }, [loading]);

  const selectAnswer = (q: number, o: number) => {
    const next = [...answers];
    next[q] = o;
    setAnswers(next);
  };

  const verify = () => {
    let score = 0;
    questions.forEach((q, i) => answers[i] === q.correctIndex && score++);

    if (score >= 2) {
      setUnlocked(true);
      setShowWelcome(true);

      // show welcome for 2.5s, then chat
      setTimeout(() => setShowWelcome(false), 2500);
    } else {
      setError("Verification failed. Try again.");
      setAnswers([]);
    }
  };

  // Decrypt screen
  if (loading) {
    return (
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black text-cyan-400 text-3xl font-semibold tracking-wide"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        🔐 Decrypting Indra Vault…
      </motion.div>
    );
  }

  // Post-unlock welcome animation
  if (unlocked && showWelcome) {
    return (
      <motion.div className="fixed inset-0 z-50 flex items-center justify-center bg-black">
        <motion.div
          initial={{ scale: 0.6, opacity: 0, filter: "blur(12px)" }}
          animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h1 className="text-5xl font-bold bg-gradient-to-r from-cyan-400 via-fuchsia-500 to-indigo-400 bg-clip-text text-transparent">
            Welcome to Indra AI
          </h1>

          <p className="mt-4 text-white/70">
            Your personal assistant — explore Indra’s world.
          </p>
        </motion.div>
      </motion.div>
    );
  }

  // Chat
  if (unlocked) {
    return (
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/90"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <AIChat />
      </motion.div>
    );
  }

  // Quiz
  return (
    <motion.div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black px-6">
      <h2 className="text-3xl mb-6 bg-gradient-to-r from-cyan-400 to-fuchsia-500 bg-clip-text text-transparent">
        Vault Verification
      </h2>

      {questions.map((q, qi) => (
        <div key={qi} className="mb-6 max-w-xl w-full">
          <p className="text-white mb-3">{q.question}</p>

          {q.options.map((opt, oi) => (
            <button
              key={oi}
              onClick={() => selectAnswer(qi, oi)}
              className={`block w-full px-4 py-2 mb-2 rounded border transition ${
                answers[qi] === oi
                  ? "border-cyan-400 text-cyan-300"
                  : "border-white/20 text-white/70"
              }`}
            >
              {opt}
            </button>
          ))}
        </div>
      ))}

      {error && <p className="text-red-400 mb-4">{error}</p>}

      <button
        onClick={verify}
        className="mt-4 px-8 py-2 rounded-xl bg-gradient-to-r from-cyan-400 to-fuchsia-500 text-black font-semibold"
      >
        Unlock Vault
      </button>
    </motion.div>
  );
};
