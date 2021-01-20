import { makeAuthMiddleware } from '@backend/infrastructure/common/factories/middleware/makeAuthMiddleware';
import { adaptMiddleware } from '../adapter/adaptMiddleware';

export const auth = adaptMiddleware(makeAuthMiddleware());
