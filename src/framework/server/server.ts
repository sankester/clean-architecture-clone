import 'module-alias/register';
import MongoConnection from '@framework/db/mongodb/connection/index';
import { logger } from '@framework/library/winston';
import app from './setup/app';

const start = async () => {
  try {
    await MongoConnection.open();
    app.listen(3000, () => {
      logger.info(
        'server running in docker container, access from http://localhost:3000'
      );
    });
  } catch (error) {
    logger.error(`start server : ${error}`);
  }
};

start();
