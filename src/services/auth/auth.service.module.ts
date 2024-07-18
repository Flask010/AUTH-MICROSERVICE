import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from "src/infrastructure/db/entities/user.entity";
import { TokenServiceModule } from "../token/token.service.module";

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), TokenServiceModule],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthServiceModule {}
