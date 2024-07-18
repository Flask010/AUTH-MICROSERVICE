import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthServiceModule } from "src/services/auth/auth.service.module";

@Module({
  imports: [AuthServiceModule],
  controllers: [AuthController],
  providers: [AuthController],
})
export class AuthConrollerModule {}
