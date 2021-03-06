import EventDispatcher from '@adapter/events/EventDispatcher';
import { EventListType } from '@adapter/events/EventListType';
import { makeResponseFactory } from '@adapter/presentation/helpers/makeResponseFactory';
import { Controller } from '@adapter/protocol/Controller';
import { Presenter } from '@adapter/protocol/Presenter';
import { Validation } from '@adapter/protocol/Validation';

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
      EventDispatcher.publish(EventListType.SERVER_ERROR, this, error);
      this.presenter.setOutput(serverError(error));
    }
  }
}
