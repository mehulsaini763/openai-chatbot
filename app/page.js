import OpenAI from "openai";

export default function Home({children}) {
  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

  async function main() {
    console.log("HERE");
    const completion = await openai.chat.completions.create({
      messages: [{ role: "user", content: "This is test message." }],
      model: "gpt-3.5-turbo",
    });
    console.log(completion.choices[0]);
  }

  return ;
}
