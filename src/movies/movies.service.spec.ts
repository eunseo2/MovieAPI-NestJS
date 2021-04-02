import { Test, TestingModule } from '@nestjs/testing';
import { Movie } from './entities/movie.entity';
import { MoviesService } from './movies.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateMovieDto } from './dto/update-movie.dto';

type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;

const mockRepository = {
  find: jest.fn(),
  findOne: jest.fn(),
  save: jest.fn(),
  delete: jest.fn(),
  update: jest.fn(),
  getMovieByTitle: jest.fn(),
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
    title: 'title',
    year: 2020,
    genres: 'action',
  };

  describe('getAll', () => {
    it('getAll', async () => {
      movieRepository.find.mockResolvedValue(movieData);
      const movie = await service.getAll();
      console.log(movie);
      expect(movie).toBe(movieData);
    });
  });

  describe('getOne', () => {
    it('should have a getOne function', () => {
      expect(typeof service.getOne).toBe('function');
    });
    it('should return a movie', async () => {
      movieRepository.findOne.mockResolvedValue(movieData.id); // 결과값
      const movie = await service.getOne(movieData.id);
      console.log(movie);
      expect(movie).toBe(movieData.id);
    });
  });

  describe('remove', () => {
    it('should return id ', async () => {
      movieRepository.delete.mockResolvedValue(movieData.id);
      const movie = await service.deleteOne(movieData.id);
      expect(movie).toBe(movieData.id);
    });
  });

  describe('create', () => {
    it('should return object ', async () => {
      movieRepository.save.mockResolvedValue(movieData);
      const movie = await service.create(movieData);
      expect(movie).toBeInstanceOf(Object);
    });
  });
  const updateData: UpdateMovieDto = {
    title: 'title-update',
    year: 2019,
    genres: 'romance',
  };

  describe('update', () => {
    it('should return object ', async () => {
      movieRepository.update.mockResolvedValue(updateData);
      const movie = await service.update(movieData.id, updateData);
      console.log(movie);
      expect(movie).toBeInstanceOf(Object);
    });
  });

  describe('getOneTitle', () => {
    it('should return object', async () => {
      const movie = await service.getOneTitle('movie2');
      console.log(movie);
      expect(movie).toBeInstanceOf(Object);
    });
  });
});
