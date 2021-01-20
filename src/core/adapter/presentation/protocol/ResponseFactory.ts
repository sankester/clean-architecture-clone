import { Response } from './Response';
import { ResponseBody } from './ResponseBody';

export interface ResponseFactory {
  badRequest(error: Error): Response;
  unauthorized(error?: Error | null): Response;
  forbidden(error: Error): Response;
  notFound(error: Error): Response;
  conflict(error: Error): Response;
  preconditionFailed(error: Error): Response;
  unprocessEntity(error: Error): Response;
  serverError(error: Error): Response;
  ok(data: ResponseBody): Response;
  created(data: ResponseBody): Response;
  noContent(): Response;
}
