import { Middleware } from '@adapter/protocol/Middleware';
import { JwtAdapter } from '../../../library/jwt/index';
import { AuthMiddleware } from '../../../../adapter/middleware/AuthMiddleware';

export const makeAuthMiddleware = (): Middleware => {
  const decrypter = new JwtAdapter('secret');
  return new AuthMiddleware(decrypter);
};
