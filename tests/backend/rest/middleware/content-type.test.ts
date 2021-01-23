import { createExpressApp } from '@backend/infrastructure/express/createServer';
import { createRestApp } from '@backend/rest';
import request from 'supertest';

describe('Content Type Middleware', () => {
  const app = createRestApp(createExpressApp());

  test('Should return default content type as json', async () => {
    app.get('/test_content_type', (_req, res) => {
      res.send('');
    });
    await request(app).get('/test_content_type').expect('content-type', /json/);
  });

  test('Should return xml content type when forced', async () => {
    app.get('/test_content_type_xml', (_req, res) => {
      res.type('xml');
      res.send('');
    });
    await request(app)
      .get('/test_content_type_xml')
      .expect('content-type', /xml/);
  });
});
