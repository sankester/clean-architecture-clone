import { IsDefined, IsMongoId, IsNotEmpty, IsString } from 'class-validator';

export class DeleteBookDto {
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  @IsMongoId()
  bookId: string;
}
