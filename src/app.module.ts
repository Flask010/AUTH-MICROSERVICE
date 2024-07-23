import { Module } from "@nestjs/common";
import { DbSourceModule } from "./infrastructure/db/db.data-source.module";
import { AuthConrollerModule } from "./controllers/auth/auth.controller.module";
import { UserControllerModule } from "./controllers/user/user.controller.module";

@Module({
  imports: [DbSourceModule, AuthConrollerModule, UserControllerModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
