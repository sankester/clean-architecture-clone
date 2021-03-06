import { Router } from 'express';
import { adaptRoute } from '../adapter/adaptRouteExpress';
import { makeAddBookHandler } from '@backend/infrastructure/common/factories/handlers/book/makeAddBookHandler';
import { makeDeleteBookHandler } from '@backend/infrastructure/common/factories/handlers/book/makeDeleteBookHandler';
import { makeGetAllBookHandler } from '@backend/infrastructure/common/factories/handlers/book/makeGetAllBookHandler';
import { makeGetBookByIdHandler } from '@backend/infrastructure/common/factories/handlers/book/makeGetBookByIdHandler';
import { makeUpdateBookHandler } from '@backend/infrastructure/common/factories/handlers/book/makeUpdateBookHandler';
import { auth } from '../middleware/auth';

export default (router: Router): void => {
  router.get('/book', adaptRoute(makeGetAllBookHandler()));
  router.get('/book/:bookId', adaptRoute(makeGetBookByIdHandler()));
  router.post('/book', auth, adaptRoute(makeAddBookHandler()));
  router.put('/book/:bookId', auth, adaptRoute(makeUpdateBookHandler()));
  router.delete('/book/:bookId', auth, adaptRoute(makeDeleteBookHandler()));
};
