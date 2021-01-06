import { Controller } from '@adapter/protocols/Controller';
import { UpdateBookController } from '@adapter/controller/book/UpdateBookController';
import { makeDbUpdateBook } from '@framework/server/factories/db/book';

export const makeUpdateBookController = (): Controller => {
  const controller = new UpdateBookController(makeDbUpdateBook());
  return controller;
};
