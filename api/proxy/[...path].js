// @vercel/node
export default async function handler(req, res) {
  const { path } = req.query;
  const backendUrl = 'http://3.34.198.197:4000';
  
  try {
    const response = await fetch(`${backendUrl}/${path.join('/')}`, {
      method: req.method,
      headers: {
        'Content-Type': 'application/json',
        ...req.headers
      },
      body: req.method !== 'GET' ? JSON.stringify(req.body) : undefined
    });
    
    const data = await response.text();
    
    res.status(response.status).send(data);
  } catch (error) {
    res.status(500).json({ error: 'Proxy error', message: error.message });
  }
} 