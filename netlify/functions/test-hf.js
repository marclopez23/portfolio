import fetch from "node-fetch";

export async function handler() {
  const response = await fetch(
    "https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.2",
    {
      headers: { Authorization: `Bearer ${process.env.HF_API_KEY}` },
      method: "POST",
      body: JSON.stringify({
        inputs: "Say hello in Spanish"
      }),
    }
  );

  const result = await response.json();

  return {
    statusCode: 200,
    body: JSON.stringify(result),
  };
}
