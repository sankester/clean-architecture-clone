import 'module-alias/register';
import RedisCacheDriver from '@backend/infrastructure/db/redis/index';
import MongoConnection from '@backend/infrastructure/db/mongodb/connection/index';
import app from './setup/app';
import { logger } from '@backend/infrastructure/winston';
import registerListener from './setup/listeners';
const start = async () => {
  try {
    await RedisCacheDriver.open();
    await MongoConnection.open();
    app.listen(3000, () => {
      logger.info(
        'server running in docker, access from http://localhost:3000'
      );
      logger.info(`run in ${process.env.NODE_ENV} mode`);
      registerListener();
    });
  } catch (error) {
    logger.error(`start server : ${error}`);
  }
};

start();
