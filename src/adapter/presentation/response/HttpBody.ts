export namespace HttpBody {
  export type HttpBodySuccess = {
    message: string;
  };

  export type HttpBodyError = {
    type: string;
    message: string;
  };
}

export class HttpBody {
  public success?: HttpBody.HttpBodySuccess;

  public error?: HttpBody.HttpBodyError;

  public data?: any;

  constructor(params: {
    success?: HttpBody.HttpBodySuccess;
    error?: HttpBody.HttpBodyError;
    data?: any;
  }) {
    if (params.success) {
      this.success = params.success;
    }

    if (params.error) {
      this.error = params.error;
    }

    if (params.data) {
      this.data = params.data;
    }
  }
}
