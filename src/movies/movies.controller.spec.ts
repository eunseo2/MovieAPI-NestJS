import { Test, TestingModule } from '@nestjs/testing';
import { MoviesController } from './movies.controller';
import { MoviesService } from './movies.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Movie } from './entities/movie.entity';
import { NotFoundException } from '@nestjs/common';
import { UpdateMovieDto } from './dto/update-movie.dto';

type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;

const mockRepository = {
  find: jest.fn(),
  findOne: jest.fn(),
  save: jest.fn(),
  delete: jest.fn(),
  update: jest.fn(),
};

describe('MoviesController', () => {
  let movieRepository: MockRepository<Movie>;
  let controller: MoviesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MoviesService,
        {
          provide: getRepositoryToken(Movie),
          useValue: mockRepository,
        },
      ],
      controllers: [MoviesController],
    }).compile();

    controller = module.get<MoviesController>(MoviesController);
    movieRepository = module.get(getRepositoryToken(Movie));
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  const movieData: Movie = {
    id: 1231,
    title: 'movie3',
    year: 2020,
    genres: 'action',
  };

  describe('getAll', () => {
    it('getAll', async () => {
      movieRepository.find.mockResolvedValue(movieData);
      const movie = await controller.getAll();
      console.log(movie);
      expect(movie).toBeInstanceOf(Object);
    });
  });

  describe('search', () => {
    it('should return object ', async () => {
      movieRepository.findOne.mockResolvedValue(movieData);
      const movie = await controller.search(movieData.title);
      expect(movie.title).toBe('movie3');
    });
  });

  describe('getOne', () => {
    it('getOne', async () => {
      movieRepository.findOne.mockResolvedValue(movieData);
      const movie = await controller.getOne(movieData.id);
      expect(movie.id).toBe(1231);
    });

    it('should throw 404 error', () => {
      movieRepository.findOne.mockResolvedValue(null);
      try {
        controller.getOne(movieData.id);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });
  });

  describe('create', () => {
    it('should return object ', async () => {
      movieRepository.save.mockResolvedValue(movieData);
      const movie = await controller.create(movieData);
      expect(movie).toBeInstanceOf(Object);
    });
  });

  describe('remove', () => {
    it('shoud return id', async () => {
      movieRepository.delete.mockResolvedValue(movieData.id);
      const movie = await controller.remove(movieData.id);
      console.log(movie);
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
      const movie = await controller.patch(movieData.id, updateData);
      console.log(movie);
      expect(movie).toBeInstanceOf(Object);
    });
  });
});
