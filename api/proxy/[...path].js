// @vercel/node
export default async function handler(req, res) {
  const { path } = req.query;
  const backendUrl = "http://3.37.17.190:4000";

  try {
    // GraphQL 요청인 경우 특별 처리
    const isGraphQL = req.body && req.body.query;

    const headers = {
      "Content-Type": "application/json",
      ...req.headers,
    };

    // GraphQL 요청인 경우 CSRF 방지 헤더 추가
    if (isGraphQL) {
      headers["x-apollo-operation-name"] = "query";
      headers["apollo-require-preflight"] = "true";
    }

    // CORS 헤더 제거 (프록시에서 처리)
    delete headers["origin"];
    delete headers["referer"];

    const response = await fetch(`${backendUrl}/${path.join("/")}`, {
      method: req.method,
      headers,
      body: req.method !== "GET" ? JSON.stringify(req.body) : undefined,
    });

    const data = await response.text();

    // CORS 헤더 추가
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, DELETE, OPTIONS"
    );
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Content-Type, Authorization, x-apollo-operation-name, apollo-require-preflight"
    );

    res.status(response.status).send(data);
  } catch (error) {
    console.error("Proxy error:", error);
    res.status(500).json({ error: "Proxy error", message: error.message });
  }
}
