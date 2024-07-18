import { IsNotEmpty, IsString } from "class-validator";

export class TokenModelDTO {
  @IsNotEmpty()
  @IsString()
  userId: string;
}
