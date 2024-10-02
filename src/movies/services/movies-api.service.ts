import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { Film } from '../entities/film.entity';

@Injectable()
export class StarWarsApiService {
  private readonly apiUrl = 'https://swapi.dev/api';

  async getAllFilms(): Promise<Partial<Film>[]> {
    const response = await axios.get(`${this.apiUrl}/films/`);
    return response.data.results;
  }

  async getCharacters(url: string) {
    const response = await axios.get(url);
    return response.data;
  }
}
