import { ResponseErrorType } from './ResponseErrorType';
import { ResponseBody } from './ResponseBody';

export type Response = {
  code: number;
  body: ResponseBody | Error | null;
  type?: ResponseErrorType;
};
