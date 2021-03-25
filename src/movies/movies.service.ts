import { Injectable, NotFoundException } from '@nestjs/common';
import { Movie } from './entities/movie.entity';

@Injectable()
export class MoviesService {
  private movies: Movie[] = [];

  getAll(): Movie[] {
    return this.movies;
  }

  getOne(id: string): Movie {
    const movie = this.movies.find((movie) => movie.id === +id); //+ string-> number
    if (!movie) {
      throw new NotFoundException(`movie with id:${id} not found.`);
    }
    return movie;
  }
  deleteOne(id: string) {
    this.getOne(id);
    this.movies = this.movies.filter((movie) => movie.id !== +id);
  }

  create(movieData) {
    this.movies.push({
      id: this.movies.length + 1,
      ...movieData,
    });
  }

  update(id: string, updateData) {
    const movie = this.getOne(id); // getone이 movie를 줌
    this.deleteOne(id); //원래 movie 삭제
    this.movies.push({ ...movie, ...updateData });
  }
}
