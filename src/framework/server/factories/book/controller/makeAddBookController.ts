import { Controller } from '@adapter/contracts/Controller';
import { AddBookController } from '@adapter/controller';
import { makeAddBookValidation } from '../validations/makeAddBookValidation';
import { makeDbAddBook } from '../db/makeDbAddBook';

export const makeAddBookController = (): Controller => {
  const controller = new AddBookController(
    makeAddBookValidation(),
    makeDbAddBook()
  );

  return controller;
};
