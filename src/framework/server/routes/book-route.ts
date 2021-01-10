import { Router } from 'express';
import { adaptRoute } from '../adapter/adaptRouteExpress';
import {
  makeDeleteBookHandler,
  makeGetAllBookHandler,
  makeUpdateBookHandler,
} from '../factories/book/handlers';
import { makeAddBookHandler } from '../factories/book/handlers/makeAddBookHandler';

export default (router: Router): void => {
  router.post('/book', adaptRoute(makeAddBookHandler()));
  router.get('/book', adaptRoute(makeGetAllBookHandler()));
  router.put('/book/:bookId', adaptRoute(makeUpdateBookHandler()));
  router.delete('/book/:bookId', adaptRoute(makeDeleteBookHandler()));
};
