import { Injectable } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { MovieRepository } from './movies.repository';

@Injectable()
export class MoviesService {
  constructor(private readonly movieRepository: MovieRepository) {
    this.movieRepository = movieRepository;
  }

  getAll() {
    return this.movieRepository.find();
  }

  getOne(id: number) {
    return this.movieRepository.findOne(id);
  }
  deleteOne(id: number) {
    return this.movieRepository.delete(id);
  }

  create(movieData: CreateMovieDto) {
    return this.movieRepository.save(movieData);
  }

  update(id: number, updateData: UpdateMovieDto) {
    return this.movieRepository.update(id, updateData);
  }
}
