import { adaptRoute } from './../adapter/adaptRouteExpress';
import { Router } from 'express';
import { makeSignUptHandler } from '../factories/account/handler/makeSignUpHandler';
import { makeLoginHandler } from '../factories/account/handler/makeLoginHandler';

export default (router: Router): void => {
  router.post('/signup', adaptRoute(makeSignUptHandler()));
  router.post('/login', adaptRoute(makeLoginHandler()));
};
