import { booksSchema, bookSchema } from './schemas/book';
import { errorSchema, errorResponse } from './schemas/error';
import { addBookParamsSchema } from './schemas/book/addBookParamsSchema';
import { successResponseSchema } from './schemas/success/successResponseSchema';
import { updateBookParamsSchema } from './schemas/book/updateBookParamsSchema';
import { successMessageSchema } from './schemas/success/successMessageSchema';
import { updateBookResponseSchema } from './schemas/book/updateBookResponseSchema';

export default {
  error: errorSchema,
  errorResponse: errorResponse,
  successResponse: successResponseSchema,
  successMessage: successMessageSchema,
  book: bookSchema,
  books: booksSchema,
  addBookParams: addBookParamsSchema,
  updateBookParams: updateBookParamsSchema,
  updateBookResponse: updateBookResponseSchema,
};
