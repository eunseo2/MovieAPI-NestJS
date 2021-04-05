import { Test, TestingModule } from '@nestjs/testing';
import { Movie } from './entities/movie.entity';
import { MoviesService } from './movies.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;

const mockRepository = {
  findOne: jest.fn(),
};

describe('MoviesService', () => {
  let service: MoviesService;
  let movieRepository: MockRepository<Movie>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MoviesService,
        {
          provide: getRepositoryToken(Movie),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
    movieRepository = module.get(getRepositoryToken(Movie));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  const movieData: Movie = {
    id: 1231,
    title: 'movie3',
    year: 2020,
    genres: 'action',
  };

  describe('getOneTitle', () => {
    it('should return object', async () => {
      movieRepository.findOne.mockResolvedValue(movieData); // 결과값
      const result = await service.getOneTitle(movieData.title);
      console.log(result);
      expect(result).toBeInstanceOf(Object);
    });
  });
});
