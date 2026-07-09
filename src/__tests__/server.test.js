const http = require('http');
const { startServer } = require('../server');

function get(url) {
  return new Promise((resolve, reject) => {
    const req = http.get(url, resolve);
    req.on('error', reject);
  });
}

describe('Server startup', () => {
  test('It should start the app on an ephemeral local port', async () => {
    const { server, url, port } = await startServer({ port: 0, host: '127.0.0.1' });

    try {
      expect(port).toEqual(expect.any(Number));
      expect(url).toBe(`http://127.0.0.1:${port}`);

      const response = await get(`${url}/`);
      expect(response.statusCode).toBe(302);
      expect(response.headers.location).toBe('/spt');
    } finally {
      server.close();
    }
  });
});
