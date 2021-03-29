//앱 모듈 : 모든 것의 루트 모듈

import { Module } from '@nestjs/common';
import { Movie } from './movies/entities/movie.entity';
import { MoviesController } from './movies/movies.controller';
import { MoviesService } from './movies/movies.service';
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
  ],
  controllers: [MoviesController], // url을 가져오고 함수를 실행 (express의 router 같은)
  providers: [MoviesService],
})
export class AppModule {} // 클래스
