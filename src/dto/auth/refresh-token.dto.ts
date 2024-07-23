import { IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class RefreshTokenDTO {
  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  @MaxLength(2000)
  token: string;
}
