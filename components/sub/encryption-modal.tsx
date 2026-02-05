"use client";

import { ReactNode, RefObject, useEffect, useState } from "react";

type Question = {
  question: string;
  options: string[];
  correctIndex: number;
};

interface EncryptionModalProps {
  videoRef: RefObject<HTMLVideoElement>;
  onUnlock: () => void;
  trigger: ReactNode;
}

export default function EncryptionModal({
  videoRef,
  onUnlock,
  trigger,
}: EncryptionModalProps) {
  const [open, setOpen] = useState(false);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(false);
  const [failed, setFailed] = useState(false);

  /* Pause background video */
  useEffect(() => {
    if (open) videoRef.current?.pause();
    else videoRef.current?.play().catch(() => { });
  }, [open, videoRef]);

  /* Load questions when opened */
  useEffect(() => {
    if (!open) return;

    setQuestions([]);
    setCurrent(0);
    setScore(0);
    setFailed(false);

    loadQuestions();
  }, [open]);

  const loadQuestions = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/encryption-quiz?t=${Date.now()}`, {
        cache: "no-store",
      });


      const data = await res.json();

      if (Array.isArray(data?.questions)) {
        setQuestions(data.questions);
      } else {
        setQuestions([]);
      }
    } catch {
      setQuestions([]);
    } finally {
      setLoading(false);
    }
  };

  const handleAnswer = (i: number) => {
    if (!questions[current]) return;

    const isCorrect = i === questions[current].correctIndex;
    const newScore = score + (isCorrect ? 1 : 0);

    if (isCorrect) setScore(newScore);

    const next = current + 1;

    if (next < questions.length) {
      setCurrent(next);
      return;
    }

    // FINAL RESULT
    if (newScore >= 2) {
      onUnlock();
      setOpen(false);
    } else {
      setFailed(true);
    }
  };

  const retry = () => {
    setFailed(false);
    setOpen(false);

    setTimeout(() => {
      setOpen(true);
    }, 200);
  };

  return (
    <>
      <div onClick={() => setOpen(true)}>{trigger}</div>

      {open && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xl flex items-center justify-center px-4">
          <div
            className="max-w-lg w-full rounded-xl p-6
            bg-gradient-to-br from-[#020617] via-[#040b18] to-black
            border border-cyan-400/40
            shadow-[0_0_60px_rgba(0,255,255,.25)]"
          >
            {loading ? (
              <p className="text-center text-cyan-300">Decrypting…</p>
            ) : failed ? (
              <div className="text-center space-y-4">
                <h3 className="text-red-400 tracking-widest text-lg">
                  VERIFICATION FAILED
                </h3>

                <p className="text-white/60 text-sm">
                  Incorrect answers detected. Try again.
                </p>

                <button
                  onClick={retry}
                  className="mt-4 px-6 py-2 rounded-md
                  bg-red-500/20 border border-red-400
                  text-red-300 hover:bg-red-500/30 transition"
                >
                  Retry Verification
                </button>
              </div>
            ) : (
              <>
                <h3 className="text-cyan-400 tracking-[0.35em] text-xs mb-2">
                  SECURITY CHECK
                </h3>

                <p className="text-white/60 text-sm mb-3">
                  Answer{" "}
                  <span className="text-cyan-400 font-semibold">2 out of 3</span>{" "}
                  questions to unlock this vault.
                </p>

                <div className="h-px bg-cyan-400/20 mb-4" />

                <div className="text-xs text-cyan-300/70 mb-3">
                  Question {current + 1} / {questions.length}
                </div>

                <p className="text-white mb-5">
                  {questions[current]?.question}
                </p>

                <div className="space-y-3">
                  {questions[current]?.options.map((opt, i) => (
                    <button
                      key={i}
                      onClick={() => handleAnswer(i)}
                      className="w-full px-4 py-3 rounded-md text-left
                      border border-cyan-400/30
                      text-white bg-black/40
                      hover:bg-cyan-400/15 hover:border-cyan-400 transition"
                    >
                      {opt}
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => setOpen(false)}
                  className="mt-6 text-xs text-red-400/70 hover:text-red-400 transition"
                >
                  Abort
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
