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
    console.log('services:', movie);
    return movie;
  }

  async getOne(id: number) {
    const movie = await this.movieRepository.findOne(id);
    console.log('services:', movie);
    return movie;
  }

  delete(id: number) {
    return this.movieRepository.delete(id);
  }

  create(movieData: CreateMovieDto) {
    return this.movieRepository.save(movieData);
  }

  async update(id: number, updateData: UpdateMovieDto) {
    const movie = await this.movieRepository.update(id, updateData);
    console.log(movie);
    return movie;
  }

  async getOneTitle(title: string): Promise<Movie> {
    console.log(title);
    const movie = await this.movieRepository.findOne({
      where: { title },
    });
    console.log('services:', movie);
    return movie;
  }
}
