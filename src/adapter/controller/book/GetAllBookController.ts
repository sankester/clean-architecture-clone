/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { logger } from '@adapter/utils/winston';
import { Controller } from '@adapter/contracts/Controller';
import { HttpResponse } from '@adapter/contracts';
import { GetAllBook } from '@entities/usecases/book/GetAllBook';
import { ResponseFactory } from '@adapter/presentation/contracts/ResponseFactory';

export class GetAllBookController implements Controller {
  constructor(private readonly getAllBook: GetAllBook) {}

  async handle(
    _request: any,
    { makeBody, makeResponse }: ResponseFactory
  ): Promise<HttpResponse> {
    const { noContent, ok, serverError } = makeResponse();
    try {
      const docs = await this.getAllBook.findAll();
      return docs.length > 0
        ? ok(makeBody().setData(docs).build())
        : noContent();
    } catch (error) {
      logger.error(`GetAllBookController: ${error}`);
      return serverError(error);
    }
  }
}
