const express = require('express');
const httpProxy = require('http-proxy');

const app = express();
const proxy = httpProxy.createProxyServer({});

// Middleware to handle the proxying
app.use((req, res) => {
  const targetUrl = req.headers['target-url']; // Expecting target URL in headers
  if (!targetUrl) {
    return res.status(400).send('Target URL is required');
  }

  proxy.web(req, res, { target: targetUrl, changeOrigin: true }, (err) => {
    console.error(err);
    res.status(500).send('Proxy error');
  });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Proxy server running on port ${PORT}`);
});