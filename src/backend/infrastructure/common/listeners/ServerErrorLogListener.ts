import { Listener } from '@adapter/events/protocol/Listener';
import fs from 'fs';
import * as path from 'path';
import { logger } from '../../winston/index';

export class ServerErrorLogListener implements Listener {
  constructor(private filePath: string) {
    this.initialize();
  }

  private initialize() {
    const dir = path.dirname(this.filePath);
    if (!fs.existsSync(dir)) {
      fs.mkdir(
        dir,
        {
          recursive: true,
        },
        (err) => {
          if (err) logger.error(`${err}`);
          if (!fs.existsSync(this.filePath)) {
            fs.writeFile(this.filePath, '', (err) => {
              logger.error(`${err}`);
            });
          }
        }
      );
    }
  }

  handle(_event: string, emitter: Record<string, any>, data: any): void {
    const msg = `${new Date().toISOString()} - Server Error : from ${
      emitter.constructor.name
    } with error ${data.stack}`;
    const stream = fs.createWriteStream(this.filePath, { flags: 'a' });
    stream.once('open', function () {
      stream.write(msg + '\r\n');
    });
  }
}
