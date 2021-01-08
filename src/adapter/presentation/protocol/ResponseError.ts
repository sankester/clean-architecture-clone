import { ResponseErrorType } from './ResponseErrorType';

export type ResponseError = {
  [key in ResponseErrorType]: {
    CODE: number;
    TYPE: ResponseErrorType;
    DEFAULT_MESSAGE: string;
  };
};
