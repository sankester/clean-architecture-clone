import EventDispatcher from '@adapter/events/EventDispatcher';
import { EventListType } from '@adapter/events/EventListType';
import { AccessDeniedError } from '@adapter/presentation/errors/AccessDeniedError';
import { makeBodyBuilder } from '@adapter/presentation/helpers/makeBodyBuiler';
import { makeResponseFactory } from '@adapter/presentation/helpers/makeResponseFactory';
import { Response } from '@adapter/presentation/protocol/Response';
import { ResponseBody } from '@adapter/presentation/protocol/ResponseBody';
import { Middleware } from '@adapter/protocol/Middleware';
import { CacheDriverGet } from '@application/protocol/cache/CacheDriverGet';
import { CacheDriverSet } from '@application/protocol/cache/CacheDriverSet';

export class AuthMiddlewaCacheProxy implements Middleware {
  constructor(
    private readonly middleware: Middleware,
    private readonly cacheDriverSet: CacheDriverSet,
    private readonly cacheDriverGet: CacheDriverGet
  ) {}

  async handle(httpRequest: AuthMiddlewaCacheProxy.Request): Promise<Response> {
    const { serverError, forbidden, ok } = makeResponseFactory();
    try {
      const { accessToken } = httpRequest;
      if (accessToken) {
        const account = await this.cacheDriverGet.get(accessToken);
        if (account) {
          const authData = JSON.parse(account);
          return ok(makeBodyBuilder().setData(authData).build());
        } else {
          const response = await this.middleware.handle(httpRequest);
          if (response.code === 200) {
            const body = response.body as ResponseBody;
            // parsing data
            const d = body.data as { id: string; exp: number };
            const expireAfter = d.exp - Math.round(new Date().valueOf() / 1000);
            // save token in cache
            await this.cacheDriverSet.set(
              accessToken,
              JSON.stringify({ id: d.id }),
              expireAfter
            );
            // return respose
            return response;
          }
        }
      }
      return forbidden(new AccessDeniedError());
    } catch (error) {
      EventDispatcher.publish(EventListType.SERVER_ERROR, this, error);
      return serverError(error);
    }
  }
}

export namespace AuthMiddlewaCacheProxy {
  export type Request = {
    accessToken: string;
  };
}
