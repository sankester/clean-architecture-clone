import { EventListType } from '@adapter/events/EventListType';
import { Listener } from '@adapter/events/protocol/Listener';
import { logger } from '@backend/infrastructure/winston/index';

export class WinstonListener implements Listener {
  handle(event: string, emitter: Record<string, any>, data: any): void {
    let message = '';
    switch (event) {
      case EventListType.SERVER_ERROR:
        message = `From ${emitter.constructor.name} with ${data.stack}`;
        logger.debug(message);
        break;
      case EventListType.VALIDATION_ERROR:
        message = `From ${emitter.constructor.name} with message ${data.message}`;
        logger.error(message);
        break;
    }
  }
}
