import request from 'supertest';
import app from '@framework/server/setup/app';

describe('Content Type Middleware', () => {
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
