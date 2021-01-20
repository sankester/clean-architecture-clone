import { createRestApp } from '@backend/rest';
import request from 'supertest';

describe('Body Parser Middleware', () => {
  const app = createRestApp();

  test('Should parse body as json', async () => {
    app.post('/test_body_parser', (req, res) => {
      res.send(req.body);
    });
    await request(app)
      .post('/test_body_parser')
      .send({ name: 'vani' })
      .expect({ name: 'vani' });
  });
});
