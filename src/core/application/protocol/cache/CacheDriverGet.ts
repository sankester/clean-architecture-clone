export interface CacheDriverGet {
  get(key: string): Promise<string | undefined>;
}
