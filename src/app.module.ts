//앱 모듈 : 모든 것의 루트 모듈

import { Module } from '@nestjs/common';
import { Movie } from './movies/entities/movie.entity';
import { moviesModule } from './movies/movies.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mariadb',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '1234',
      database: 'test',
      entities: [Movie],
      synchronize: true,
    }),
    moviesModule,
  ],
})
export class AppModule {} // 클래스
