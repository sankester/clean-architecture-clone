import { bookPath } from './paths/book-path';
import { bookUpdateDeletePath } from './paths/book-update-delete-path';

export default {
  '/book': bookPath,
  '/book/{bookId}': bookUpdateDeletePath,
};
