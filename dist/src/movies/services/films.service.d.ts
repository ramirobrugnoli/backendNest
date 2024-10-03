import { Repository } from 'typeorm';
import { Film } from '../entities/film.entity';
import { Character } from '../entities/character.entity';
import { StarWarsApiService } from './movies-api.service';
import { CreateFilmDto } from '../dtos/create-film.dto';
import { UpdateFilmDto } from '../dtos/update-film.dto';
export declare class FilmsService {
    private filmRepository;
    private characterRepository;
    private starWarsApiService;
    private readonly logger;
    constructor(filmRepository: Repository<Film>, characterRepository: Repository<Character>, starWarsApiService: StarWarsApiService);
    returnMovies(): Promise<Film[]>;
    getOneFilm(episode_id: number): Promise<Film>;
    createFilm(createFilmDto: CreateFilmDto, userId: number): Promise<Film>;
    updateFilm(episode_id: number, updateFilmDto: UpdateFilmDto, userId: number): Promise<Film>;
    deleteFilm(episode_id: number): Promise<string>;
    loadCharacters(): Promise<void>;
    syncFilms(): Promise<{
        message: string;
    }>;
}
