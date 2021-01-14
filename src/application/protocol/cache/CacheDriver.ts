export interface CacheDriver {
  set(key: string, value: any, expireAfter?: number): Promise<void>;
  get(key: string): Promise<string | undefined>;
}
