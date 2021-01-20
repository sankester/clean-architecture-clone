import { Response } from '../presentation/protocol/Response';

export abstract class Presenter<T = any> {
  private response: Response;

  public setOutput(response: Response) {
    this.response = response;
  }

  public getResponse(): Response {
    return this.response;
  }

  abstract transform(data: T): void;
}
