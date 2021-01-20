import { createRestApp } from '@backend/rest';
import { noCache } from '@backend/rest/middleware/no-chace';
import request from 'supertest';

describe('NoCache Middleware', () => {
  const app = createRestApp();
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
