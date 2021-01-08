import { HttpResponseFactory } from '../factories/HttpResponseFactory';

export const makeResponseFactory = () => {
  return new HttpResponseFactory();
};
