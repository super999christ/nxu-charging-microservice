import { NestFactory } from "@nestjs/core";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import { AppModule } from "./app/app.module";
import { Logger, LoggerErrorInterceptor } from "nestjs-pino";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });

  const options = new DocumentBuilder()
    .setTitle("UserManagement Microservice")
    .setDescription("UserManagement API description")
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup("docs", app, document);

  app.enableCors();
  app.useGlobalInterceptors(new LoggerErrorInterceptor());
  app.useLogger(app.get(Logger));

  await app.startAllMicroservices();

  await app.listen(process.env.CONSUMER_ENVIRONMENT === 'local' ? 3003 : 3000);

  console.log("UserManagement Microservice is listening");
}

bootstrap();
