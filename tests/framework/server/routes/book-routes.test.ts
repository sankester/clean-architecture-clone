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
      const params = mockAddBookParams();
      const res = await request(app).post('/api/book').send(params).expect(201);
      const expectedRes = makeBodyBuilder()
        .setSuccess(AddBookPresenter.SuccessMessage)
        .build();
      expect(res.body).toMatchObject(expectedRes);
    });

    it('should response 400 on invalid params', async () => {
      const params = {
        title: faker.lorem.words(),
      };
      const res = await request(app).post('/api/book').send(params).expect(400);
      expect(res.body).toHaveProperty('error');
      expect(res.body.error.type).toBe(HTTP_RESPONSE_ERROR.BAD_REQUEST.TYPE);
      expect(res.body.error.message).toMatch(/(?=.*author)(?=.*issn)/);
    });
  });

  describe('PUT /api/book/:bookId', () => {
    it('should response 200 on success update', async () => {
      const docs = await mockBookDatabase();

      const params = mockUpdateBookParams();

      const res = await request(app)
        .put(`/api/book/${docs[0]._id}`)
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
      const docs = await mockBookDatabase();

      const params = {
        title: faker.lorem.words(),
      };

      const res = await request(app)
        .put(`/api/book/${docs[0]._id}`)
        .send(params)
        .expect(400);
      expect(res.body).toHaveProperty('error');
      expect(res.body.error.type).toBe(HTTP_RESPONSE_ERROR.BAD_REQUEST.TYPE);
      expect(res.body.error.message).toMatch(/(?=.*author)(?=.*issn)/);
    });
  });

  describe('DELETE /api/:bookId', () => {
    it('should response 200 on success', async () => {
      const docs = await mockBookDatabase();
      const res = await request(app)
        .delete(`/api/book/${docs[0]._id}`)
        .expect(200);
      expect(res.body).toHaveProperty('success');
      expect(res.body.success.message).toBe(DeleteBookPresenter.SuccesMessage);
    });

    it('should response 200 error on not found entity', async () => {
      const res = await request(app)
        .delete(`/api/book/${FakeObjectId.generate()}`)
        .expect(200);

      expect(res.body).toHaveProperty('error');
      expect(res.body.error.type).toBe('transaction_error');
      expect(res.body.error.message).toBe(DeleteBookPresenter.ErrorMessage);
    });

    it('should response 400 on invalid params', async () => {
      const res = await request(app)
        .delete(`/api/book/${faker.random.uuid()}`)
        .expect(400);

      expect(res.body).toHaveProperty('error');
      expect(res.body.error.type).toBe(HTTP_RESPONSE_ERROR.BAD_REQUEST.TYPE);
      expect(res.body.error.message).toMatch(/(?=.*bookId)/);
    });
  });
});
