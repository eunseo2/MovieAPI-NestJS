import { Body } from '@nestjs/common';
import { Controller, Delete, Get, Param, Post, Patch } from '@nestjs/common';
import { Movie } from './entities/movie.entity';
import { MoviesService } from './movies.service';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get() // GET / movies
  async getAll(): Promise<Movie[]> {
    const movieList = await this.moviesService.getAll();
    return Object.assign({
      data: movieList,
      statusCode: 200,
      statusMsg: `데이터 조회가 성공적으로 완료되었습니다.`,
    });
  }

  @Get(':id') //id별 movie
  async getOne(@Param('id') movieId: string): Promise<Movie> {
    const getOne = await this.moviesService.getOne(movieId);
    return Object.assign({
      data: getOne,
      statusCode: 200,
      statusMsg: `데이터 조회가 성공적으로 완료되었습니다.`,
    });
  }

  @Post()
  async create(@Body() movieData: Movie): Promise<string> {
    await this.moviesService.create(movieData);
    return Object.assign({
      data: { ...movieData },
      statusCode: 201,
      statusMsg: `saved successfully`,
    });
  }

  @Delete(':id')
  async remove(@Param('id') movieId: string): Promise<string> {
    await this.moviesService.deleteOne(movieId);
    return Object.assign({
      data: { movieId: movieId },
      statusCode: 201,
      statusMsg: `deleted successfully`,
    });
  }

  //UPDATE  전체 - put 일부 - patch
  @Patch(':id')
  async patch(@Param('id') movieId: string, @Body() updateData) {
    await this.moviesService.update(movieId, updateData);
  }
}
