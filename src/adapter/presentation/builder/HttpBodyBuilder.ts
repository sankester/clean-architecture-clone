import { ResponseBody } from '../protocol/ResponseBody';
import { ResponseBodyBuilder } from '../protocol/ResponseBodyBuilder';
import { ResponseBodyError } from '../protocol/ResponseBodyError';
import { ResponseBodySuccess } from '../protocol/ResponseBodySuccess';

export class HttpBodyBuilder implements ResponseBodyBuilder {
  private success: ResponseBodySuccess;

  private error: ResponseBodyError;

  private data: any;

  setSuccess(message: string): HttpBodyBuilder {
    this.success = { message };
    return this;
  }

  setError(type: string, message: string): HttpBodyBuilder {
    this.error = { type, message };
    return this;
  }

  setData(value: any): HttpBodyBuilder {
    this.data = value;
    return this;
  }

  build(): ResponseBody {
    const body = {};
    if (this.success) {
      body['success'] = this.success;
    }
    if (this.error) {
      body['error'] = this.error;
    }
    if (this.data) {
      body['data'] = this.data;
    }
    return body;
  }
}
