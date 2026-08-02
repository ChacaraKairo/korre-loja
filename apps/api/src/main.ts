import "reflect-metadata";
import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import helmet from "helmet";
import { AppModule } from "./app.module";

process.env.DATABASE_URL ??= "file:./dev.db";
process.env.JWT_SECRET ??= "change-me";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = Number(process.env.PORT ?? 3333);

  app.use(helmet());
  app.enableCors({
    origin: process.env.CORS_ORIGIN?.split(",") ?? ["http://localhost:5173"],
    credentials: true
  });

  const config = new DocumentBuilder()
    .setTitle("Loja do Korre API")
    .setDescription("API publica e administrativa da vitrine afiliada Loja do Korre.")
    .setVersion("0.1.0")
    .addBearerAuth()
    .build();

  SwaggerModule.setup("docs", app, SwaggerModule.createDocument(app, config));

  await app.listen(port);
}

bootstrap();
