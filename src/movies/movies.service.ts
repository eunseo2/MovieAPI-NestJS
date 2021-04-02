import { Injectable } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Movie } from './entities/movie.entity';
import { MovieRepository } from './movies.repository';

@Injectable()
export class MoviesService {
  constructor(private readonly movieRepository: MovieRepository) {
    this.movieRepository = movieRepository;
  }

  async getAll() {
    const movie = await this.movieRepository.find();
    console.log(movie);
    return movie;
  }

  async getOne(id: number) {
    const movie = await this.movieRepository.findOne(id);
    console.log(movie);
    return movie;
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

  async getOneTitle(title: string): Promise<Movie | undefined> {
    const result = await this.movieRepository.getMovieByTitle(title);
    return result;
  }
}
