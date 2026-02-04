"use client";

import { motion } from "framer-motion";
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
  const [error, setError] = useState("");

  // Initial decrypt animation
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  // Fetch MCQs once decrypt finishes
  useEffect(() => {
    if (loading) return;

    fetch("/api/encryption-quiz", { cache: "no-store" })
      .then((res) => res.json())
      .then((data) => {
        setQuestions(data.questions || []);
      })
      .catch(() => setError("Failed to load verification questions."));
  }, [loading]);

  const selectAnswer = (qIndex: number, optIndex: number) => {
    const next = [...answers];
    next[qIndex] = optIndex;
    setAnswers(next);
  };

  const verify = () => {
    let score = 0;

    questions.forEach((q, i) => {
      if (answers[i] === q.correctIndex) score++;
    });

    if (score >= 2) {
      setUnlocked(true);
    } else {
      setError("Verification failed. Try again.");
      setAnswers([]);
    }
  };

  // Decrypt screen
  if (loading) {
    return (
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black text-purple-400 text-3xl font-semibold"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        🔓 Decrypting Indra AI Vault...
      </motion.div>
    );
  }

  // Chat unlocked
  if (unlocked) {
    return (
      <motion.div
        className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/90"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <motion.h1
          className="text-4xl mb-4 text-purple-400"
          initial={{ y: -30 }}
          animate={{ y: 0 }}
        >
          Welcome to Indra AI
        </motion.h1>

        <p className="text-white/70 mb-8">
          Your personal assistant. Ask me anything about Indra.
        </p>

        <AIChat />
      </motion.div>
    );
  }

  // Quiz screen
  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/90 px-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <h2 className="text-3xl text-purple-400 mb-6">
        Vault Verification
      </h2>

      {questions.map((q, qi) => (
        <div key={qi} className="mb-6 max-w-xl w-full">
          <p className="text-white mb-3">{q.question}</p>

          {q.options.map((opt, oi) => (
            <button
              key={oi}
              onClick={() => selectAnswer(qi, oi)}
              className={`block w-full text-left px-4 py-2 mb-2 rounded border ${
                answers[qi] === oi
                  ? "border-purple-400 text-purple-300"
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
        className="mt-4 px-6 py-2 rounded bg-purple-500 text-black font-semibold"
      >
        Unlock Vault
      </button>
    </motion.div>
  );
};
