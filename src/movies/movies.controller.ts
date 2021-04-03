import { Body, Query } from '@nestjs/common';
import { Controller, Delete, Get, Param, Post, Patch } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Movie } from './entities/movie.entity';
import { MoviesService } from './movies.service';
import { NotFoundException } from '@nestjs/common';

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

  @Get('search')
  async search(@Query('title') title: string) {
    const movie = await this.moviesService.getOneTitle(title);
    return movie;
  }

  @Get(':id') //id별 movie
  async getOne(@Param('id') movieId: number) {
    const movie = await this.moviesService.getOne(movieId);
    if (!movie) {
      throw new NotFoundException(`movie with ID ${movieId} not found`);
    }
    return movie;
  }

  @Post()
  async create(@Body() movieData: CreateMovieDto): Promise<string> {
    await this.moviesService.create(movieData);
    return Object.assign({
      data: { ...movieData },
      statusCode: 201,
      statusMsg: `saved successfully`,
    });
  }

  @Delete(':id')
  async remove(@Param('id') movieId: number): Promise<string> {
    await this.moviesService.deleteOne(movieId);
    return Object.assign({
      data: { movieId: movieId },
      statusCode: 201,
      statusMsg: `deleted successfully`,
    });
  }

  //UPDATE  전체 - put 일부 - patch
  @Patch(':id')
  async patch(
    @Param('id') movieId: number,
    @Body() updateData: UpdateMovieDto,
  ) {
    await this.moviesService.update(movieId, updateData);
  }
}
