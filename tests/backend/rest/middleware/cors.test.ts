import { createExpressApp } from '@backend/infrastructure/express/createServer';
import { createRestApp } from '@backend/rest';
import request from 'supertest';

describe('CORS Middleware', () => {
  const app = createRestApp(createExpressApp());

  test('Should enable CORS', async () => {
    app.get('/test_cors', (_req, res) => {
      res.send();
    });
    await request(app)
      .get('/test_cors')
      .expect('access-control-allow-origin', '*');
  });
});
