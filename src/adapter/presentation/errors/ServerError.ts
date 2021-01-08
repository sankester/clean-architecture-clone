import { HTTP_RESPONSE_ERROR } from '../constant/HttpResponseError';

export class ServerError extends Error {
  constructor(stack: string) {
    super(HTTP_RESPONSE_ERROR.SERVER_ERROR.DEFAULT_MESSAGE);
    this.name = 'ServerError';
    this.stack = stack;
  }
}
