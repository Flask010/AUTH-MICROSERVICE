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
import { ObjectId } from "mongodb";
import { UserRoles } from "src/enums/roles/roles.enum";

export class UserDTO {
  @IsNotEmpty()
  @IsString()
  _id: ObjectId;

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
  refreshToken?: string;

  @IsOptional()
  @IsString()
  password?: string;
}
