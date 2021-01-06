/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpBody } from '../response/HttpBody';

export class HttpBodyBuilder {
  private success: HttpBody.HttpBodySuccess;

  private error: HttpBody.HttpBodyError;

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

  build(): HttpBody {
    let body = {};
    if (this.success) {
      body = {
        success: this.success,
      };
    }
    if (this.error) {
      body = {
        error: this.error,
      };
    }
    if (this.data) {
      body = {
        data: this.data,
      };
    }
    return new HttpBody(body);
  }
}
