import app from '@framework/server/setup/app';
import request from 'supertest';

describe('CORS Middleware', () => {
  test('Should enable CORS', async () => {
    app.get('/test_cors', (_req, res) => {
      res.send();
    });
    await request(app)
      .get('/test_cors')
      .expect('access-control-allow-origin', '*');
  });
});
