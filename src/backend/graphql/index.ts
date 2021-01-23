import { ApolloServer } from 'apollo-server-express';
import { createApolloServer } from '../infrastructure/apollo/createApolloServer';
import schema from './schema';
import { Express } from 'express';
import { Server } from 'http';

export const createGraphqlApp = (
  app: Express,
  httpServer: Server
): ApolloServer => {
  const server = createApolloServer({
    schema,
    subscriptions: {
      path: '/subcription',
    },
    playground: process.env.NODE_ENV !== 'production',
  });

  server.applyMiddleware({ app });
  server.installSubscriptionHandlers(httpServer);

  return server;
};
