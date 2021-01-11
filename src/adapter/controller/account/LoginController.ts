import { LoginPresenter } from '@adapter/presentation/presenter/account/LoginPresenter';
import { Authentication } from '@entities/usecases/account/Authentication';
import { makeResponseFactory } from '../../presentation/helpers/makeResponseFactory';
import { Controller } from '../../protocol/Controller';
import { Presenter } from '../../protocol/Presenter';
import { Validation } from '../../protocol/Validation';

export class LoginController implements Controller {
  constructor(
    private readonly presenter: Presenter<LoginPresenter.Data>,
    private readonly validation: Validation,
    private readonly authentication: Authentication
  ) {}

  async handle(request: LoginController.Request): Promise<void> {
    const { serverError, badRequest } = makeResponseFactory();
    try {
      const error = await this.validation.validate(request);
      if (error) {
        this.presenter.setOutput(badRequest(error));
      } else {
        const authenticateModel = await this.authentication.auth(request);
        this.presenter.transform(authenticateModel);
      }
    } catch (error) {
      this.presenter.setOutput(serverError(error));
    }
  }
}

export namespace LoginController {
  export type Request = Authentication.Params;
}
