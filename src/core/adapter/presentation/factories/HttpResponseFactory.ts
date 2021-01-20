import { HTTP_RESPONSE_ERROR } from '../constant/HttpResponseError';
import { HTTP_RESPONSE_SUCCESS } from '../constant/HttpResponseSuccess';
import { Response } from '../protocol/Response';
import { ResponseBody } from '../protocol/ResponseBody';
import { ResponseFactory } from '../protocol/ResponseFactory';
import { ServerError } from '../errors/ServerError';
import { UnauthorizedError } from '../errors/UnauthorizedError';

export class HttpResponseFactory implements ResponseFactory {
  badRequest(error: Error): Response {
    return {
      code: HTTP_RESPONSE_ERROR.BAD_REQUEST.CODE,
      body: error,
      type: HTTP_RESPONSE_ERROR.BAD_REQUEST.TYPE,
    };
  }

  unauthorized(error: Error | null = null): Response {
    return {
      code: HTTP_RESPONSE_ERROR.UNAUTORIZED.CODE,
      body: error ? error : new UnauthorizedError(),
      type: HTTP_RESPONSE_ERROR.UNAUTORIZED.TYPE,
    };
  }

  forbidden(error: Error): Response {
    return {
      code: HTTP_RESPONSE_ERROR.FORBIDDEN.CODE,
      body: error,
      type: HTTP_RESPONSE_ERROR.FORBIDDEN.TYPE,
    };
  }

  notFound(error: Error): Response {
    return {
      code: HTTP_RESPONSE_ERROR.NOT_FOUND.CODE,
      body: error,
      type: HTTP_RESPONSE_ERROR.NOT_FOUND.TYPE,
    };
  }

  conflict(error: Error): Response {
    return {
      code: HTTP_RESPONSE_ERROR.CONFLICT.CODE,
      body: error,
      type: HTTP_RESPONSE_ERROR.CONFLICT.TYPE,
    };
  }

  preconditionFailed(error: Error): Response {
    return {
      code: HTTP_RESPONSE_ERROR.PRECONDITION_FAILED.CODE,
      body: error,
      type: HTTP_RESPONSE_ERROR.PRECONDITION_FAILED.TYPE,
    };
  }

  unprocessEntity(error: Error): Response {
    return {
      code: HTTP_RESPONSE_ERROR.UNPROCESS_ENTITIY.CODE,
      body: error,
      type: HTTP_RESPONSE_ERROR.UNPROCESS_ENTITIY.TYPE,
    };
  }

  serverError(error: Error): Response {
    return {
      code: HTTP_RESPONSE_ERROR.SERVER_ERROR.CODE,
      body: new ServerError(
        error.stack
          ? error.stack
          : HTTP_RESPONSE_ERROR.SERVER_ERROR.DEFAULT_MESSAGE
      ),
      type: HTTP_RESPONSE_ERROR.SERVER_ERROR.TYPE,
    };
  }

  ok(data: ResponseBody): Response {
    return { code: HTTP_RESPONSE_SUCCESS.OK.CODE, body: data };
  }

  created(data: ResponseBody): Response {
    return { code: HTTP_RESPONSE_SUCCESS.CREATED.CODE, body: data };
  }

  noContent(): Response {
    return { code: HTTP_RESPONSE_SUCCESS.NO_CONTENT.CODE, body: null };
  }
}
