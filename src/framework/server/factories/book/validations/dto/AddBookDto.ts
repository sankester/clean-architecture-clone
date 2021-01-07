import { AddBook } from '@entities/usecases/book/AddBook';
import { IsDefined, IsNotEmpty, IsString } from 'class-validator';

export class AddBookDto implements AddBook.Params {
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
