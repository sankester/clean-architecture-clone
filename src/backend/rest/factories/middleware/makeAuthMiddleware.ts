import { AuthMiddleware } from '@adapter/middleware/AuthMiddleware';
import { Middleware } from '@adapter/protocol/Middleware';
import { JwtSslAdapter } from '@backend/infrastructure/jwt/JwtSslAdapter';
import { AuthMiddlewaCacheProxy } from '@adapter/middleware/proxy/AuthMiddlewareCacheProxy';
import RedisCacheDriver from '@backend/infrastructure/db/redis/index';

export const makeAuthMiddleware = (): Middleware => {
  const decrypter = new JwtSslAdapter();
  const middleware = new AuthMiddleware(decrypter);
  return new AuthMiddlewaCacheProxy(
    middleware,
    RedisCacheDriver,
    RedisCacheDriver
  );
};
