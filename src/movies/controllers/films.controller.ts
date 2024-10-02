import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'src/guards/auth.guard';
import { AdminGuard } from 'src/guards/admin.guard';
import { FilmsService } from '../services/films.service';
import { CreateFilmDto } from '../dtos/create-film.dto';
import { UpdateFilmDto } from '../dtos/update-film.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('films')
@Controller('films')
export class FilmController {
  constructor(private FilmsService: FilmsService) {}

  @ApiOperation({ summary: 'Get all movies' })
  @ApiResponse({ status: 200, description: 'Return all movies' })
  @Get()
  async getMovies() {
    return this.FilmsService.returnMovies();
  }

  // además del cron que sincroniza automaticamnete a medianoche, deje un endpoint para que los admin puedan llamar a la sinc. manualmente
  @ApiOperation({ summary: 'Synchronize films (Admin only)' })
  @ApiResponse({ status: 200, description: 'Films synchronized successfully' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiBearerAuth()
  @UseGuards(AdminGuard)
  @Post('sync')
  async syncFilms() {
    return this.FilmsService.syncFilms();
  }

  @ApiOperation({ summary: 'Get a film by episode ID' })
  @ApiResponse({ status: 200, description: 'Return a film' })
  @ApiResponse({ status: 404, description: 'Film not found' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Get('getByEpisode/:id')
  async getOneFilm(@Param('id', ParseIntPipe) id: number) {
    const film = await this.FilmsService.getOneFilm(id);
    if (!film) {
      throw new NotFoundException(`Film with episode ID ${id} not found`);
    }
    return film;
  }

  //tanto en create como en edit paso la id del usuario a través del req para llevar una auditoria en la base de datos de quién creo/edito c/pelicula
  @ApiOperation({ summary: 'Create a new film (Admin only)' })
  @ApiResponse({ status: 201, description: 'Film created successfully' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard, AdminGuard)
  @Post('create')
  async createFilm(@Body() createFilmDto: CreateFilmDto, @Req() req) {
    const userId = req.user.sub;
    return this.FilmsService.createFilm(createFilmDto, userId);
  }

  @ApiOperation({ summary: 'Update a film (Admin only)' })
  @ApiResponse({ status: 200, description: 'Film updated successfully' })
  @ApiResponse({ status: 404, description: 'Film not found' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard, AdminGuard)
  @Put(':id')
  async updateFilm(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateFilmDto: UpdateFilmDto,
    @Req() req,
  ) {
    const userId = req.user.sub;
    return this.FilmsService.updateFilm(id, updateFilmDto, userId);
  }

  @ApiOperation({ summary: 'Delete a film (Admin only)' })
  @ApiResponse({ status: 200, description: 'Film deleted successfully' })
  @ApiResponse({ status: 404, description: 'Film not found' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard, AdminGuard)
  @Delete('/deleteFilm/:id')
  async deleteFilm(@Param('id', ParseIntPipe) id: number) {
    return this.FilmsService.deleteFilm(id);
  }
}
