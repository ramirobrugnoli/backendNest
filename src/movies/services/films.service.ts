import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Film } from '../entities/film.entity';
import { Character } from '../entities/character.entity';
import { StarWarsApiService } from './movies-api.service';

@Injectable()
export class FilmsService {
  private readonly logger = new Logger(FilmsService.name);

  constructor(
    @InjectRepository(Film)
    private filmRepository: Repository<Film>,
    @InjectRepository(Character)
    private characterRepository: Repository<Character>,
    private starWarsApiService: StarWarsApiService,
  ) {}

  async returnMovies() {
    const films = await this.filmRepository.find({
      relations: ['characters'],
      order: { episode_id: 'ASC' },
    });
    return films;
  }

  async loadCharacters() {
    this.logger.log('Starting characters loading');
    let nextUrl = 'https://swapi.dev/api/people/';
    let totalLoaded = 0;
    let totalUpdated = 0;

    while (nextUrl) {
      const { results, next } =
        await this.starWarsApiService.getCharacters(nextUrl);

      for (const characterData of results) {
        let character = await this.characterRepository.findOne({
          where: { url: characterData.url },
        });

        if (character) {
          this.characterRepository.merge(character, {
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
          totalUpdated++;
        } else {
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

    this.logger.log(
      `Loaded ${totalLoaded} new characters and updated ${totalUpdated} existing characters.`,
    );
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
        film = new Film({
          ...filmData,
          release_date: new Date(filmData.release_date),
          created: new Date(filmData.created),
          edited: new Date(filmData.edited),
        });
      }
      const characters = await this.characterRepository.findBy({
        url: In(filmData.characters),
      });
      film.characters = characters;

      await this.filmRepository.save(film);
      this.logger.log(`Synced film: ${film.title}`);
      syncedCount++;
    }

    this.logger.log(
      `Film synchronization completed. Synced ${syncedCount} films.`,
    );
    return { message: `Synchronized ${syncedCount} films successfully.` };
  }
}
