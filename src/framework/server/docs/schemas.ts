import { booksSchema, bookSchema } from './schemas/book';
import { errorSchema, errorResponse } from './schemas/error';

export default {
  error: errorSchema,
  errorResponse: errorResponse,
  book: bookSchema,
  books: booksSchema,
};
