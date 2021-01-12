import { HTTP_RESPONSE_ERROR } from '@adapter/presentation/constant/HttpResponseError';
import { makeBodyBuilder } from '@adapter/presentation/helpers/makeBodyBuiler';
import { AddBookPresenter } from '@adapter/presentation/presenters/book/AddBookPresenter';
import { DeleteBookPresenter } from '@adapter/presentation/presenters/book/DeleteBookPresenter';
import { UpdateBookPresenter } from '@adapter/presentation/presenters/book/UpdateBookPresenter';
import MongoConnection from '@framework/db/mongodb/connection/index';
import BookModel from '@framework/db/mongodb/models/BookModel';
import app from '@framework/server/setup/app';
import { mockAddBookParams } from '@tests/entities/mock';
import FakeObjectId from 'bson-objectid';
import faker from 'faker';
import request from 'supertest';
import { mockUpdateBookParams } from '../../../entities/mock/mock-book';
import { mockAccessToken } from './mock/mock-token';

const mockBookDatabase = async () => {
  const docs = await BookModel.create([
    mockAddBookParams(),
    mockAddBookParams(),
  ]);
  return docs;
};

describe('Book Route Test', () => {
  beforeAll(async () => {
    await MongoConnection.open();
  });

  afterAll(async () => {
    await MongoConnection.close();
  });

  beforeEach(async () => {
    await BookModel.deleteMany({});
  });

  describe('GET /api/book', () => {
    test('Should response 200 when get all data', async () => {
      try {
        const docs = await mockBookDatabase();
        const res = await request(app).get('/api/book').expect(200);

        expect(res.body).toHaveProperty('data');
        expect(res.body.data.length).toBeGreaterThan(0);
        expect(res.body.data[0].title).toEqual(docs[0].title);
        expect(res.body.data[0].author).toEqual(docs[0].author);
        expect(res.body.data[0].issn).toEqual(docs[0].issn);
      } catch (error) {
        throw error;
      }
    });

    test('Should response 204 when get all data', async () => {
      await request(app).get('/api/book').expect(204);
    });
  });

  describe('POST /api/book', () => {
    it('should response 201 on success', async () => {
      const accessToken = await mockAccessToken();
      const params = mockAddBookParams();
      const res = await request(app)
        .post('/api/book')
        .set('access-token', accessToken)
        .send(params)
        .expect(201);
      const expectedRes = makeBodyBuilder()
        .setSuccess(AddBookPresenter.SuccessMessage)
        .build();
      expect(res.body).toMatchObject(expectedRes);
    });

    it('should response 400 on invalid params', async () => {
      const accessToken = await mockAccessToken();
      const params = {
        title: faker.lorem.words(),
      };
      const res = await request(app)
        .post('/api/book')
        .set('access-token', accessToken)
        .send(params)
        .expect(400);
      expect(res.body).toHaveProperty('error');
      expect(res.body.error.type).toBe(HTTP_RESPONSE_ERROR.BAD_REQUEST.TYPE);
      expect(res.body.error.message).toMatch(/(?=.*author)(?=.*issn)/);
    });

    it('should response 403 on invalid token', async () => {
      const params = {
        title: faker.lorem.words(),
      };
      await request(app).post('/api/book').send(params).expect(403);
    });
  });

  describe('PUT /api/book/:bookId', () => {
    it('should response 200 on success update', async () => {
      const accessToken = await mockAccessToken();
      const docs = await mockBookDatabase();

      const params = mockUpdateBookParams();

      const res = await request(app)
        .put(`/api/book/${docs[0]._id}`)
        .set('access-token', accessToken)
        .send(params)
        .expect(200);

      expect(res.body.success.message).toBe(UpdateBookPresenter.SuccessMessage);

      expect(res.body.data).toMatchObject({
        id: docs[0]._id.toString(),
        title: params.title,
        author: params.author,
        issn: params.issn,
      });
    });

    it('should response 400 on invalid params', async () => {
      const accessToken = await mockAccessToken();
      const docs = await mockBookDatabase();

      const params = {
        title: faker.lorem.words(),
      };

      const res = await request(app)
        .put(`/api/book/${docs[0]._id}`)
        .set('access-token', accessToken)
        .send(params)
        .expect(400);
      expect(res.body).toHaveProperty('error');
      expect(res.body.error.type).toBe(HTTP_RESPONSE_ERROR.BAD_REQUEST.TYPE);
      expect(res.body.error.message).toMatch(/(?=.*author)(?=.*issn)/);
    });

    it('should response 403 on invalid token', async () => {
      const params = {
        title: faker.lorem.words(),
      };
      await request(app)
        .put(`/api/book/${faker.random.uuid()}`)
        .send(params)
        .expect(403);
    });
  });

  describe('DELETE /api/:bookId', () => {
    it('should response 200 on success', async () => {
      const accessToken = await mockAccessToken();
      const docs = await mockBookDatabase();
      const res = await request(app)
        .delete(`/api/book/${docs[0]._id}`)
        .set('access-token', accessToken)
        .expect(200);
      expect(res.body).toHaveProperty('success');
      expect(res.body.success.message).toBe(DeleteBookPresenter.SuccesMessage);
    });

    it('should response 200 error on not found entity', async () => {
      const accessToken = await mockAccessToken();
      const res = await request(app)
        .delete(`/api/book/${FakeObjectId.generate()}`)
        .set('access-token', accessToken)
        .expect(200);

      expect(res.body).toHaveProperty('error');
      expect(res.body.error.type).toBe('transaction_error');
      expect(res.body.error.message).toBe(DeleteBookPresenter.ErrorMessage);
    });

    it('should response 400 on invalid params', async () => {
      const accessToken = await mockAccessToken();
      const res = await request(app)
        .delete(`/api/book/${faker.random.uuid()}`)
        .set('access-token', accessToken)
        .expect(400);

      expect(res.body).toHaveProperty('error');
      expect(res.body.error.type).toBe(HTTP_RESPONSE_ERROR.BAD_REQUEST.TYPE);
      expect(res.body.error.message).toMatch(/(?=.*bookId)/);
    });

    it('should response 403 on invalid token', async () => {
      await request(app).delete(`/api/book/${faker.random.uuid()}`).expect(403);
    });
  });
});
