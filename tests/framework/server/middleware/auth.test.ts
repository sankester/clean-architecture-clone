import app from '@framework/server/setup/app';
import request from 'supertest';
import { auth } from '@framework/server/middleware/auth';

describe('Auth Middleware', () => {
  test('Should return 403 if unauthenticated', async () => {
    app.post('/test-auth', auth, (req, res) => {
      res.send(req.body);
    });
    await request(app).post('/test-auth').expect(403);
  });
});
