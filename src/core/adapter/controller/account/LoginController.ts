import EventDispatcher from '@adapter/events/EventDispatcher';
import { EventListType } from '@adapter/events/EventListType';
import { makeResponseFactory } from '@adapter/presentation/helpers/makeResponseFactory';
import { LoginPresenter } from '@adapter/presentation/presenters/account/LoginPresenter';
import { Controller } from '@adapter/protocol/Controller';
import { Presenter } from '@adapter/protocol/Presenter';
import { Authentication } from '@entities/usecases/account/Authentication';

export class LoginController implements Controller {
  constructor(
    private readonly presenter: Presenter<LoginPresenter.Data>,
    private readonly authentication: Authentication
  ) {}

  async handle(request: LoginController.Request): Promise<void> {
    const { serverError } = makeResponseFactory();
    try {
      const authenticateModel = await this.authentication.auth(request);
      this.presenter.transform(authenticateModel);
    } catch (error) {
      EventDispatcher.publish(EventListType.SERVER_ERROR, this, error);
      this.presenter.setOutput(serverError(error));
    }
  }
}

export namespace LoginController {
  export type Request = Authentication.Params;
}
