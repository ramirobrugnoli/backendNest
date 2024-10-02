import { Test, TestingModule } from '@nestjs/testing';
import { FilmSyncTask } from './film-sync.task';
import { FilmsService } from '../services/films.service';

describe('FilmSyncTask', () => {
  let task: FilmSyncTask;
  let filmsService: jest.Mocked<FilmsService>;

  beforeEach(async () => {
    const mockFilmsService = {
      syncFilms: jest.fn(),
      loadCharacters: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FilmSyncTask,
        {
          provide: FilmsService,
          useValue: mockFilmsService,
        },
      ],
    }).compile();

    task = module.get<FilmSyncTask>(FilmSyncTask);
    filmsService = module.get(FilmsService);
  });

  it('should be defined', () => {
    expect(task).toBeDefined();
  });

  describe('onModuleInit', () => {
    it('should log and sync films and characters on app startup', async () => {
      await task.onModuleInit();
      expect(filmsService.loadCharacters).toHaveBeenCalled();
      expect(filmsService.syncFilms).toHaveBeenCalled();
    });
  });

  describe('handleCron', () => {
    it('should sync films at midnight', async () => {
      await task.handleCron();
      expect(filmsService.syncFilms).toHaveBeenCalled();
    });
  });

  describe('syncFilms', () => {
    it('should log and call the syncFilms method', async () => {
      await task['syncFilms']();
      expect(filmsService.syncFilms).toHaveBeenCalled();
    });
  });

  describe('loadCharacters', () => {
    it('should log and call the loadCharacters method', async () => {
      await task['loadCharacters']();
      expect(filmsService.loadCharacters).toHaveBeenCalled();
    });
  });
});
