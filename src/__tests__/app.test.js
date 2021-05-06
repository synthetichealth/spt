const request = require('supertest');
const app = require('../app');

describe('Test the root path', () => {
  test('It should response the GET method', () => {
    process.env.ADMIN_TOKEN = 'admin';
    return request(app)
      .get('/index')
      .set('Authorization', 'Bearer admin')
      .send()
      .expect(200, 'Howdy from test service!');
  });
});
