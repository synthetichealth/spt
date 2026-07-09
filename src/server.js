const http = require('http');

const app = require('./App');

function createServer() {
  return http.createServer(app);
}

function startServer({ port = process.env.PORT || '3000', host } = {}) {
  return new Promise((resolve, reject) => {
    const server = createServer();
    const listenArgs = host ? [port, host] : [port];

    server.once('error', reject);
    server.listen(...listenArgs, () => {
      server.off('error', reject);

      const address = server.address();
      const actualPort = typeof address === 'string' ? address : address.port;
      const urlHost = host || 'localhost';

      resolve({
        server,
        port: actualPort,
        url: typeof actualPort === 'string' ? actualPort : `http://${urlHost}:${actualPort}`,
      });
    });
  });
}

module.exports = { app, createServer, startServer };
