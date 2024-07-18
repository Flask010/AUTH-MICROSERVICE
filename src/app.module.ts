import { Module } from "@nestjs/common";
import { DbSourceModule } from "./infrastructure/db/db.data-source.module";
import { AuthConrollerModule } from "./controllers/auth/auth.controller.module";

@Module({
  imports: [DbSourceModule, AuthConrollerModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
