import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const PORT: number | undefined = Number(process.env.PORT);

if (!PORT) {
  //!! PORT가 undefined 일수도 있으므로 에러 처리를 해야 밑에서 에러안남
  throw new Error('Missing');
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  await app.listen(PORT, () => console.log(`${PORT}포트 서버 대기 중!`));
}
bootstrap();
