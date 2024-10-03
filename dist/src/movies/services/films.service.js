"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var FilmsService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilmsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const film_entity_1 = require("../entities/film.entity");
const character_entity_1 = require("../entities/character.entity");
const movies_api_service_1 = require("./movies-api.service");
let FilmsService = FilmsService_1 = class FilmsService {
    constructor(filmRepository, characterRepository, starWarsApiService) {
        this.filmRepository = filmRepository;
        this.characterRepository = characterRepository;
        this.starWarsApiService = starWarsApiService;
        this.logger = new common_1.Logger(FilmsService_1.name);
    }
    async returnMovies() {
        const films = await this.filmRepository.find({
            relations: ['characters'],
            order: { episode_id: 'ASC' },
        });
        return films;
    }
    async getOneFilm(episode_id) {
        const film = await this.filmRepository.findOne({
            where: { episode_id },
            relations: ['characters'],
        });
        if (!film) {
            return null;
        }
        return film;
    }
    async createFilm(createFilmDto, userId) {
        this.logger.log(`Creating film with episode id: ${createFilmDto.episode_id}`);
        const { episode_id, character_urls, ...filmData } = createFilmDto;
        try {
            const checkPreviousFilms = await this.filmRepository.findOne({
                where: { episode_id },
            });
            if (checkPreviousFilms) {
                throw new common_1.BadRequestException(`Film with episode id ${episode_id} already exists!`);
            }
            const now = new Date();
            const film = this.filmRepository.create({
                ...filmData,
                episode_id,
                created: now,
                created_user: userId,
            });
            if (character_urls && character_urls.length > 0) {
                const characters = await this.characterRepository.find({
                    where: { url: (0, typeorm_2.In)(character_urls) },
                });
                film.characters = characters;
            }
            const savedFilm = await this.filmRepository.save(film);
            this.logger.log(`Successfully created film: ${savedFilm.title}`);
            return savedFilm;
        }
        catch (error) {
            if (error instanceof common_1.BadRequestException) {
                throw error;
            }
            this.logger.error('Error creating film:', error.stack);
            throw new common_1.InternalServerErrorException('Error creating film');
        }
    }
    async updateFilm(episode_id, updateFilmDto, userId) {
        const film = await this.filmRepository.findOne({ where: { episode_id } });
        if (!film) {
            throw new common_1.NotFoundException(`Film with ID ${episode_id} not found`);
        }
        updateFilmDto.edited_user = userId;
        Object.assign(film, updateFilmDto);
        return this.filmRepository.save(film);
    }
    async deleteFilm(episode_id) {
        const checkPreviousFilms = await this.filmRepository.findOne({
            where: { episode_id },
        });
        if (!checkPreviousFilms) {
            throw new common_1.BadRequestException(`Film with id  ${episode_id} nto found!`);
        }
        await this.filmRepository.delete({ episode_id });
        return `Film ${episode_id} deleted correctly!`;
    }
    async loadCharacters() {
        const charactersArray = await this.characterRepository.find();
        if (charactersArray.length > 0) {
            this.logger.log('Characters are already loaded on db!');
            return;
        }
        this.logger.log('Starting characters loading');
        let nextUrl = 'https://swapi.dev/api/people/';
        let totalLoaded = 0;
        while (nextUrl) {
            const { results, next } = await this.starWarsApiService.getCharacters(nextUrl);
            for (const characterData of results) {
                let character = await this.characterRepository.findOne({
                    where: { url: characterData.url },
                });
                if (!character) {
                    character = this.characterRepository.create({
                        name: characterData.name,
                        height: characterData.height,
                        mass: characterData.mass,
                        hair_color: characterData.hair_color,
                        skin_color: characterData.skin_color,
                        eye_color: characterData.eye_color,
                        birth_year: characterData.birth_year,
                        gender: characterData.gender,
                        homeworld: characterData.homeworld,
                        url: characterData.url,
                    });
                    await this.characterRepository.save(character);
                    totalLoaded++;
                }
            }
            nextUrl = next;
        }
        this.logger.log(`Loaded ${totalLoaded} new characters.`);
    }
    async syncFilms() {
        this.logger.log('Starting film synchronization');
        const filmsData = await this.starWarsApiService.getAllFilms();
        let syncedCount = 0;
        for (const filmData of filmsData) {
            let film = await this.filmRepository.findOne({
                where: { episode_id: filmData.episode_id },
                relations: ['characters'],
            });
            if (!film) {
                film = new film_entity_1.Film({
                    ...filmData,
                    release_date: new Date(filmData.release_date),
                    created: new Date(filmData.created),
                    edited: new Date(filmData.edited),
                });
            }
            const characters = await this.characterRepository.findBy({
                url: (0, typeorm_2.In)(filmData.characters),
            });
            film.characters = characters;
            await this.filmRepository.save(film);
            this.logger.log(`Synced film: ${film.title}`);
            syncedCount++;
        }
        this.logger.log(`Film synchronization completed. Synced ${syncedCount} films.`);
        return { message: `Synchronized ${syncedCount} films successfully.` };
    }
};
exports.FilmsService = FilmsService;
exports.FilmsService = FilmsService = FilmsService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(film_entity_1.Film)),
    __param(1, (0, typeorm_1.InjectRepository)(character_entity_1.Character)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        movies_api_service_1.StarWarsApiService])
], FilmsService);
//# sourceMappingURL=films.service.js.map