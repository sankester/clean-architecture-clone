import { GetAllBookController } from '@adapter/controller/book';
import { makeDbGetAllBook } from '@backend/infrastructure/common/factories/usecases/book/makeDbGetAllBook';
import { Handler } from '../../protocol/Handler';
import { GetAllBookPresenter } from '@adapter/presentation/presenters/book/GetAllBookPresenter';

export const makeGetAllBookHandler = (): Handler => {
  const presenter = new GetAllBookPresenter();
  const controller = new GetAllBookController(presenter, makeDbGetAllBook());
  return { controller, presenter };
};
