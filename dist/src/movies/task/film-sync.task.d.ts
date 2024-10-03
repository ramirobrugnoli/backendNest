import { OnModuleInit } from '@nestjs/common';
import { FilmsService } from '../services/films.service';
export declare class FilmSyncTask implements OnModuleInit {
    private FilmsService;
    private readonly logger;
    constructor(FilmsService: FilmsService);
    onModuleInit(): Promise<void>;
    handleCron(): Promise<void>;
    private syncFilms;
    private loadCharacters;
}
