import { Router } from 'express';
import { adaptRoute } from '../adapter/adaptRouteExpress';
import { makeAddBookHandler } from '../factories/handlers/book/makeAddBookHandler';
import { makeDeleteBookHandler } from '../factories/handlers/book/makeDeleteBookHandler';
import { makeGetAllBookHandler } from '../factories/handlers/book/makeGetAllBookHandler';
import { makeUpdateBookHandler } from '../factories/handlers/book/makeUpdateBookHandler';
import { auth } from '../middleware/auth';

export default (router: Router): void => {
  router.post('/book', auth, adaptRoute(makeAddBookHandler()));
  router.get('/book', adaptRoute(makeGetAllBookHandler()));
  router.put('/book/:bookId', auth, adaptRoute(makeUpdateBookHandler()));
  router.delete('/book/:bookId', auth, adaptRoute(makeDeleteBookHandler()));
};
