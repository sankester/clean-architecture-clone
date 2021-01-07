import { Controller } from '@adapter/contracts/Controller';
import { DeleteBookController } from '@adapter/controller';
import { makeDbDeleteBook } from '@framework/server/factories/book/db';
import { makeDeleteBookValidation } from '../validations/makeDeleteBookValidation';

export const makeDeleteBookController = (): Controller => {
  const controller = new DeleteBookController(
    makeDeleteBookValidation(),
    makeDbDeleteBook()
  );
  return controller;
};
