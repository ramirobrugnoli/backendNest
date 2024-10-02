import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleModule } from '@nestjs/schedule';
import { Film } from './entities/film.entity';
import { Character } from './entities/character.entity';
import { StarWarsApiService } from './services/movies-api.service';
import { FilmsService } from './services/films.service';
import { FilmController } from './controllers/films.controller';
import { FilmSyncTask } from './task/film-sync.task';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forFeature([Film, Character]),
    ConfigModule,
    ScheduleModule.forRoot(),
  ],
  providers: [StarWarsApiService, FilmsService, FilmSyncTask],
  controllers: [FilmController],
})
export class FilmsModule {}
