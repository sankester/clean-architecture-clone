import { GetAllBookController } from '@adapter/controller/';
import { Controller } from '@adapter/protocol/Controller';
import { makeDbGetAllBook } from '@framework/server/factories/book/db';

export const makeGetAllBookController = (): Controller => {
  const controller = new GetAllBookController(makeDbGetAllBook());
  return controller;
};
