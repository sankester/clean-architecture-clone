import { HttpResponse } from '@adapter/presentation/response/HttpResponse';
import { ResponseFactory } from '@adapter/presentation/contracts/ResponseFactory';

export interface Middleware<T = any> {
  handle: (httpRequest: T, helper: ResponseFactory) => Promise<HttpResponse>;
}
