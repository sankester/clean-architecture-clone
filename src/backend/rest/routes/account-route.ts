import { Router } from 'express';
import { makeLoginHandler } from '@backend/infrastructure/common/factories/handlers/account/makeLoginHandler';
import { makeSignUptHandler } from '@backend/infrastructure/common/factories/handlers/account/makeSignUpHandler';
import { adaptRoute } from '../adapter/adaptRouteExpress';

export default (router: Router): void => {
  router.post('/signup', adaptRoute(makeSignUptHandler()));
  router.post('/login', adaptRoute(makeLoginHandler()));
};
