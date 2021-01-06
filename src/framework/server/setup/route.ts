import { Express, Router } from 'express';
import { adaptRoute } from '../adapter/adaptRouteExpress';
import { logger } from '@adapter/utils/winston';
import {
  makeAddBookController,
  makeGetAllBookController,
  makeDeleteBookController,
} from '../factories/controller';

export default (app: Express) => {
  logger.debug('setup router');
  const router = Router();
  app.use('/api', router);
  router.post('/book', adaptRoute(makeAddBookController()));
  router.get('/book', adaptRoute(makeGetAllBookController()));
  router.delete('book/:bookId'), adaptRoute(makeDeleteBookController());
};
