import { Express } from 'express';
import config from '@backend/infrastructure/config/index';
import morgan from 'morgan';
import morganBody from 'morgan-body';
import { expressDevLogger } from '../utils/express_dev_logger';

export default function (app: Express) {
  /* istanbul ignore next */
  if (config.morganLogger) {
    app.use(
      morgan(':method :url :status :response-time ms - :res[content-length]')
    );
  }

  /* istanbul ignore next */
  if (config.morganBodyLogger) {
    morganBody(app);
  }

  /* istanbul ignore next */
  if (config.exmplDevLogger) {
    app.use(expressDevLogger);
  }
}
