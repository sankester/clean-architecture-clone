import { ResponseBodySuccess } from './ResponseBodySuccess';
import { ResponseBodyError } from './ResponseBodyError';

export type ResponseBody = {
  success?: ResponseBodySuccess;

  error?: ResponseBodyError;

  data?: any;
};
