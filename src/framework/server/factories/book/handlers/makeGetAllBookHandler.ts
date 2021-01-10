import { GetAllBookController } from '@adapter/controller/';
import { makeDbGetAllBook } from '@framework/server/factories/book/usecases';
import { Handler } from '../../protocol/Handler';
import { GetAllBookPresenter } from '@adapter/presentation/presenter/book/GetAllBookPresenter';

export const makeGetAllBookHandler = (): Handler => {
  const presenter = new GetAllBookPresenter();
  const controller = new GetAllBookController(presenter, makeDbGetAllBook());
  return { controller, presenter };
};
