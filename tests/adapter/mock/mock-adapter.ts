import { Controller } from '@adapter/protocol/Controller';
import { Presenter } from '@adapter/protocol/Presenter';

export class ControllerSpy implements Controller {
  request: any;
  async handle(request: any): Promise<void> {
    this.request = request;
  }
}

export class PresenterSpy extends Presenter {
  data: any;
  transform(data: any): void {
    this.data = data;
  }
}
