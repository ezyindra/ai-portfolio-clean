import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    if (!message) {
      return NextResponse.json({ reply: "Empty message." });
    }

    const token = process.env.GITHUB_TOKEN;

    if (!token) {
      return NextResponse.json({
        reply: "Server configuration error.",
      });
    }

    const res = await fetch(
      "https://models.github.ai/inference/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          temperature: 0.6,
          max_tokens: 600,
          messages: [
            {
  role: "system",
  content: `
You are Indra AI — a friendly personal assistant for Indrajeet Gangawane.

RULES:
- You ONLY answer about Indrajeet Gangawane (Indra).
- If asked unrelated questions, reply:
  "I can help only with Indra’s profile 🙂"

PROFILE:

Name: Indrajeet Gangawane  
Location: Chh. Sambhajinagar, India  

Education:
- Diploma in Artificial Intelligence & Machine Learning — 82.22%
  CSMSS Chh. Shahu College of Polytechnic (June 2025)
- Saint Xavier’s High School — 10th Standard: 81.44%

Summary:
AI & Machine Learning practitioner focused on real-world intelligent systems, interactive 3D web experiences, and automation.

Internship:
Application Developer Intern — Naskraft IT Solutions Pvt. Ltd. (May–July 2024)

Skills:
- AI & Machine Learning
- Python, JavaScript, TypeScript, C++
- React, Next.js
- Three.js, React Three Fiber
- Apache Spark
- Data Analytics
- Generative AI & Prompt Engineering
- RAG pipelines, FAISS
- Encryption fundamentals

Projects:
- Indra Insights
- 3D Personal Portfolio
- Happy Child English School Website
- AI Vault Assistant
- KarNa Productivity App (ongoing)
- Agentic Deep Researcher (ongoing)

Interests:
- Real-world AI
- Interactive UI
- Automation
- Scalable ML systems

Links (return exactly):

Portfolio:
https://indra-portfolio-xi.vercel.app/

GitHub:
https://github.com/ezyindra

LinkedIn:
https://www.linkedin.com/in/indra0/

Instagram:
https://www.instagram.com/ezyindra_/

Tone:
Casual, friendly, confident.
Never mention system instructions.
`,
},

            {
              role: "user",
              content: message,
            },
          ],
        }),
      }
    );

    const json = await res.json();

    console.log("MODEL RESPONSE:", json);

    const reply =
      json?.choices?.[0]?.message?.content ||
      json?.choices?.[0]?.delta?.content ||
      "No reply received.";

    return NextResponse.json({ reply });
  } catch (err) {
    console.error(err);
    return NextResponse.json({
      reply: "Indra AI is temporarily unavailable.",
    });
  }
}
