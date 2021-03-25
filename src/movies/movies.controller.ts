import { Body, Patch, Query } from '@nestjs/common';
import { Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { Movie } from './entities/movie.entity';
import { MoviesService } from './movies.service';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get()
  getAll(): Movie[] {
    return this.moviesService.getAll();
  }
  @Get('search')
  search(@Query('year') seachingYear: string) {
    return `we are searching for a movie made after : ${seachingYear}`;
  }

  @Get(':id') //id별 movie
  getOne(@Param('id') movieId: string): Movie {
    return this.moviesService.getOne(movieId);
  }

  @Post()
  create(@Body() movieData) {
    //req.body에 json으로 영화 이름 감독 써주면 됨.
    return this.moviesService.create(movieData);
  }

  @Delete(':id')
  remove(@Param('id') movieId: string) {
    return this.moviesService.deleteOne(movieId);
  }

  //UPDATE  전체 - put 일부 - patch
  @Patch(':id')
  patch(@Param('id') movieId: string, @Body() updateData) {
    return {
      updateMovie: movieId,
      ...updateData,
    };
  }
}
