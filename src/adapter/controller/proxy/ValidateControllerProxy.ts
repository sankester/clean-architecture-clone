import { makeResponseFactory } from '../../presentation/helpers/makeResponseFactory';
import { Controller } from '../../protocol/Controller';
import { Presenter } from '../../protocol/Presenter';
import { Validation } from '../../protocol/Validation';

export class ValidateControllerProxy implements Controller {
  constructor(
    private validation: Validation,
    private controller: Controller,
    private presenter: Presenter
  ) {}

  async handle(request: any): Promise<void> {
    const { serverError, badRequest } = makeResponseFactory();
    try {
      const error = await this.validation.validate(request);
      if (error) {
        this.presenter.setOutput(badRequest(error));
      } else {
        await this.controller.handle(request);
      }
    } catch (error) {
      this.presenter.setOutput(serverError(error));
    }
  }
}
