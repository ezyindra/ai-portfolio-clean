"use client";

import React, { useEffect, useState } from "react";

type Question = {
  question: string;
  options: string[];
  correctIndex: number;
};

type EncryptionModalProps = {
  trigger: React.ReactNode;
  videoRef: React.RefObject<HTMLVideoElement | null>;
  onUnlock?: () => void;
};

const FALLBACK_QUESTIONS: Question[] = [
  {
    question: "What does HTTPS primarily provide?",
    options: [
      "Faster loading",
      "Encrypted communication",
      "Better SEO",
      "Server caching",
    ],
    correctIndex: 1,
  },
  {
    question: "Which concept ensures data cannot be altered unnoticed?",
    options: [
      "Availability",
      "Integrity",
      "Latency",
      "Scalability",
    ],
    correctIndex: 1,
  },
  {
    question: "What is hashing mainly used for?",
    options: [
      "Encrypting files",
      "Password storage",
      "Compressing data",
      "Key exchange",
    ],
    correctIndex: 1,
  },
];

export default function EncryptionModal({
  trigger,
  videoRef,
  onUnlock,
}: EncryptionModalProps) {
  const [open, setOpen] = useState(false);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [unlocked, setUnlocked] = useState(false);
  const [loading, setLoading] = useState(false);

  /* Pause video + lock scroll when modal opens */
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      videoRef.current?.pause();
    } else {
      document.body.style.overflow = "";
      videoRef.current?.play().catch(() => {});
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [open, videoRef]);

  /* Fetch fresh questions */
  useEffect(() => {
    if (!open) return;

    const fetchQuestions = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/encryption-quiz", {
          cache: "no-store",
        });
        const data = await res.json();

        if (Array.isArray(data?.questions) && data.questions.length > 0) {
          setQuestions(data.questions);
        } else {
          setQuestions(FALLBACK_QUESTIONS);
        }
      } catch {
        setQuestions(FALLBACK_QUESTIONS);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [open]);

  const handleAnswer = (index: number) => {
    if (!questions[current]) return;

    const isCorrect = index === questions[current].correctIndex;
    const newScore = isCorrect ? score + 1 : score;

    if (isCorrect) setScore(newScore);

    const next = current + 1;

    if (next < questions.length) {
      setCurrent(next);
    } else {
      setCompleted(true);

      if (newScore >= Math.ceil(questions.length * 0.6)) {
        setUnlocked(true);
        onUnlock?.();
      }
    }
  };

  const reset = () => {
    setOpen(false);
    setQuestions([]);
    setCurrent(0);
    setScore(0);
    setCompleted(false);
    setUnlocked(false);
  };

  return (
    <>
      {/* Trigger */}
      <div onClick={() => setOpen(true)}>{trigger}</div>

      {/* Modal */}
      {open && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center px-4">
          <div className="max-w-lg w-full bg-[#030014] border border-purple-500/30 rounded-xl p-6">
            {loading ? (
              <p className="text-white/70 text-center">
                Decrypting questions…
              </p>
            ) : !completed ? (
              <>
                <h3 className="text-lg font-semibold mb-4 text-purple-400">
                  Security Check
                </h3>

                <p className="mb-4 text-sm text-white/60">
                  Answer{" "}
                  <span className="text-purple-400 font-medium">2 of 3</span>{" "}
                  security checks to unlock this encrypted vault.
                </p>

                <div className="h-px w-full bg-white/10 mb-4" />

                <p className="mb-6 text-white/80">
                  {questions[current]?.question}
                </p>

                <div className="flex flex-col gap-3">
                  {questions[current]?.options.map((opt, i) => (
                    <button
                      key={i}
                      onClick={() => handleAnswer(i)}
                      className="w-full px-4 py-3 border border-white/20 rounded-md text-left text-white hover:border-purple-400 hover:bg-purple-500/15 transition"
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </>
            ) : unlocked ? (
              <>
                <h3 className="text-xl font-bold text-green-400 mb-4">
                  Access Granted
                </h3>
                <button
                  onClick={() => setOpen(false)}
                  className="px-6 py-2 bg-green-500/20 border border-green-400 rounded-md hover:bg-green-500/30 transition"
                >
                  Enter
                </button>
              </>
            ) : (
              <>
                <h3 className="text-xl font-bold text-red-400 mb-4">
                  Access Denied
                </h3>
                <button
                  onClick={reset}
                  className="px-6 py-2 bg-red-500/20 border border-red-400 rounded-md hover:bg-red-500/30 transition"
                >
                  Retry
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
