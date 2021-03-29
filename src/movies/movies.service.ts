import { Injectable } from '@nestjs/common';
import { Movie } from './entities/movie.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(Movie) private movieRepository: Repository<Movie>,
  ) {
    this.movieRepository = movieRepository;
  }

  getAll() {
    return this.movieRepository.find();
  }

  getOne(id: string) {
    return this.movieRepository.findOne(id);
  }
  deleteOne(id: string) {
    return this.movieRepository.delete(id);
  }

  create(movieData) {
    return this.movieRepository.save(movieData);
  }

  update(id: string, updateData) {
    return this.movieRepository.update(id, updateData);
  }
}
