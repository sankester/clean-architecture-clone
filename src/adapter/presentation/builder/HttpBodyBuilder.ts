import { HttpBody } from "../response/HttpBody";

export class HttpBodyBuilder {
  private success: HttpBody.HttpBodySuccess;

  private error: HttpBody.HttpBodyError;

  private data: any;

  constructor() {}

  setSuccess(message: string) {
    this.success = { message };
    return this;
  }

  setError(type: string, message: string) {
    this.error = { type, message };
    return this;
  }

  setData(value: any) {
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
