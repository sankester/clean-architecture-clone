import 'module-alias/register';
import MongoConnection from '@backend/infrastructure/db/mongodb/connection';
import RedisCacheDriver from '@backend/infrastructure/db/redis/index';
import { createHttpServer } from '@backend/infrastructure/express/createHttpServer';
import { runHttpServer } from '@backend/infrastructure/express/runHttpServer';
import { logger } from '@backend/infrastructure/winston/index';
import { createRestApp } from '@backend/rest';
import registerListener from '@backend/rest/setup/listeners';
import { createExpressApp } from './infrastructure/express/createServer';
import { createGraphqlApp } from './graphql/index';

export const runRestServer = async () => {
  try {
    await RedisCacheDriver.open();
    await MongoConnection.open();

    const expressApp = createExpressApp();
    const restApp = createRestApp(expressApp);
    const httpServer = createHttpServer(restApp);

    runHttpServer(
      httpServer,
      {
        port: 3000,
      },
      (options) => {
        logger.info(
          `Express server is running, access from http://localhost:${options.port}`
        );
        logger.info(`run in ${process.env.NODE_ENV} mode`);
        registerListener();
      }
    );
  } catch (error) {
    logger.error(`start server : ${error}`);
  }
};

export const runGraphqlServer = async () => {
  try {
    await RedisCacheDriver.open();
    await MongoConnection.open();

    const expressApp = createExpressApp();
    const httpServer = createHttpServer(expressApp);
    createGraphqlApp(expressApp, httpServer);

    runHttpServer(
      httpServer,
      {
        port: 3000,
        path: '/api-graphql',
      },
      (options) => {
        logger.info(
          `Apollo Server is running in http://localhost:${options.port}`
        );
        logger.info(`playground in http://localhost:${options.port}/graphql`);
        logger.info(`run in ${process.env.NODE_ENV} mode`);
      }
    );
  } catch (error) {
    logger.error(`start server : ${error}`);
  }
};

export const runExpressRestAndGraphqlServer = async () => {
  try {
    await RedisCacheDriver.open();
    await MongoConnection.open();

    const expressApp = createExpressApp();
    const httpServer = createHttpServer(expressApp);

    createGraphqlApp(expressApp, httpServer);
    createRestApp(expressApp);

    runHttpServer(
      httpServer,
      {
        port: 3000,
        path: '/api-graphql',
      },
      (options) => {
        logger.info(`Server is running in http://localhost:${options.port}`);
        logger.info(`playground in http://localhost:${options.port}/graphql`);
        logger.info(`swagger in http://localhost:${options.port}/api-docs`);
        logger.info(`run in ${process.env.NODE_ENV} mode`);
      }
    );
  } catch (error) {
    logger.error(`start server : ${error}`);
  }
};

runExpressRestAndGraphqlServer();
