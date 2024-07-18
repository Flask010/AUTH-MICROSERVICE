import { Module } from "@nestjs/common";
import { TokenService } from "./token.service";
import { JwtService } from "@nestjs/jwt";
import { AppConfigModule } from "src/infrastructure/app-config/app-config.module";

@Module({
  imports: [AppConfigModule],
  providers: [TokenService, JwtService],
  exports: [TokenService],
})
export class TokenServiceModule {}
