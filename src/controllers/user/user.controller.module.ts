import { Module } from "@nestjs/common";
import { UserController } from "./user.controller";
import { UserServiceModule } from "src/services/user/user.service.module";

@Module({
  imports: [UserServiceModule],
  controllers: [UserController],
  providers: [UserController],
})
export class UserControllerModule {}
