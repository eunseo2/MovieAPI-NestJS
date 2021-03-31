import { Test, TestingModule } from '@nestjs/testing';
import { MovieRepository } from './entities/movies.repository';
import { MoviesService } from './movies.service';

describe('MoviesService', () => {
  let service: MoviesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoviesService, MovieRepository],
    }).compile();

    //provide: MoviesService,
    //useValue: {},
    service = module.get<MoviesService>(MoviesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
