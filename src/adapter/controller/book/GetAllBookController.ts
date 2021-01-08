/* eslint-disable @typescript-eslint/no-unused-vars */
import { Response } from '@adapter/presentation/protocol/Response';
import { Controller } from '@adapter/protocol/Controller';
import { GetAllBook } from '@entities/usecases/book/GetAllBook';
import { makeResponseFactory } from '@adapter/presentation/helpers/makeResponseFactory';
import { makeBodyBuilder } from '@adapter/presentation/helpers/makeBodyBuiler';

export class GetAllBookController implements Controller {
  constructor(private readonly getAllBook: GetAllBook) {}

  async handle(_request: any): Promise<Response> {
    const { noContent, ok, serverError } = makeResponseFactory();
    try {
      const docs = await this.getAllBook.findAll();
      return docs.length > 0
        ? ok(makeBodyBuilder().setData(docs).build())
        : noContent();
    } catch (error) {
      return serverError(error);
    }
  }
}
