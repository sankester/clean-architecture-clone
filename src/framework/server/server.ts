import 'module-alias/register';
import RedisCacheDriver from '@framework/db/redis/index';
import MongoConnection from '@framework/db/mongodb/connection/index';
import app from './setup/app';
import { logger } from '@framework/library/winston';

const start = async () => {
  try {
    await RedisCacheDriver.open();
    await MongoConnection.open();
    app.listen(3000, () => {
      logger.info(
        'server running in docker, access from http://localhost:3000'
      );
    });
  } catch (error) {
    logger.error(`start server : ${error}`);
  }
};

start();
