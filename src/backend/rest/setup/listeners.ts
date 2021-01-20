import { WinstonListener } from '../listeners/WinstonListener';
import EventDispatcher from '@adapter/events/EventDispatcher';
import { EventListType } from '@adapter/events/EventListType';
import { ServerErrorLogListener } from '../listeners/ServerErrorLogListener';
import * as path from 'path';

export default () => {
  const wintonListener = new WinstonListener();
  EventDispatcher.attach(wintonListener, EventListType.SERVER_ERROR);
  EventDispatcher.attach(wintonListener, EventListType.VALIDATION_ERROR);

  const serverErrorLogListener = new ServerErrorLogListener(
    path.resolve('./logs/error.log')
  );
  EventDispatcher.attach(serverErrorLogListener, EventListType.SERVER_ERROR);
};
