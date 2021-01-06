import { HttpResponse } from '@adapter/presentation/response/HttpResponse';
import { HttpResponseFactory } from '../contracts/HttpResponseFactory';
import { UnauthorizedError } from '../errors/UnauthorizedError';
import { ServerError } from '../errors/ServerError';
import { HttpBody } from '../response/HttpBody';

export class HttpMakeResponse implements HttpResponseFactory {
  badRequest(error: Error): HttpResponse {
    return new HttpResponse(400, error, 'bad_request');
  }

  unauthorized(error: Error | null = null): HttpResponse {
    return new HttpResponse(
      401,
      error ? error : new UnauthorizedError(),
      'unauthorized'
    );
  }

  forbidden(error: Error): HttpResponse {
    return new HttpResponse(403, error, 'forbidden_access');
  }

  notFound(error: Error): HttpResponse {
    return new HttpResponse(404, error, 'not_found');
  }

  conflict(error: Error): HttpResponse {
    return new HttpResponse(409, error, 'conflict');
  }

  preconditionFailed(error: Error): HttpResponse {
    return new HttpResponse(412, error, 'precondition_failed');
  }

  unprocessEntity(error: Error): HttpResponse {
    return new HttpResponse(422, error, 'unprocess_entity');
  }

  serverError(error: Error): HttpResponse {
    return new HttpResponse(
      500,
      new ServerError(error.stack ? error.stack : 'Internal Server Error'),
      'internal_server_error'
    );
  }

  ok(data: HttpBody): HttpResponse {
    return new HttpResponse(200, data);
  }

  created(data: HttpBody): HttpResponse {
    return new HttpResponse(201, data);
  }

  noContent(): HttpResponse {
    return new HttpResponse(204, null);
  }
}
