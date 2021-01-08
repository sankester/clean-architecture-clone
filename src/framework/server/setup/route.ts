import { logger } from '@framework/library/winston';
import { Express, Router } from 'express';
import { adaptRoute } from '../adapter/adaptRouteExpress';
import {
  makeAddBookController,
  makeDeleteBookController,
  makeGetAllBookController,
  makeUpdateBookController,
} from '../factories/book/controller';

export default (app: Express): void => {
  logger.debug('setup router');
  const router = Router();
  app.use('/api', router);

  router.post('/book', adaptRoute(makeAddBookController()));
  router.get('/book', adaptRoute(makeGetAllBookController()));
  router.put('/book/:bookId', adaptRoute(makeUpdateBookController()));
  router.delete('/book/:bookId', adaptRoute(makeDeleteBookController()));
};
