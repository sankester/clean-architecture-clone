import { HTTP_RESPONSE_ERROR } from '../constant/HttpResponseError';
export class UnauthorizedError extends Error {
  constructor() {
    super(HTTP_RESPONSE_ERROR.UNAUTORIZED.DEFAULT_MESSAGE);
    this.name = 'UnauthorizedError';
  }
}
