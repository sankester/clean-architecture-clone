import { ResponseError } from '../protocol/ResponseError';
import { ResponseErrorType } from '../protocol/ResponseErrorType';

export const HTTP_RESPONSE_ERROR: ResponseError = {
  BAD_REQUEST: {
    CODE: 400,
    TYPE: ResponseErrorType.BAD_REQUEST,
    DEFAULT_MESSAGE: 'Bad Request',
  },
  UNAUTORIZED: {
    CODE: 401,
    TYPE: ResponseErrorType.UNAUTORIZED,
    DEFAULT_MESSAGE: 'Unautorized',
  },
  FORBIDDEN: {
    CODE: 403,
    TYPE: ResponseErrorType.FORBIDDEN,
    DEFAULT_MESSAGE: 'Forbidden',
  },
  NOT_FOUND: {
    CODE: 404,
    TYPE: ResponseErrorType.NOT_FOUND,
    DEFAULT_MESSAGE: 'Not Found',
  },
  CONFLICT: {
    CODE: 409,
    TYPE: ResponseErrorType.CONFLICT,
    DEFAULT_MESSAGE: 'Conflic',
  },
  PRECONDITION_FAILED: {
    CODE: 412,
    TYPE: ResponseErrorType.PRECONDITION_FAILED,
    DEFAULT_MESSAGE: 'Precondition',
  },
  UNPROCESS_ENTITIY: {
    CODE: 422,
    TYPE: ResponseErrorType.UNPROCESS_ENTITIY,
    DEFAULT_MESSAGE: 'Unprecess Entity',
  },
  SERVER_ERROR: {
    CODE: 500,
    TYPE: ResponseErrorType.SERVER_ERROR,
    DEFAULT_MESSAGE: 'Internal Server Error',
  },
};
