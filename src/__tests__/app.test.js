const request = require('supertest');
const app = require('../app');

describe('Test the root path', () => {
  test('It should redirect to the frontend entry point', () => {
    return request(app).get('/').send().expect(302).expect('Location', '/spt');
  });
});
