import { IsDefined, IsMongoId, IsString } from 'class-validator';

export class GetBookByIdDto {
  @IsDefined()
  @IsString()
  @IsMongoId()
  bookId: string;
}
