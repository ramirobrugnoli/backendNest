import { Test, TestingModule } from '@nestjs/testing';
import { FilmsService } from '../services/films.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Film } from '../entities/film.entity';
import { Character } from '../entities/character.entity';
import { StarWarsApiService } from '../services/movies-api.service';
import { Repository } from 'typeorm';
import { BadRequestException } from '@nestjs/common';
import { CreateFilmDto } from '../dtos/create-film.dto';
import { NotFoundException } from '@nestjs/common';
import { UpdateFilmDto } from '../dtos/update-film.dto';

describe('FilmsService', () => {
  let service: FilmsService;
  let filmRepository: jest.Mocked<Repository<Film>>;
  let characterRepository: jest.Mocked<Repository<Character>>;
  let starWarsApiService: jest.Mocked<StarWarsApiService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FilmsService,
        {
          provide: getRepositoryToken(Film),
          useValue: {
            find: jest.fn(),
            findOne: jest.fn(),
            create: jest.fn(),
            save: jest.fn(),
            delete: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(Character),
          useValue: {
            find: jest.fn(),
            findOne: jest.fn(),
            create: jest.fn(),
            save: jest.fn(),
          },
        },
        {
          provide: StarWarsApiService,
          useValue: {
            getAllFilms: jest.fn(),
            getCharacters: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<FilmsService>(FilmsService);
    filmRepository = module.get(getRepositoryToken(Film));
    characterRepository = module.get(getRepositoryToken(Character));
    starWarsApiService = module.get(StarWarsApiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('returnMovies', () => {
    it('should return all movies', async () => {
      const mockFilms: Film[] = [
        new Film({
          id: 1,
          title: 'Test Film',
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
        }),
      ];
      filmRepository.find.mockResolvedValue(mockFilms);

      const result = await service.returnMovies();
      expect(result).toEqual(mockFilms);
      expect(filmRepository.find).toHaveBeenCalledWith({
        relations: ['characters'],
        order: { episode_id: 'ASC' },
      });
    });
  });

  describe('getOneFilm', () => {
    it('should return a film if it exists', async () => {
      const mockFilm = new Film({
        id: 1,
        title: 'Test Film',
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
      });
      filmRepository.findOne.mockResolvedValue(mockFilm);

      const result = await service.getOneFilm(1);
      expect(result).toEqual(mockFilm);
      expect(filmRepository.findOne).toHaveBeenCalledWith({
        where: { episode_id: 1 },
        relations: ['characters'],
      });
    });

    it('should return null if film does not exist', async () => {
      filmRepository.findOne.mockResolvedValue(null);

      const result = await service.getOneFilm(1);
      expect(result).toBeNull();
    });
  });

  describe('createFilm', () => {
    it('should create a new film', async () => {
      const createFilmDto: CreateFilmDto = {
        title: 'New Film',
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
      const mockFilm = new Film({
        id: 1,
        ...createFilmDto,
        characters: [],
        created: new Date(),
        edited: new Date(),
        created_user: 1,
        edited_user: 1,
      });
      filmRepository.findOne.mockResolvedValue(null);
      filmRepository.create.mockReturnValue(mockFilm);
      filmRepository.save.mockResolvedValue(mockFilm);

      const result = await service.createFilm(createFilmDto, 1);
      expect(result).toEqual(mockFilm);
    });

    it('should throw BadRequestException if film already exists', async () => {
      const createFilmDto: CreateFilmDto = {
        title: 'New Film',
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
      filmRepository.findOne.mockResolvedValue(new Film({}));

      await expect(service.createFilm(createFilmDto, 1)).rejects.toThrow(
        BadRequestException,
      );
    });
  });

  describe('loadCharacters', () => {
    it('should load characters if none exist', async () => {
      characterRepository.find.mockResolvedValue([]);
      starWarsApiService.getCharacters.mockResolvedValue({
        results: [{ name: 'Luke', url: 'http://example.com' }],
        next: null,
      });
      characterRepository.findOne.mockResolvedValue(null);
      characterRepository.create.mockReturnValue(
        new Character({
          name: 'Luke',
          url: 'http://example.com',
          height: '172',
          mass: '77',
          hair_color: 'blond',
          skin_color: 'fair',
          eye_color: 'blue',
          birth_year: '19BBY',
          gender: 'male',
          homeworld: 'http://example.com/planet/1',
        }),
      );

      await service.loadCharacters();

      expect(characterRepository.save).toHaveBeenCalled();
    });

    it('not load anything if characters exist', async () => {
      characterRepository.find.mockResolvedValue([
        {
          id: 1,
          name: 'Luke',
          url: 'http://example.com',
          height: '172',
          mass: '77',
          hair_color: 'blond',
          skin_color: 'fair',
          eye_color: 'blue',
          birth_year: '19BBY',
          gender: 'male',
          homeworld: 'http://example.com/planet/1',
        },
      ]);

      await service.loadCharacters();

      expect(characterRepository.save).not.toHaveBeenCalled();
    });
  });

  describe('updateFilm', () => {
    it('should update a single film', async () => {
      const updateFilmDto: UpdateFilmDto = { title: 'Updated Film' };

      const mockFilm = new Film({
        id: 1,
        title: 'Test Film',
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
      });

      filmRepository.findOne.mockResolvedValue(mockFilm);
      filmRepository.save.mockResolvedValue({
        ...mockFilm,
        title: 'Updated Film',
      });

      const result = await service.updateFilm(1, updateFilmDto, 1);
      expect(result).toEqual({ ...mockFilm, title: 'Updated Film' });
      expect(filmRepository.findOne).toHaveBeenCalledWith({
        where: { episode_id: 1 },
      });
      expect(filmRepository.save).toHaveBeenCalledWith(
        expect.objectContaining({ title: 'Updated Film' }),
      );
    });
  });

  describe('updateMovies', () => {
    it('should throw NotFoundException if a film does not exist', async () => {
      const updateFilmDtos: UpdateFilmDto[] = [
        { episode_id: 1, title: 'Updated Film 1' },
      ];

      filmRepository.findOne.mockResolvedValueOnce(null);

      await expect(service.updateFilm(1, updateFilmDtos[0], 1)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('deleteFilm', () => {
    it('should throw BadRequestException if film does not exist', async () => {
      filmRepository.findOne.mockResolvedValue(null); // Film does not exist

      await expect(service.deleteFilm(1)).rejects.toThrow(BadRequestException);
    });

    it('should delete a film successfully', async () => {
      const result = 'Film 1 deleted correctly!';
      filmRepository.findOne.mockResolvedValue(new Film({ id: 1 })); // Film exists
      filmRepository.delete.mockResolvedValue(undefined);

      const response = await service.deleteFilm(1);
      expect(response).toBe(result);
    });
  });

  describe('syncFilms', () => {
    it('should handle no films returned from API', async () => {
      starWarsApiService.getAllFilms.mockResolvedValue([]);

      const result = await service.syncFilms();
      expect(result).toEqual({ message: 'Synchronized 0 films successfully.' });
    });
  });
});
