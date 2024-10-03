import { Film } from '../entities/film.entity';
export declare class StarWarsApiService {
    private readonly apiUrl;
    getAllFilms(): Promise<Partial<Film>[]>;
    getCharacters(url: string): Promise<any>;
}
