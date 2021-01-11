import { AddAccount } from '@entities/usecases/account/AddAccount';
import { IsDefined, IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class SignUpDto implements AddAccount.Params {
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsDefined()
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @IsDefined()
  @IsNotEmpty()
  @IsString()
  password: string;
}
