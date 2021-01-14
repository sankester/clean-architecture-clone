/* istanbul ignore file */

import { CacheDriverGet } from '@application/protocol/cache/CacheDriverGet';
import config from '@framework/config';
import * as r from 'redis';
import { CacheDriverSet } from '../../../application/protocol/cache/CacheDriverSet';
import { logger } from '../../library/winston/index';

const redis: typeof r =
  config.redisUrl === 'redis-mock' ? require('redis-mock') : require('redis');

export class RedisCacheDriver implements CacheDriverSet, CacheDriverGet {
  private static _instance: RedisCacheDriver;

  private _client?: r.RedisClient;

  private _initialConnection: boolean;

  private constructor() {
    this._initialConnection = true;
  }

  public static getInstance(): RedisCacheDriver {
    if (!RedisCacheDriver._instance) {
      this._instance = new RedisCacheDriver();
    }

    return this._instance;
  }

  async open(): Promise<void> {
    return new Promise((res) => {
      this._client = redis.createClient(config.redisUrl);
      const client = this._client;

      // on connnect
      client.on('connect', () => {
        logger.info('Redis: connected');
      });

      // on ready connection
      client.on('ready', () => {
        if (this._initialConnection) {
          this._initialConnection = false;
          res();
        }
        logger.info('Redis: ready');
      });

      // on reconnecting
      client.on('reconnecting', () => {
        logger.info('Redis: reconnecting');
      });

      // on end
      client.on('end', () => {
        logger.info('Redis: end');
      });

      // on disconnected
      client.on('disconnected', () => {
        logger.error('Redis: disconnected');
      });

      // on error
      client.on('error', function (err) {
        logger.error(`Redis: ${err}`);
      });
    });
  }

  public close(): Promise<void> {
    return new Promise((resolve) => {
      this._client?.quit(() => {
        resolve();
      });
    });
  }

  async set(key: string, value: any, expireAfter: number): Promise<void> {
    return new Promise((res, rej) => {
      const result = this._client?.setex(
        key,
        expireAfter,
        value,
        function (err) {
          if (err) return rej(err);
          res();
        }
      );
      if (result !== undefined && result === false) {
        rej(new Error('Redis connection error'));
      }
    });
  }

  get(key: string): Promise<string | undefined> {
    return new Promise((res, rej) => {
      const result = this._client?.get(key, function (err, result) {
        if (err) return rej(err);
        res(result ? result : undefined);
      });
      if (result !== undefined && result === false) {
        rej(new Error('Redis connection error'));
      }
    });
  }
}

export default RedisCacheDriver.getInstance();
