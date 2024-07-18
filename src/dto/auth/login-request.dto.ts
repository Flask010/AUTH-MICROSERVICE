import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class LoginRequestDTO {
  @IsNotEmpty()
  @IsString()
  @IsEmail({}, { message: `Email must be a valid email address` })
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
