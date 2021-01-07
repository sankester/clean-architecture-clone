import { Controller } from '@adapter/contracts/Controller';
import { UpdateBookController } from '@adapter/controller/book/UpdateBookController';
import { makeDbUpdateBook } from '@framework/server/factories/book/db';
import { makeUpdateBookValidation } from '../validations/makeUpdateBookValidation';

export const makeUpdateBookController = (): Controller => {
  const controller = new UpdateBookController(
    makeUpdateBookValidation(),
    makeDbUpdateBook()
  );
  return controller;
};
