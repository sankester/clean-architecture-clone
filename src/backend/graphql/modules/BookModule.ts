import { createModule, gql } from 'graphql-modules';
import { adaptResolver } from '../adapter/adaptResolver';
import { makeGetAllBookHandler } from '@backend/infrastructure/common/factories/handlers/book/makeGetAllBookHandler';
import { makeAddBookHandler } from '@backend/infrastructure/common/factories/handlers/book/makeAddBookHandler';
import { makeUpdateBookHandler } from '@backend/infrastructure/common/factories/handlers/book/makeUpdateBookHandler';
import { makeDeleteBookHandler } from '@backend/infrastructure/common/factories/handlers/book/makeDeleteBookHandler';
import { makeGetBookByIdHandler } from '@backend/infrastructure/common/factories/handlers/book/makeGetBookByIdHandler';

export const BookModule = createModule({
  id: 'book-module',
  dirname: __dirname,
  typeDefs: [
    gql`
      type Query {
        books: [Book]
        getBookById(bookId: String): Book
      }

      type Mutation {
        addBook(addBookParams: AddBookParams): Boolean
        updateBook(updateBookParams: UpdateBookParams): Book
        deleteBook(bookId: String): Boolean
      }

      input AddBookParams {
        title: String!
        author: String!
        issn: String!
      }

      input UpdateBookParams {
        bookId: String!
        title: String!
        author: String!
        issn: String!
      }

      type Book {
        id: String!
        title: String!
        author: String!
        issn: String!
      }
    `,
  ],
  resolvers: {
    Query: {
      books: async (_parent: any, args: any, context: any) => {
        const response = await adaptResolver(
          makeGetAllBookHandler(),
          args,
          context
        );
        return response?.data;
      },
      getBookById: async (_parent: any, args: any, context: any) => {
        const response = await adaptResolver(
          makeGetBookByIdHandler(),
          args,
          context
        );
        return response?.data;
      },
    },
    Mutation: {
      addBook: async (_parent: any, { addBookParams }, context: any) => {
        const response = await adaptResolver(
          makeAddBookHandler(),
          addBookParams,
          context
        );
        if (response?.success) {
          return true;
        }
        return false;
      },
      updateBook: async (_parent: any, { updateBookParams }, context: any) => {
        const response = await adaptResolver(
          makeUpdateBookHandler(),
          updateBookParams,
          context
        );
        return response?.data;
      },
      deleteBook: async (_parent: any, args, context: any) => {
        const response = await adaptResolver(
          makeDeleteBookHandler(),
          args,
          context
        );
        if (response?.success) {
          return true;
        }
        return false;
      },
    },
  },
});
