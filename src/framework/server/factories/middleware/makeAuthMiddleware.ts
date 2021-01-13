import { AuthMiddleware } from '@adapter/middleware/AuthMiddleware';
import { Middleware } from '@adapter/protocol/Middleware';
import { JwtSslAdapter } from '@framework/library/jwt/JwtSslAdapter';

export const makeAuthMiddleware = (): Middleware => {
  const decrypter = new JwtSslAdapter();
  return new AuthMiddleware(decrypter);
};
