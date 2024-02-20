import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());
  await app
    .listen(8001)
    .then(() => {
      console.log('successfully started on port 8001');
    })

    .catch((error) => {
      console.log(error);
    });
}
bootstrap();
