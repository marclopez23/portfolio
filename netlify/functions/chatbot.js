import fetch from "node-fetch";
import portfolio from "../../src/data/portfolio.json";

export async function handler(event) {
  const { question } = JSON.parse(event.body);

  const contexto = JSON.stringify(portfolio, null, 2);

  const response = await fetch(
    "https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.2",
    {
      headers: { Authorization: `Bearer ${process.env.HF_API_KEY}` },
      method: "POST",
      body: JSON.stringify({
        inputs: `Responde usando esta información del portfolio:\n${contexto}\n\nPregunta: ${question}`
      }),
    }
  );

  const result = await response.json();

  return {
    statusCode: 200,
    body: JSON.stringify({ answer: result[0].generated_text }),
  };
}
