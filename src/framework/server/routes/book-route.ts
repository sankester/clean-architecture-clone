import { Router } from 'express';
import { adaptRoute } from '../adapter/adaptRouteExpress';
import { makeAddBookController } from '../factories/book/controller/makeAddBookController';
import { makeDeleteBookController } from '../factories/book/controller/makeDeleteBookController';
import { makeGetAllBookController } from '../factories/book/controller/makeGetAllBookController';
import { makeUpdateBookController } from '../factories/book/controller/makeUpdateBookController';

export default (router: Router): void => {
  router.post('/book', adaptRoute(makeAddBookController()));
  router.get('/book', adaptRoute(makeGetAllBookController()));
  router.put('/book/:bookId', adaptRoute(makeUpdateBookController()));
  router.delete('/book/:bookId', adaptRoute(makeDeleteBookController()));
};
