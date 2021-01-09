import { noCache } from '@framework/server/middleware/no-chace';
import app from '@framework/server/setup/app';
import request from 'supertest';

describe('NoCache Middleware', () => {
  test('Should disable cache', async () => {
    app.get('/test_no_cache', noCache, (_req, res) => {
      res.send();
    });
    await request(app)
      .get('/test_no_cache')
      .expect(
        'cache-control',
        'no-store, no-cache, must-revalidate, proxy-revalidate'
      )
      .expect('pragma', 'no-cache')
      .expect('expires', '0')
      .expect('surrogate-control', 'no-store');
  });
});
