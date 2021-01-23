import { createExpressApp } from '@backend/infrastructure/express/createServer';
import { createRestApp } from '@backend/rest';
import request from 'supertest';
import { mockAddAccountParams } from '../../../core/entities/mock/mock-account';

export const mockAccessToken = async (): Promise<string> => {
  const response = await request(createRestApp(createExpressApp()))
    .post('/api/signup')
    .send(mockAddAccountParams())
    .expect(200);

  return response.body.data.accessToken;
};
