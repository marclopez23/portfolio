export async function handler() {
  return {
    statusCode: 200,
    body: JSON.stringify({
      key: process.env.HF_API_KEY
        ? process.env.HF_API_KEY.slice(0, 10) + "..."  // muestra solo el inicio
        : "NOT FOUND"
    })
  };
}
