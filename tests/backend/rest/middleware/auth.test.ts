import RedisCacheDriver from '@backend/infrastructure/db/redis/index';
import { createRestApp } from '@backend/rest';
import { auth } from '@backend/rest/middleware/auth';
import faker from 'faker';
import request from 'supertest';
import { createExpressApp } from '@backend/infrastructure/express/createServer';

beforeAll(async () => {
  await RedisCacheDriver.open();
});

afterAll(async () => {
  await RedisCacheDriver.close();
});

describe('Auth Middleware', () => {
  const app = createRestApp(createExpressApp());
  test('Should return 403 if unauthenticated', async () => {
    app.post('/test-auth', auth, (req, res) => {
      res.send(req.body);
    });
    await request(app).post('/test-auth').expect(403);
  });

  test('Should return 403 if invalid token', async () => {
    app.post('/test-auth-invalid-token', auth, (req, res) => {
      res.send(req.body);
    });
    await request(app)
      .post('/test-auth-invalid-token')
      .set('access-token', faker.random.uuid())
      .expect(403);
  });
});
