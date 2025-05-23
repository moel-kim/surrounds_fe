/* eslint-disable @typescript-eslint/no-var-requires */
const http = require('http');
const https = require('https');
const next = require('next');
const port = parseInt(process.env.PORT, 10) || 10000;
const dev = process.env.NODE_ENV !== 'production';
const enableHttps = process.env.ENABLE_HTTPS === 'true';
const app = next({ dev });
const handle = app.getRequestHandler();
const express = require('express');
const fs = require('fs');

const httpsOptions = () => {
  return {
    key: fs.readFileSync('./localhost.key'),
    cert: fs.readFileSync('./localhost.crt'),
  };
};

app.prepare().then(() => {
  const app = express();

  app.all('*', (req, res) => {
    return handle(req, res);
  });

  if (enableHttps) {
    const secureServer = https.createServer(httpsOptions(), app);
    secureServer.listen(port, (err) => {
      if (err) throw err;
      console.log(`> Ready on https://localhost:${port}`);
    });
  } else {
    const unsecureServer = http.createServer(app);
    unsecureServer.listen(port, (err) => {
      if (err) throw err;
      console.log(`> Ready on http://localhost:${port}`);
    });
  }
});
