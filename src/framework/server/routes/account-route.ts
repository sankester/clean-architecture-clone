import { Router } from 'express';
import { makeLoginHandler } from '../factories/handlers/account/makeLoginHandler';
import { makeSignUptHandler } from '../factories/handlers/account/makeSignUpHandler';
import { adaptRoute } from './../adapter/adaptRouteExpress';

export default (router: Router): void => {
  router.post('/signup', adaptRoute(makeSignUptHandler()));
  router.post('/login', adaptRoute(makeLoginHandler()));
};
