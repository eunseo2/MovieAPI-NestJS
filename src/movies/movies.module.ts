import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MoviesController } from './movies.controller';
import { MoviesService } from './movies.service';
import { MovieRepository } from './movies.repository';

@Module({
  imports: [TypeOrmModule.forFeature([MovieRepository])],
  providers: [MoviesService],
  controllers: [MoviesController],
  exports: [MoviesService],
})
export class moviesModule {}

//이 모듈은 forFeature () 메서드를 사용하여 현재 범위에 등록 된 저장소를 정의합니다.
//그런 다음 @InjectRepository () 데코레이터를 사용하여
//movieRepository를 MoviesService에 삽입 할 수 있습니다.
