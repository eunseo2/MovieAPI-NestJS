//앱 모듈 : 모든 것의 루트 모듈

import { Module } from '@nestjs/common';
import { Movie } from './movies/entities/movie.entity';
import { moviesModule } from './movies/movies.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env.development',
    }),
    TypeOrmModule.forRoot({
      type: 'mariadb',
      host: process.env.DB_HOST,
      port: 3306,
      username: process.env.DB_USER,
      password: process.env.DB_PW,
      database: process.env.DB_DATABASE,
      entities: [Movie],
      synchronize: true,
    }),
    moviesModule,
  ],
  controllers: [AppController],
})
export class AppModule {} // 클래스
