import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export const dynamic = "force-dynamic"; // defaults to auto

export async function POST(req) {
  const body = await req.json();
  // Process the request (You can perform any desired logic here)
  const completion = await openai.chat.completions.create({
    messages: [{ role: "system", content: body.message }],
    model: "gpt-3.5-turbo",
    max_tokens: 50,
    temperature: 0.7,
  });

  return Response.json({
    role: completion.choices[0].message.role,
    message: completion.choices[0].message.content,
    status: 200,
  });
}
