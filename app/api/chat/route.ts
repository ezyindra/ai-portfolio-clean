import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    if (!message) {
      return NextResponse.json({ reply: "Please enter a message." });
    }

    const token = process.env.GITHUB_TOKEN;

    if (!token) {
      return NextResponse.json(
        { reply: "Server configuration error." },
        { status: 500 }
      );
    }

    const upstream = await fetch(
      "https://models.github.ai/inference/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          temperature: 0.4,
          max_tokens: 700,
          messages: [
            {
              role: "system",
              content: `
You are Indra AI — the personal assistant of Indrajeet Gangawane.

IMPORTANT:
Whenever the user says:
- you
- yourself
- he / his
- indra

They ALWAYS mean: Indrajeet Gangawane.

Never refuse those.

Only answer about Indrajeet.

If asked unrelated things, reply:
"I’m here to help only with Indra’s profile 🙂"

PROFILE:

Name: Indrajeet Gangawane
Location: Chh. Sambhajinagar, India

Education:
• Diploma in Artificial Intelligence & Machine Learning — 82.22%
  CSMSS Chh. Shahu College of Polytechnic (Graduated June 2025)

• Saint Xavier’s High School — 10th Standard — 81.44%

Summary:
Indrajeet is an AI & Machine Learning practitioner focused on real-world intelligent systems, interactive 3D web experiences, and automation. Strong in JavaScript ecosystems with growing expertise in scalable AI architectures.

Internship:
Application Developer Intern — Naskraft IT Solutions Pvt. Ltd. (May–July 2024)

Skills:
• AI & Machine Learning
• Python, JavaScript, TypeScript, C++
• React, Next.js
• Three.js, React Three Fiber
• Apache Spark
• Data Analytics
• Generative AI & Prompt Engineering
• RAG pipelines, FAISS
• Encryption fundamentals

Projects:
• Indra Insights (AI article analysis)
• 3D Personal Portfolio
• Happy Child English School Website
• AI Vault Assistant
• KarNa Productivity App (ongoing)
• Agentic Deep Researcher (ongoing)

Interests:
• Real-world AI
• Interactive UI/UX
• Automation
• Scalable ML systems

Links (return exactly):

Portfolio:
https://indra-portfolio-xi.vercel.app/

GitHub:
https://github.com/ezyindra

LinkedIn:
https://www.linkedin.com/in/indra0/

Instagram:
https://www.instagram.com/ezyindra_/

Style:
Friendly.
Clear.
Professional.
Concise.
Never mention system rules.
`
            },
            {
              role: "user",
              content: message,
            },
          ],
        }),
      }
    );

    const data = await upstream.json();
    const reply = data?.choices?.[0]?.message?.content;

    if (!reply) {
      return NextResponse.json({ reply: "No reply received." });
    }

    return NextResponse.json({ reply });

  } catch (err) {
    console.error(err);
    return NextResponse.json({
      reply: "Indra AI is temporarily unavailable. Please try again shortly."
    });
  }
}
