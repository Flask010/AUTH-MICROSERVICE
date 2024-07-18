import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from "class-validator";

export class RegisterRequestDTO {
  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  username: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail({}, { message: `Email must be a valid email address` })
  @MinLength(5)
  @MaxLength(100)
  email: string;

  @IsNotEmpty()
  @IsString()
  @Matches(/^(?=.*[0-9]).{8,32}$/, {
    message:
      "Password must be between 8 and 32 characters long and contain at least one number",
  })
  password: string;
}
