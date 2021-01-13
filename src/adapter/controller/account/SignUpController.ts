import { EmailInUseError } from '@adapter/presentation/errors/EmailInUseError';
import { SignUpPresenter } from '@adapter/presentation/presenters/account/SignUpPresenter';
import { AddAccount } from '@entities/usecases/account/AddAccount';
import { Authentication } from '@entities/usecases/account/Authentication';
import { makeResponseFactory } from '../../presentation/helpers/makeResponseFactory';
import { Controller } from '../../protocol/Controller';
import { Presenter } from '../../protocol/Presenter';

export class SingupController implements Controller {
  constructor(
    private readonly presenter: Presenter<SignUpPresenter.Data>,
    private readonly addAccount: AddAccount,
    private readonly authentication: Authentication
  ) {}

  async handle(request: SingupController.Request): Promise<void> {
    const { serverError, forbidden } = makeResponseFactory();
    try {
      const created = await this.addAccount.add(request);
      if (!created) {
        this.presenter.setOutput(forbidden(new EmailInUseError()));
      } else {
        const authenticationModel = await this.authentication.auth({
          email: request.email,
          password: request.password,
        });
        this.presenter.transform(authenticationModel);
      }
    } catch (error) {
      this.presenter.setOutput(serverError(error));
    }
  }
}

export namespace SingupController {
  export type Request = AddAccount.Params;
}
