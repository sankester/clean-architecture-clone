import { HttpResponse } from "@adapter/presentation/response/HttpResponse";
import { HttpBody } from '../response/HttpBody';

export interface HttpResponseFactory {
  badRequest(error: Error): HttpResponse;
  unauthorized(error: Error): HttpResponse;
  forbidden(error: Error): HttpResponse;
  notFound(error: Error): HttpResponse;
  conflict(error: Error): HttpResponse;
  preconditionFailed(error: Error): HttpResponse;
  unprocessEntity(error: Error): HttpResponse;
  serverError(error: Error): HttpResponse;
  ok(data: HttpBody): HttpResponse;
  created(data: HttpBody): HttpResponse;
  noContent(): HttpResponse;
}
