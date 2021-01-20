import { IsDefined, IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { AddAccount } from '@entities/usecases/account/AddAccount';

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
