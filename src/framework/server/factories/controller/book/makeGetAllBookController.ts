import { GetAllBookController } from "@adapter/controller/";
import { Controller } from "@adapter/protocols/Controller";
import { makeDbGetAllBook } from '@framework/server/factories/db';

export const makeGetAllBookController = (): Controller => {
  const controller = new GetAllBookController(makeDbGetAllBook());
  return controller;
};
