"use server";

export default async function AiContent({
  text,
  customInstructions = "",
  contentGen = false,
}) {
  let basePrompt;

  if (contentGen) {
    basePrompt = `
You are a senior professional blog writer.

Write a full-length, engaging, SEO-friendly blog article on the topic below.

WRITING STYLE RULES:
- Write naturally, like a human expert.
- Use smooth flow and transitions.
- Use short, readable paragraphs.
- Keep the tone friendly, informative, and professional.
- Add examples, explanations, and value.
- Headings should be simple plain text like:
  Heading: Modern Front-End Trends
- Use bullet points only when needed.

OUTPUT FORMAT RULES:
- Output MUST be plain text only.
- Do NOT use markdown (**bold**, *italic*, etc.).
- Do NOT use HTML tags (<p>, <h1>, etc.).
- Do NOT wrap headings in symbols.
- No formatting characters like *, _, #, /, >, or backticks.
- The entire output must look like a clean text document.

TOPIC:
${text}

Additional notes:
${customInstructions}

Write the full blog article now in clean plain text.
`;
  } else {
    basePrompt = `
Rewrite the following content in clear, simple, easy-to-read language.

RULES:
- Output plain text only.
- Do NOT use markdown (**bold**, *italic*, etc.).
- Do NOT use HTML.
- Do NOT add symbols.
- Keep it professional and natural.
- Improve clarity, flow, readability, and structure.

CONTENT TO REWRITE:
${text}

Additional instructions:
${customInstructions}

Return the improved plain text only.
`;
  }

  try {
    const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "HTTP-Referer": "http://localhost:3000",
        "X-Title": "My App AI",
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
      },
      body: JSON.stringify({
        model: "meta-llama/llama-3.1-8b-instruct",
        messages: [{ role: "user", content: basePrompt }],
        max_tokens: contentGen ? 2000 : 700,
      }),
    });

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`OpenRouter Error ${res.status}: ${errorText}`);
    }

    const data = await res.json();

    // remove leftover markdown symbols (safety)
    const cleaned = data.choices[0].message.content
      .replace(/\*\*/g, "")
      .replace(/\*/g, "")
      .replace(/_/g, "")
      .replace(/#/g, "")
      .trim();

    return cleaned;
  } catch (error) {
    console.error("AI Error:", error.message);
    throw error;
  }
}
