import {
  IsArray,
  IsBoolean,
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsString,
  Max,
  Min,
} from "class-validator";
import { UserRoles } from "src/enums/roles/roles.enum";

export class UserResponseDTO {
  @IsOptional()
  @IsString()
  id?: string;

  @IsNotEmpty()
  @IsString()
  @Min(2)
  @Max(100)
  username: string;

  @IsNotEmpty()
  @IsString()
  @Min(5)
  @Max(100)
  email: string;

  @IsOptional()
  @IsBoolean()
  notifications?: boolean;

  @IsOptional()
  @IsDateString()
  createdAt?: Date;

  @IsArray()
  @IsOptional()
  roles?: UserRoles[];

  @IsOptional()
  @IsString()
  accessToken?: string;

  @IsOptional()
  @IsString()
  refreshToken?: string;
}
