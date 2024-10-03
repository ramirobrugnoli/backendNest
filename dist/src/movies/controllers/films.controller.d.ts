import { FilmsService } from '../services/films.service';
import { CreateFilmDto } from '../dtos/create-film.dto';
import { UpdateFilmDto } from '../dtos/update-film.dto';
export declare class FilmController {
    private FilmsService;
    constructor(FilmsService: FilmsService);
    getMovies(): Promise<import("../entities/film.entity").Film[]>;
    syncFilms(): Promise<{
        message: string;
    }>;
    getOneFilm(id: number): Promise<import("../entities/film.entity").Film>;
    createFilm(createFilmDto: CreateFilmDto, req: any): Promise<import("../entities/film.entity").Film>;
    updateFilm(id: number, updateFilmDto: UpdateFilmDto, req: any): Promise<import("../entities/film.entity").Film>;
    deleteFilm(id: number): Promise<string>;
}
