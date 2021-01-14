export interface CacheDriverSet {
  set(key: string, value: any, expireAfter?: number): Promise<void>;
}
