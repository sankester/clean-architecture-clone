import { Response } from '@adapter/presentation/protocol/Response';
import { Decrypter } from '@application/protocol/cryptography/Decrypter';
import { AccessDeniedError } from '../presentation/errors/AccessDeniedError';
import { makeResponseFactory } from '../presentation/helpers/makeResponseFactory';
import { Middleware } from '../protocol/Middleware';
import { makeBodyBuilder } from '../presentation/helpers/makeBodyBuiler';
import EventDispatcher from '../events/EventDispatcher';
import { EventListType } from '../events/EventListType';

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
