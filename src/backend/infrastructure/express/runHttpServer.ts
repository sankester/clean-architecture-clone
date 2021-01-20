import http from 'http';

export interface ServerListenOptions {
  port: number;
  host?: string;
  backlog?: number;
  path?: string;
  exclusive?: boolean;
  readableAll?: boolean;
  writableAll?: boolean;
  /**
   * @default false
   */
  ipv6Only?: boolean;
}

export const runHttpServer = (
  httpServer: http.Server,
  options: ServerListenOptions,
  callback: (options: ServerListenOptions) => void
) => {
  // Run server and listen http request
  httpServer.listen(options, () => {
    callback(options);
  });
};
