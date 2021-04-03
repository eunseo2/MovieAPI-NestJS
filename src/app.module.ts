//앱 모듈 : 모든 것의 루트 모듈

import { Module } from '@nestjs/common';
import { Movie } from './movies/entities/movie.entity';
import { moviesModule } from './movies/movies.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3307,
      username: 'root',
      password: '1234',
      database: 'test',
      entities: [Movie],
      synchronize: true,
    }),
    moviesModule,
  ],
  controllers: [AppController],
})
export class AppModule {} // 클래스
