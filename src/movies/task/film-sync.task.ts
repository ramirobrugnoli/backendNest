import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { FilmsService } from '../services/films.service';

@Injectable()
export class FilmSyncTask implements OnModuleInit {
  private readonly logger = new Logger(FilmSyncTask.name);

  constructor(private FilmsService: FilmsService) {}

  // agregue esta funcion para q cuando se levante la app corra la primer sync y ya se llene la db independientemente del horario
  async onModuleInit() {
    this.logger.log('Starting film sync with app build');
    //aca agregue los characters tmb para armar una relación y que cuando se pida una pelicula se arme la relación con la tabla de characters y devuelva el objeto en lugar del link
    await this.loadCharacters();
    await this.syncFilms();
  }

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async handleCron() {
    await this.syncFilms();
  }

  private async syncFilms() {
    this.logger.log('Running film sync');
    await this.FilmsService.syncFilms();
  }

  private async loadCharacters() {
    this.logger.log('loading characters');
    await this.FilmsService.loadCharacters();
  }
}
