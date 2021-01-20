import { HTTP_RESPONSE_ERROR } from '@adapter/presentation/constant/HttpResponseError';
import MongoConnection from '@backend/infrastructure/db/mongodb/connection/index';
import AccountModel from '@backend/infrastructure/db/mongodb/models/AccountModel';
import RedisCacheDriver from '@backend/infrastructure/db/redis/index';
import app from '@backend/rest/setup/app';
import { hash } from 'bcrypt';
import faker from 'faker';
import request from 'supertest';
import { mockAddAccountParams } from '../../../core/entities/mock/mock-account';

const mockAccountDatabase = async () => {
  const docs = await AccountModel.create([
    mockAddAccountParams(),
    mockAddAccountParams(),
  ]);
  return docs;
};

describe('Account Route Test', () => {
  beforeAll(async () => {
    await RedisCacheDriver.open();
    await MongoConnection.open();
  });

  afterAll(async () => {
    await RedisCacheDriver.close();
    await MongoConnection.close();
  });

  beforeEach(async () => {
    await AccountModel.deleteMany({});
  });

  describe('GET /api/signup', () => {
    test('should response 200 with access token data', async () => {
      const response = await request(app)
        .post('/api/signup')
        .send(mockAddAccountParams())
        .expect(200);
      expect(response.body).toHaveProperty('data');
      expect(response.body.data).toHaveProperty('accessToken');
      expect(response.body.data).toHaveProperty('expiredAt');
    });

    test('should response 400 on invalid params', async () => {
      const params = {
        email: faker.internet.email(),
      };
      const res = await request(app)
        .post('/api/signup')
        .send(params)
        .expect(400);
      expect(res.body).toHaveProperty('error');
      expect(res.body.error.type).toBe(HTTP_RESPONSE_ERROR.BAD_REQUEST.TYPE);
      expect(res.body.error.message).toMatch(/password/);
    });

    test('should response 403 of forbidden error', async () => {
      const docs = await mockAccountDatabase();

      const res = await request(app)
        .post('/api/signup')
        .send({
          email: docs[0].email,
          password: faker.internet.password(),
          name: faker.name.firstName(),
        })
        .expect(403);

      expect(res.body).toHaveProperty('error');
      expect(res.body.error.type).toBe(HTTP_RESPONSE_ERROR.FORBIDDEN.TYPE);
    });
  });

  describe('GET /api/login', () => {
    test('Should return 200 on login', async () => {
      const password = await hash('secret', 12);
      await AccountModel.create({
        name: 'vani',
        email: 'sankester@gmail.com',
        password,
      });
      await request(app)
        .post('/api/login')
        .send({
          email: 'sankester@gmail.com',
          password: 'secret',
        })
        .expect(200);
    });

    test('Should return 401 on login', async () => {
      await request(app)
        .post('/api/login')
        .send({
          email: 'sankester@gmail.com',
          password: '123',
        })
        .expect(401);
    });
  });
});
