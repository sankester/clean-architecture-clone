import 'module-alias/register';
import MongoConnection from '@backend/infrastructure/db/mongodb/connection';
import RedisCacheDriver from '@backend/infrastructure/db/redis/index';
import { createHttpServer } from '@backend/infrastructure/express/createHttpServer';
import { runHttpServer } from '@backend/infrastructure/express/runHttpServer';
import { logger } from '@backend/infrastructure/winston/index';
import { createRestApp } from '@backend/rest';
import registerListener from '@backend/rest/setup/listeners';

export const runRestServer = async () => {
  try {
    await RedisCacheDriver.open();
    await MongoConnection.open();
    const restApp = createRestApp();
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

runRestServer();
