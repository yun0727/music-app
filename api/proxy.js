// @vercel/node
export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  // Handle preflight requests
  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  const backendUrl = "http://43.200.172.27:4000:4000:4000";

  try {
    // For GraphQL requests, use the /graphql endpoint
    // For other requests, use the original path
    let targetPath;
    if (req.url === "/api/proxy") {
      targetPath = "/graphql";
    } else if (req.url.startsWith("/api/proxy/")) {
      targetPath = req.url.replace("/api/proxy", "");
    } else {
      targetPath = req.url;
    }

    const targetUrl = `${backendUrl}${targetPath}`;

    console.log("=== PROXY REQUEST DEBUG ===");
    console.log("Method:", req.method);
    console.log("Original URL:", req.url);
    console.log("Target URL:", targetUrl);
    console.log("Request Headers:", JSON.stringify(req.headers, null, 2));
    console.log("Request Body:", JSON.stringify(req.body, null, 2));
    console.log("==========================");

    // Prepare headers for GraphQL request
    const headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
      "User-Agent": "Vercel-Proxy/1.0",
    };

    // Prepare request options
    const requestOptions = {
      method: req.method,
      headers: headers,
    };

    // Add body for non-GET requests
    if (req.method !== "GET" && req.body) {
      requestOptions.body = JSON.stringify(req.body);
      console.log("Request body being sent:", requestOptions.body);
    }

    console.log(
      "Final request options:",
      JSON.stringify(requestOptions, null, 2)
    );

    const response = await fetch(targetUrl, requestOptions);

    const data = await response.text();

    console.log("=== BACKEND RESPONSE DEBUG ===");
    console.log("Response Status:", response.status);
    console.log(
      "Response Headers:",
      JSON.stringify(Object.fromEntries(response.headers.entries()), null, 2)
    );
    console.log("Response Data (first 500 chars):", data.substring(0, 500));
    console.log("================================");

    // Forward response headers
    response.headers.forEach((value, key) => {
      res.setHeader(key, value);
    });

    res.status(response.status).send(data);
  } catch (error) {
    console.error("=== PROXY ERROR ===");
    console.error("Error:", error);
    console.error("Error message:", error.message);
    console.error("Error stack:", error.stack);
    console.error("==================");
    res.status(500).json({ error: "Proxy error", message: error.message });
  }
}
