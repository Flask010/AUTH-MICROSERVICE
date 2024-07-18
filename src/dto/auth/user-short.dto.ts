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
import { UserRoles } from "src/infrastructure/db/enums/roles.enum";

export class UserShortDTO {
  @IsNotEmpty()
  @IsString()
  id: string;

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

  @IsNotEmpty()
  @IsBoolean()
  notifications: boolean;

  @IsNotEmpty()
  @IsDateString()
  createdAt: Date;

  @IsArray()
  @IsNotEmpty()
  roles: UserRoles[];

  @IsOptional()
  @IsString()
  accessToken?: string;

  @IsOptional()
  @IsString()
  refreshToken?: string;
}
