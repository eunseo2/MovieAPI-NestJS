import { EntityRepository, Repository } from 'typeorm';
import { Movie } from './entities/movie.entity';

@EntityRepository(Movie)
export class MovieRepository extends Repository<Movie> {
  //  classMethods
  // async getMovieByTitle(title: string): Promise<Movie> {
  //   const movie = await this.findOne({
  //     where: { title: title },
  //   });
  //   return movie;
  // }
  // instaceMethods
}

// repository는 eintity를 관리(insert, update, delete, load, etc)
