import request from 'supertest';
import app from '@backend/rest/setup/app';
import { mockAddAccountParams } from '../../../core/entities/mock/mock-account';

export const mockAccessToken = async (): Promise<string> => {
  const response = await request(app)
    .post('/api/signup')
    .send(mockAddAccountParams())
    .expect(200);

  return response.body.data.accessToken;
};
