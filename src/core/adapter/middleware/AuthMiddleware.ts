import EventDispatcher from '@adapter/events/EventDispatcher';
import { EventListType } from '@adapter/events/EventListType';
import { AccessDeniedError } from '@adapter/presentation/errors/AccessDeniedError';
import { makeBodyBuilder } from '@adapter/presentation/helpers/makeBodyBuiler';
import { makeResponseFactory } from '@adapter/presentation/helpers/makeResponseFactory';
import { Response } from '@adapter/presentation/protocol/Response';
import { Middleware } from '@adapter/protocol/Middleware';
import { Decrypter } from '@application/protocol/cryptography/Decrypter';

export class AuthMiddleware implements Middleware {
  constructor(private readonly descrypter: Decrypter) {}

  async handle(httpRequest: AuthMiddleware.Request): Promise<Response> {
    const { serverError, forbidden, ok } = makeResponseFactory();
    try {
      const { accessToken } = httpRequest;
      if (accessToken) {
        const account = await this.descrypter.descypt(accessToken);
        return ok(makeBodyBuilder().setData(account).build());
      }
      return forbidden(new AccessDeniedError());
    } catch (error) {
      EventDispatcher.publish(EventListType.SERVER_ERROR, this, error);
      return serverError(error);
    }
  }
}

export namespace AuthMiddleware {
  export type Request = {
    accessToken: string;
  };
}
