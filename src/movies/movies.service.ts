import { Injectable } from '@nestjs/common';
import { Movie } from './entities/movie.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
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
