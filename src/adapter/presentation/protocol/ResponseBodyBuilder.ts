import { ResponseBody } from './ResponseBody';

export interface ResponseBodyBuilder {
  setSuccess(message: string): ResponseBodyBuilder;
  setError(type: string, message: string): ResponseBodyBuilder;
  setData(value: any): ResponseBodyBuilder;
  build(): ResponseBody;
}
