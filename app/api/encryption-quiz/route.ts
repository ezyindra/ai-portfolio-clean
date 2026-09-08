import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Question = {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
};

const QUESTION_POOL: Question[] = [
  {
    id: 1,
    question: "Which protocol encrypts web traffic?",
    options: ["FTP", "HTTP", "HTTPS", "SMTP"],
    correctIndex: 2,
  },

  {
    id: 2,
    question: "What is hashing commonly used for?",
    options: [
      "Storing passwords securely",
      "Increasing internet speed",
      "Compressing videos",
      "Improving screen resolution",
    ],
    correctIndex: 0,
  },

  {
    id: 3,
    question: "Which method verifies a user's identity?",
    options: [
      "Caching",
      "Authentication",
      "Compression",
      "Routing",
    ],
    correctIndex: 1,
  },

  {
    id: 4,
    question: "Which of these is the strongest password?",
    options: [
      "password123",
      "12345678",
      "Indrajeet123",
      "T7!qP9#vL2@x",
    ],
    correctIndex: 3,
  },

  {
    id: 5,
    question: "What does MFA stand for?",
    options: [
      "Multi-Factor Authentication",
      "Maximum File Access",
      "Managed Firewall Application",
      "Multiple File Authorization",
    ],
    correctIndex: 0,
  },

  {
    id: 6,
    question:
      "Which attack tricks users into revealing sensitive information?",
    options: [
      "Phishing",
      "Caching",
      "Rendering",
      "Compression",
    ],
    correctIndex: 0,
  },

  {
    id: 7,
    question:
      "Which algorithm is commonly used for symmetric encryption?",
    options: [
      "AES",
      "RSA",
      "SHA-256",
      "MD5",
    ],
    correctIndex: 0,
  },

  {
    id: 8,
    question:
      "Which algorithm is commonly used for asymmetric encryption?",
    options: [
      "AES",
      "RSA",
      "SHA-256",
      "CRC32",
    ],
    correctIndex: 1,
  },

  {
    id: 9,
    question:
      "What is the main purpose of a firewall?",
    options: [
      "Edit images",
      "Filter network traffic",
      "Compress files",
      "Increase computer speed",
    ],
    correctIndex: 1,
  },

  {
    id: 10,
    question:
      "Which of these should never be shared publicly?",
    options: [
      "Favorite color",
      "Public GitHub username",
      "API secret key",
      "Favorite programming language",
    ],
    correctIndex: 2,
  },

  {
    id: 11,
    question:
      "What does HTTPS help protect?",
    options: [
      "Data transmitted between browser and server",
      "Computer battery life",
      "Screen resolution",
      "CPU temperature",
    ],
    correctIndex: 0,
  },

  {
    id: 12,
    question:
      "Which is an example of biometric authentication?",
    options: [
      "Password",
      "Fingerprint",
      "Username",
      "PIN",
    ],
    correctIndex: 1,
  },

  {
    id: 13,
    question:
      "What is encryption primarily used for?",
    options: [
      "Protecting readable data by converting it into ciphertext",
      "Increasing storage capacity",
      "Making websites load faster",
      "Removing malware automatically",
    ],
    correctIndex: 0,
  },

  {
    id: 14,
    question:
      "Which practice provides additional protection for an online account?",
    options: [
      "Using the same password everywhere",
      "Sharing your password",
      "Using multi-factor authentication",
      "Disabling security updates",
    ],
    correctIndex: 2,
  },

  {
    id: 15,
    question:
      "What should you do when you receive a suspicious login link?",
    options: [
      "Click it immediately",
      "Enter your password",
      "Verify the source first",
      "Forward it to everyone",
    ],
    correctIndex: 2,
  },

  {
    id: 16,
    question:
      "Which of these is a type of malware?",
    options: [
      "Ransomware",
      "HTML",
      "CSS",
      "JSON",
    ],
    correctIndex: 0,
  },

  {
    id: 17,
    question:
      "Why are security updates important?",
    options: [
      "They can fix known vulnerabilities",
      "They remove the need for passwords",
      "They disable encryption",
      "They increase monitor size",
    ],
    correctIndex: 0,
  },

  {
    id: 18,
    question:
      "Where should a private API key normally be stored?",
    options: [
      "Public GitHub repository",
      "Frontend JavaScript",
      "Server-side environment variable",
      "Website URL",
    ],
    correctIndex: 2,
  },
];

function shuffle<T>(array: T[]): T[] {
  const copy = [...array];

  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));

    [copy[i], copy[j]] = [copy[j], copy[i]];
  }

  return copy;
}

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);

    const usedParam = url.searchParams.get("used") || "";

    const usedIds = usedParam
      .split(",")
      .map((id) => Number(id))
      .filter((id) => Number.isInteger(id));

    // Remove questions already shown to this visitor
    let availableQuestions = QUESTION_POOL.filter(
      (question) => !usedIds.includes(question.id)
    );

    // If fewer than 3 questions remain,
    // start a new cycle.
    if (availableQuestions.length < 3) {
      availableQuestions = [...QUESTION_POOL];
    }

    // Randomly select 3 questions
    const selectedQuestions = shuffle(
      availableQuestions
    ).slice(0, 3);

    return NextResponse.json(
      {
        questions: selectedQuestions,
      },
      {
        headers: {
          "Cache-Control":
            "no-store, no-cache, must-revalidate",
          Pragma: "no-cache",
        },
      }
    );
  } catch (error) {
    console.error(
      "Encryption quiz API error:",
      error
    );

    return NextResponse.json(
      {
        error: "Unable to load security questions.",
      },
      { status: 500 }
    );
  }
}