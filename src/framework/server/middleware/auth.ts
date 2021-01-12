import { makeAuthMiddleware } from '../factories/middleware/makeAuthMiddleware';
import { adaptMiddleware } from '../adapter/adaptMiddleware';

export const auth = adaptMiddleware(makeAuthMiddleware());
