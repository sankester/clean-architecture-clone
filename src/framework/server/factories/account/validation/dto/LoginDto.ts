import { LoginController } from '@adapter/controller/account/LoginController';
import { IsDefined, IsEmail, IsString } from 'class-validator';

export class LoginDto implements LoginController.Request {
  @IsDefined()
  @IsString()
  @IsEmail()
  email: string;

  @IsDefined()
  @IsString()
  password: string;
}
