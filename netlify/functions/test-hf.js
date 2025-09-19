import fetch from "node-fetch";

export async function handler() {
  const response = await fetch(
    "https://api-inference.huggingface.co/models/bigscience/bloomz-560m",
    {
      headers: { Authorization: `Bearer ${process.env.HF_API_KEY}` },
      method: "POST",
      body: JSON.stringify({ inputs: "Say hello in Spanish" }),
    }
  );

  const result = await response.json();

  return {
    statusCode: response.status,
    body: JSON.stringify(result),
  };
}


