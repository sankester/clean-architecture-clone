import request from 'supertest';
import app from '@framework/server/setup/app';
import { mockAddAccountParams } from '../../../entities/mock/mock-account';

export const mockAccessToken = async (): Promise<string> => {
  const response = await request(app)
    .post('/api/signup')
    .send(mockAddAccountParams())
    .expect(200);

  return response.body.data.accessToken;
};
