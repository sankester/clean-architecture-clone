import { Controller } from '@adapter/protocols/Controller';
import { AddBookController } from '@adapter/controller';
import { makeDbAddBook } from '@framework/server/factories/db';

export const makeAddBookController = (): Controller => {
    const controller = new AddBookController(makeDbAddBook());
    return controller
}