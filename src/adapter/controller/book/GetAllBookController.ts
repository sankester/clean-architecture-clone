import { logger } from "@adapter/utils/winston";
import { Controller } from "@adapter/protocols/Controller";
import { HttpResponse } from "@adapter/protocols";
import { GetAllBook } from "@entities/usecases/GetAllBook";
import { ResponseFactory } from '@adapter/presentation/contracts/ResponseFactory';

export class GetAllBookController implements Controller {
  constructor(private readonly getAllBook: GetAllBook) {}

  async handle(
    _request: any,
    { makeBody, makeResponse }: ResponseFactory
  ): Promise<HttpResponse> {
    const { noContent, ok, serverError } = makeResponse()
    try {
      const docs = await this.getAllBook.findAll();
      return docs.length > 0 ? ok(makeBody().setData(docs).build()) : noContent()
    } catch (error) {
      logger.error(`GetAllBookController: ${error}`);
      return serverError(error);
    }
  }
}
