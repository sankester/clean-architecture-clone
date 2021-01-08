import { AddBookController } from '@adapter/controller';
import { Controller } from '@adapter/protocol/Controller';
import { makeDbAddBook } from '../db/makeDbAddBook';
import { makeAddBookValidation } from '../validations/makeAddBookValidation';

export const makeAddBookController = (): Controller => {
  const controller = new AddBookController(
    makeAddBookValidation(),
    makeDbAddBook()
  );

  return controller;
};
