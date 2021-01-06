import { HttpResponse } from '@adapter/presentation/response/HttpResponse'
import { ResponseFactory } from '@adapter/presentation/contracts/ResponseFactory';

export interface Controller<T = any> {
  handle(request: T, helper: ResponseFactory): Promise<HttpResponse>
}
