import { CacheDriverGet } from '@application/protocol/cache/CacheDriverGet';
import { CacheDriverSet } from '@application/protocol/cache/CacheDriverSet';
import { GetBookById } from '@entities/usecases/book/GetBookById';

export class DbGetBookByIdCacheProxy implements GetBookById {
  constructor(
    private readonly getBookById: GetBookById,
    private readonly cacheDriverGet: CacheDriverGet,
    private readonly expiratedTime: number,
    private readonly cahceDriverSet: CacheDriverSet
  ) {}

  async getById(id: string): Promise<GetBookById.Result> {
    const cached = await this.cacheDriverGet.get(id);
    if (cached) {
      return JSON.parse(cached);
    }
    const result = await this.getBookById.getById(id);
    if (result) {
      this.cahceDriverSet.set(id, JSON.stringify(result), this.expiratedTime);
    }
    return result;
  }
}
