import { ConfigModule } from "@nestjs/config";
import { NestFactory } from "@nestjs/core";

import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes();
  app.enableCors();
  await ConfigModule.forRoot();
  await app.listen(3000);
}

bootstrap();
