import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Film } from '../entities/film.entity';
import { Character } from '../entities/character.entity';
import { StarWarsApiService } from './movies-api.service';
import { CreateFilmDto } from '../dtos/create-film.dto';
import { UpdateFilmDto } from '../dtos/update-film.dto';

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

  async getOneFilm(episode_id: number) {
    const film = await this.filmRepository.findOne({
      where: { episode_id },
      relations: ['characters'],
    });

    if (!film) {
      return null;
    }

    return film;
  }

  async createFilm(createFilmDto: CreateFilmDto, userId: number) {
    this.logger.log(
      `Creating film with episode id: ${createFilmDto.episode_id}`,
    );
    const { episode_id, character_urls, ...filmData } = createFilmDto;
    try {
      const checkPreviousFilms = await this.filmRepository.findOne({
        where: { episode_id },
      });

      if (checkPreviousFilms) {
        throw new BadRequestException(
          `Film with episode id ${episode_id} already exists!`,
        );
      }

      const now = new Date();
      const film = this.filmRepository.create({
        ...filmData,
        episode_id,
        created: now,
        created_user: userId,
      });

      // ya q decidi hacer la relacion characters -> films, a la hora de crear obtengo los Charater{} por el id que dio el usuario y ya establezco la relación
      if (character_urls && character_urls.length > 0) {
        const characters = await this.characterRepository.find({
          where: { url: In(character_urls) },
        });
        film.characters = characters;
      }

      const savedFilm = await this.filmRepository.save(film);
      this.logger.log(`Successfully created film: ${savedFilm.title}`);
      return savedFilm;
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      this.logger.error('Error creating film:', error.stack);
      throw new InternalServerErrorException('Error creating film');
    }
  }

  async updateFilm(
    episode_id: number,
    updateFilmDto: UpdateFilmDto,
    userId: number,
  ) {
    const film = await this.filmRepository.findOne({ where: { episode_id } });
    if (!film) {
      throw new NotFoundException(`Film with ID ${episode_id} not found`);
    }

    updateFilmDto.edited_user = userId;
    Object.assign(film, updateFilmDto);

    return this.filmRepository.save(film);
  }

  async deleteFilm(episode_id: number) {
    const checkPreviousFilms = await this.filmRepository.findOne({
      where: { episode_id },
    });

    if (!checkPreviousFilms) {
      throw new BadRequestException(`Film with id  ${episode_id} nto found!`);
    }

    await this.filmRepository.delete({ episode_id });

    return `Film ${episode_id} deleted correctly!`;
  }

  async loadCharacters() {
    const charactersArray = await this.characterRepository.find();
    // como characters no debe mantenerse "sincronizado" ya que la app no expone endpoints para modificarlos, realizamos solo una carga inicial, y si ya están cargados salteamos este paso para agilizar el tiempo de build de la app
    if (charactersArray.length > 0) {
      this.logger.log('Characters are already loaded on db!');
      return;
    }

    this.logger.log('Starting characters loading');
    let nextUrl = 'https://swapi.dev/api/people/';
    let totalLoaded = 0;

    while (nextUrl) {
      const { results, next } =
        await this.starWarsApiService.getCharacters(nextUrl);

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
