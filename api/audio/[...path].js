// @vercel/node
export default async function handler(req, res) {
  const { path } = req.query;
  const backendUrl = "http://3.38.42.22:4000:4000";

  try {
    const response = await fetch(`${backendUrl}/audio/${path.join("/")}`, {
      method: req.method,
      headers: {
        ...req.headers,
        host: undefined, // Remove host header to avoid conflicts
      },
    });

    if (!response.ok) {
      return res.status(response.status).json({
        error: "Audio not found",
        status: response.status,
      });
    }

    // Forward the response headers
    Object.entries(response.headers).forEach(([key, value]) => {
      if (key.toLowerCase() !== "content-encoding") {
        // Avoid compression issues
        res.setHeader(key, value);
      }
    });

    // Stream the audio data
    response.body.pipe(res);
  } catch (error) {
    console.error("Audio proxy error:", error);
    res
      .status(500)
      .json({ error: "Audio proxy error", message: error.message });
  }
}
