//앱 모듈 : 모든 것의 루트 모듈

import { Module } from '@nestjs/common';

import { MoviesController } from './movies/movies.controller';
import { MoviesService } from './movies/movies.service';

@Module({
  imports: [],
  controllers: [MoviesController], // url을 가져오고 함수를 실행 (express의 router 같은)
  providers: [MoviesService],
})
export class AppModule {} // 클래스
