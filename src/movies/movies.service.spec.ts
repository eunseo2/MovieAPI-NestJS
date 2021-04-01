import { Test, TestingModule } from '@nestjs/testing';
import { Movie } from './entities/movie.entity';
import { MoviesService } from './movies.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;

const mockRepository = {
  find: jest.fn(),
  findOne: jest.fn(),
  create: jest.fn(),
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

  // describe('getAll', () => {
  //   it('getAll', () => {
  //     const movie = movieRepository.find();
  //     expect(typeof movie).toBe(Promise);
  //   });
  //   // it('should have a getAll function', () => {
  //   //   expect(service.getAll).toBeInstanceOf(Function);
  //   // });
  // });

  describe('getOne', () => {
    const movieData: Movie = {
      id: 1231,
      title: 'title',
      year: 2020,
      genres: 'action',
    };
    it('getOne.3...', () => {
      const movie = movieRepository.findOne.mockResolvedValue(1);
      console.log(movie);
      expect(typeof movie).toBe('function');
    });
    it('should have a getOne function', () => {
      expect(typeof service.getOne).toBe('function');
    });
    it('should return a movie', async () => {
      movieRepository.findOne.mockResolvedValue(movieData.id);
      const movie = await service.getOne(movieData.id);
      expect(movie).toBe(movieData.id);
    });

    it('should throw 404 error', () => {
      try {
        movieRepository.findOne.mockResolvedValue(999);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });
  });

  describe('remove', () => {
    it('should have a deleteOne function', () => {
      expect(typeof service.deleteOne).toBe('function');
    });
  });

  describe('create', () => {
    it('should have a create function', () => {
      expect(typeof service.create).toBe('function');
    });
  });
});
