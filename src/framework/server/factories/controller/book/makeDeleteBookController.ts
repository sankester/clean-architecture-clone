import { Controller } from '@adapter/protocols/Controller';
import { DeleteBookController } from '@adapter/controller';
import { makeDbDeleteBook } from '@framework/server/factories/db';

export const makeDeleteBookController = (): Controller => {
  const controller = new DeleteBookController(makeDbDeleteBook());
  return controller;
};
