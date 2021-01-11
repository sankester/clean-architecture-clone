import { bookPath } from './paths/book-path';
import { bookUpdateDeletePath } from './paths/book-update-delete-path';
import { loginPath } from './paths/login-path';
import { signUpPath } from './paths/sign-up-path';

export default {
  '/signup': signUpPath,
  '/login': loginPath,
  '/book': bookPath,
  '/book/{bookId}': bookUpdateDeletePath,
};
