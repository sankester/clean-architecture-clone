import { EmailInUseError } from '@adapter/presentation/errors/EmailInUseError';
import { SignUpPresenter } from '@adapter/presentation/presenter/account/SignUpPresenter';
import { AddAccount } from '@entities/usecases/account/AddAccount';
import { Authentication } from '@entities/usecases/account/Authentication';
import { makeResponseFactory } from '../../presentation/helpers/makeResponseFactory';
import { Controller } from '../../protocol/Controller';
import { Presenter } from '../../protocol/Presenter';
import { Validation } from '../../protocol/Validation';

export class SingupController implements Controller {
  constructor(
    private readonly presenter: Presenter<SignUpPresenter.Data>,
    private readonly validation: Validation,
    private readonly addAccount: AddAccount,
    private readonly authentication: Authentication
  ) {}

  async handle(request: SingupController.Request): Promise<void> {
    const { serverError, badRequest, forbidden } = makeResponseFactory();
    try {
      const error = await this.validation.validate(request);
      if (error) {
        this.presenter.setOutput(badRequest(error));
      } else {
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
      }
    } catch (error) {
      this.presenter.setOutput(serverError(error));
    }
  }
}

export namespace SingupController {
  export type Request = AddAccount.Params;
}
