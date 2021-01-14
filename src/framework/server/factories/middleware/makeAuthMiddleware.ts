import { AuthMiddleware } from '@adapter/middleware/AuthMiddleware';
import { Middleware } from '@adapter/protocol/Middleware';
import { JwtSslAdapter } from '@framework/library/jwt/JwtSslAdapter';
import { AuthMiddlewaCacheProxy } from '@adapter/middleware/proxy/AuthMiddlewareCacheProxy';
import RedisCacheDriver from '@framework/db/redis/index';

export const makeAuthMiddleware = (): Middleware => {
  const decrypter = new JwtSslAdapter();
  const middleware = new AuthMiddleware(decrypter);
  return new AuthMiddlewaCacheProxy(
    middleware,
    RedisCacheDriver,
    RedisCacheDriver
  );
};
