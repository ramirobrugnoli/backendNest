import { DataSource } from 'typeorm';
import { User } from './src/users/entities/user.entity';
import { Film } from './src/movies/entities/film.entity';
import { Character } from './src/movies/entities/character.entity';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [User, Film, Character],
  synchronize: false,
  migrations: [],
  subscribers: [],
});
