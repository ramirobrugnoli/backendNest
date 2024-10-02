import { Test, TestingModule } from '@nestjs/testing';
import { FilmController } from './films.controller';
import { FilmsService } from '../services/films.service';
import { CreateFilmDto } from '../dtos/create-film.dto';
import { UpdateFilmDto } from '../dtos/update-film.dto';
import { NotFoundException } from '@nestjs/common';
import { Film } from '../entities/film.entity';
import { AuthGuard } from '../../guards/auth.guard';
import { AdminGuard } from '../../guards/admin.guard';

describe('FilmController', () => {
  let controller: FilmController;
  let filmsService: jest.Mocked<FilmsService>;

  beforeEach(async () => {
    const mockFilmsService = {
      returnMovies: jest.fn(),
      syncFilms: jest.fn(),
      getOneFilm: jest.fn(),
      createFilm: jest.fn(),
      updateFilm: jest.fn(),
      deleteFilm: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [FilmController],
      providers: [
        {
          provide: FilmsService,
          useValue: mockFilmsService,
        },
      ],
    })
      .overrideGuard(AuthGuard)
      .useValue({ canActivate: () => true })
      .overrideGuard(AdminGuard)
      .useValue({ canActivate: () => true })
      .compile();

    controller = module.get<FilmController>(FilmController);
    filmsService = module.get(FilmsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getMovies', () => {
    it('should return all movies', async () => {
      const result: Partial<Film>[] = [
        {
          id: 1,
          title: 'Test Movie',
          episode_id: 1,
          opening_crawl: 'Test crawl',
          director: 'Test Director',
          producer: 'Test Producer',
          release_date: new Date(),
          characters: [],
          planets: [],
          starships: [],
          vehicles: [],
          species: [],
          url: 'http://test.com',
          created: new Date(),
          edited: new Date(),
          created_user: 1,
          edited_user: 1,
        },
      ];
      filmsService.returnMovies.mockResolvedValue(result as Film[]);

      expect(await controller.getMovies()).toBe(result);
    });
  });

  describe('syncFilms', () => {
    it('should sync films', async () => {
      const result = { message: 'Films synced successfully' };
      filmsService.syncFilms.mockResolvedValue(result);

      expect(await controller.syncFilms()).toBe(result);
    });
  });

  describe('getOneFilm', () => {
    it('should return a film if it exists', async () => {
      const film: Partial<Film> = {
        id: 1,
        title: 'Test Movie',
        episode_id: 1,
        opening_crawl: 'Test crawl',
        director: 'Test Director',
        producer: 'Test Producer',
        release_date: new Date(),
        characters: [],
        planets: [],
        starships: [],
        vehicles: [],
        species: [],
        url: 'http://test.com',
        created: new Date(),
        edited: new Date(),
        created_user: 1,
        edited_user: 1,
      };
      filmsService.getOneFilm.mockResolvedValue(film as Film);

      expect(await controller.getOneFilm(1)).toBe(film);
    });

    it('should throw NotFoundException if film does not exist', async () => {
      filmsService.getOneFilm.mockResolvedValue(null);

      await expect(controller.getOneFilm(1)).rejects.toThrow(NotFoundException);
    });
  });

  describe('createFilm', () => {
    it('should create a new film', async () => {
      const createFilmDto: CreateFilmDto = {
        title: 'New Movie',
        episode_id: 1,
        opening_crawl: 'New crawl',
        director: 'New Director',
        producer: 'New Producer',
        release_date: new Date(),
        character_urls: [],
        planets: [],
        starships: [],
        vehicles: [],
        species: [],
        url: 'http://new.com',
      };
      const createdFilm: Partial<Film> = {
        id: 1,
        ...createFilmDto,
        characters: [],
        created: new Date(),
        edited: new Date(),
        created_user: 1,
        edited_user: 1,
      };
      filmsService.createFilm.mockResolvedValue(createdFilm as Film);

      const req = { user: { sub: 1 } };
      expect(await controller.createFilm(createFilmDto, req)).toBe(createdFilm);
      expect(filmsService.createFilm).toHaveBeenCalledWith(createFilmDto, 1);
    });
  });

  describe('updateFilm', () => {
    it('should update a film', async () => {
      const updateFilmDto: UpdateFilmDto = { title: 'Updated Movie' };
      const updatedFilm: Partial<Film> = {
        id: 1,
        ...updateFilmDto,
        episode_id: 1,
        opening_crawl: 'Updated crawl',
        director: 'Updated Director',
        producer: 'Updated Producer',
        release_date: new Date(),
        characters: [],
        planets: [],
        starships: [],
        vehicles: [],
        species: [],
        url: 'http://updated.com',
        created: new Date(),
        edited: new Date(),
        created_user: 1,
        edited_user: 1,
      };
      filmsService.updateFilm.mockResolvedValue(updatedFilm as Film);

      const req = { user: { sub: 1 } };
      expect(await controller.updateFilm(1, updateFilmDto, req)).toBe(
        updatedFilm,
      );
      expect(filmsService.updateFilm).toHaveBeenCalledWith(1, updateFilmDto, 1);
    });
  });

  describe('deleteFilm', () => {
    it('should delete a film', async () => {
      const result = 'Film 1 deleted correctly!';
      filmsService.deleteFilm.mockResolvedValue(result);

      expect(await controller.deleteFilm(1)).toBe(result);
      expect(filmsService.deleteFilm).toHaveBeenCalledWith(1);
    });
  });
});
