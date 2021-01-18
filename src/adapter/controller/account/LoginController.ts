import { LoginPresenter } from '@adapter/presentation/presenters/account/LoginPresenter';
import { Authentication } from '@entities/usecases/account/Authentication';
import { makeResponseFactory } from '../../presentation/helpers/makeResponseFactory';
import { Controller } from '../../protocol/Controller';
import { Presenter } from '../../protocol/Presenter';
import EventDispatcher from '../../events/EventDispatcher';
import { EventListType } from '../../events/EventListType';

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
