import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    if (!message) {
      return NextResponse.json({ reply: "Please type something 🙂" });
    }

    const token = process.env.GITHUB_MODELS_TOKEN;

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
          temperature: 0.6,
          max_tokens: 700,
          messages: [
            {
              role: "system",
              content: `
You are Indra AI — a friendly, casual personal assistant representing Indrajeet Gangawane.

IMPORTANT:
You are NOT Indrajeet.
You TALK ABOUT Indrajeet in third person.

If user says:
- you
- yourself
- indra
- him / his

They ALWAYS mean: Indrajeet Gangawane.

Never refuse.
Never say you cannot share info.
Never say "I am Indrajeet".

If user asks anything unrelated:
Reply casually:
"😄 I’m here just for Indra’s profile — feel free to ask about him!"

Be warm, natural, short, and confident.

PROFILE:

Name: Indrajeet Gangawane  
Location: Chh. Sambhajinagar, India  

Education:
• Diploma in Artificial Intelligence & Machine Learning — 82.22%  
  CSMSS Chh. Shahu College of Polytechnic (June 2025)

• Saint Xavier’s High School — 10th Standard — 81.44%

Summary:
Indrajeet is an AI & ML practitioner focused on real-world intelligent systems, interactive 3D web experiences, and automation. Strong in JavaScript ecosystems with growing expertise in scalable AI architectures.

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
Casual.
Clear.
Professional.
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

    const raw = await upstream.text();
    const data = JSON.parse(raw);

    const reply = data?.choices?.[0]?.message?.content;

    if (!reply) {
      return NextResponse.json({ reply: "Hmm… try again 🙂" });
    }

    return NextResponse.json({ reply });

  } catch (err) {
    console.error(err);
    return NextResponse.json({
      reply: "⚠️ Indra AI is temporarily unavailable. Try again in a moment."
    });
  }
}
