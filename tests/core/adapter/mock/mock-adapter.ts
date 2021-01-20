import { makeBodyBuilder } from '@adapter/presentation/helpers/makeBodyBuiler';
import { makeResponseFactory } from '@adapter/presentation/helpers/makeResponseFactory';
import { Response } from '@adapter/presentation/protocol/Response';
import { Controller } from '@adapter/protocol/Controller';
import { Middleware } from '@adapter/protocol/Middleware';
import { Presenter } from '@adapter/protocol/Presenter';
import faker from 'faker';

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

export class AuthMiddlewareSpy implements Middleware {
  httpRequest: any;
  response = makeResponseFactory().ok(
    makeBodyBuilder()
      .setData({
        id: faker.random.uuid(),
        exp: faker.random.number(),
      })
      .build()
  );
  async handle(httpRequest: any): Promise<Response> {
    this.httpRequest = httpRequest;
    return this.response;
  }
}
