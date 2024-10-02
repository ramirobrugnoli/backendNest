import { Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/guards/auth.guard';
import { AdminGuard } from 'src/guards/admin.guard';
import { FilmsService } from '../services/films.service';

@Controller('films')
export class FilmController {
  constructor(private FilmsService: FilmsService) {}

  @Get()
  async getMovies() {
    return this.FilmsService.returnMovies();
  }

  // además del cron que sincroniza automaticamnete a medianoche, deje un endpoint para que los admin puedan llamar a la sinc. manualmente
  @UseGuards(AdminGuard)
  @Post('sync')
  async syncFilms() {
    return this.FilmsService.syncFilms();
  }
}
