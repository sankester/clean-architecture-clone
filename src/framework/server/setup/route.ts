import { Express, Router } from 'express';
import { logger } from '@adapter/utils/winston';
import { adaptRoute } from '../adapter/adaptRouteExpress';
import {
  makeAddBookController,
  makeGetAllBookController,
  makeDeleteBookController,
  makeUpdateBookController,
} from '../factories/controller';

export default (app: Express): void => {
  logger.debug('setup router');
  const router = Router();
  app.use('/api', router);

  router.post('/book', adaptRoute(makeAddBookController()));
  router.put('/book/:bookId', adaptRoute(makeUpdateBookController()));
  router.get('/book', adaptRoute(makeGetAllBookController()));
  router.delete('/book/:bookId', adaptRoute(makeDeleteBookController()));
};
