// Vercel serverless function: sends the marked room photo to Claude and returns its answer.
// Set ANTHROPIC_API_KEY in Vercel → Project → Settings → Environment Variables to turn it on.
// Optional: ANTHROPIC_MODEL to choose the model.
module.exports = async (req, res) => {
  const key = process.env.ANTHROPIC_API_KEY;
  if (req.method === "GET") return res.status(200).json({ enabled: Boolean(key) });
  if (req.method !== "POST") return res.status(405).json({ error: "Use POST" });
  if (!key) return res.status(501).json({ error: "ANTHROPIC_API_KEY is not set" });

  const { prompt, image, mediaType } = req.body || {};
  if (typeof prompt !== "string" || prompt.length > 20000 || typeof image !== "string" || image.length > 6_000_000) {
    return res.status(400).json({ error: "Bad request" });
  }
  const type = ["image/jpeg", "image/png", "image/webp"].includes(mediaType) ? mediaType : "image/jpeg";

  try {
    const r = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: { "x-api-key": key, "anthropic-version": "2023-06-01", "content-type": "application/json" },
      body: JSON.stringify({
        model: process.env.ANTHROPIC_MODEL || "claude-sonnet-4-5",
        max_tokens: 1200,
        messages: [{ role: "user", content: [
          { type: "image", source: { type: "base64", media_type: type, data: image } },
          { type: "text", text: prompt },
        ] }],
      }),
    });
    const data = await r.json();
    if (!r.ok) return res.status(r.status === 429 ? 429 : 502).json({ error: data?.error?.message || "Claude request failed" });
    const text = (data.content || []).filter(b => b.type === "text").map(b => b.text).join("");
    return res.status(200).json({ text });
  } catch (e) {
    return res.status(502).json({ error: "Could not reach Claude" });
  }
};
