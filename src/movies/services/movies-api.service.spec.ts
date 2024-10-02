import { Test, TestingModule } from '@nestjs/testing';
import { StarWarsApiService } from './movies-api.service';
import axios from 'axios';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('StarWarsApiService', () => {
  let service: StarWarsApiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StarWarsApiService],
    }).compile();

    service = module.get<StarWarsApiService>(StarWarsApiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAllFilms', () => {
    it('should return all films', async () => {
      const mockFilms = [{ title: 'A New Hope', episode_id: 4 }];
      mockedAxios.get.mockResolvedValue({ data: { results: mockFilms } });

      const result = await service.getAllFilms();
      expect(result).toEqual(mockFilms);
      expect(mockedAxios.get).toHaveBeenCalledWith(
        'https://swapi.dev/api/films/',
      );
    });
  });

  describe('getCharacters', () => {
    it('should return characters data', async () => {
      const mockCharacters = {
        results: [{ name: 'Luke Skywalker' }],
        next: null,
      };
      mockedAxios.get.mockResolvedValue({ data: mockCharacters });

      const url = 'https://swapi.dev/api/people/';
      const result = await service.getCharacters(url);
      expect(result).toEqual(mockCharacters);
      expect(mockedAxios.get).toHaveBeenCalledWith(url);
    });
  });
});
