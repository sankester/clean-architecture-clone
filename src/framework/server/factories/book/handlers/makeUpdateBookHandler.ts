import { UpdateBookController } from '@adapter/controller/book/UpdateBookController';
import { UpdateBookPresenter } from '@adapter/presentation/presenter/book/UpdateBookPresenter';
import { makeDbUpdateBook } from '@framework/server/factories/book/usecases';
import { Handler } from '../../protocol/Handler';
import { makeUpdateBookValidation } from '../validations/makeUpdateBookValidation';

export const makeUpdateBookHandler = (): Handler => {
  const presenter = new UpdateBookPresenter();
  const controller = new UpdateBookController(
    presenter,
    makeUpdateBookValidation(),
    makeDbUpdateBook()
  );
  return { controller, presenter };
};
