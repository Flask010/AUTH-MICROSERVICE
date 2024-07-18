import { IsNotEmpty, IsString, Max, Min } from "class-validator";

export class RefreshTokenModelDTO {
  @IsNotEmpty()
  @IsString()
  @Min(5)
  @Max(100)
  email: string;
}
