import { UpdateBook } from '@entities/usecases/book/UpdateBook';
import { IsDefined, IsMongoId, IsNotEmpty, IsString } from 'class-validator';

type UpdateParams = UpdateBook.Params & { bookId: string };

export class UpdateBookDto implements UpdateParams {
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  @IsMongoId()
  bookId: string;

  @IsDefined()
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsDefined()
  @IsNotEmpty()
  @IsString()
  author: string;

  @IsDefined()
  @IsNotEmpty()
  @IsString()
  issn: string;
}
