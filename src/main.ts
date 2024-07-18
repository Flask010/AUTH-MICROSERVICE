import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { appConfigInstance } from "./infrastructure/app-config/app-config";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix(appConfigInstance.API_BASE_URI_PATH);
  await app.listen(appConfigInstance.API_PORT);
  console.log(`AUTH app started on port ${appConfigInstance.API_PORT}`);
}
bootstrap();
