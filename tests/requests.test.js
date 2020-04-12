const request = require('supertest');
const app = require('../app');

process.env.STATIC_PATH = 'frontend/react/build';

describe('Test the root path', () => {
  test('It should response the GET method', async () => {
    const response = await request(app).get('/');
    expect(response.statusCode).toBe(200);
  });
});
