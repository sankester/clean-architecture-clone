import { DeleteBookController } from '@adapter/controller';
import { Controller } from '@adapter/protocol/Controller';
import { makeDbDeleteBook } from '@framework/server/factories/book/db';
import { makeDeleteBookValidation } from '../validations/makeDeleteBookValidation';

export const makeDeleteBookController = (): Controller => {
  const controller = new DeleteBookController(
    makeDeleteBookValidation(),
    makeDbDeleteBook()
  );
  return controller;
};
