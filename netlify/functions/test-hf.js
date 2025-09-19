import fetch from "node-fetch";

export async function handler() {
  const response = await fetch(
  "https://api-inference.huggingface.co/models/google/flan-t5-base",
  {
    headers: { Authorization: `Bearer ${process.env.HF_API_KEY}` },
    method: "POST",
    body: JSON.stringify({ inputs: "Say hello in Spanish" }),
  }
);

  const text = await response.text(); // <-- lee como texto

  return {
    statusCode: response.status,
    body: text,
  };
}
