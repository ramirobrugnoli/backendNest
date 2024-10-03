import { DataSource } from 'typeorm';
import { config } from 'dotenv';

config();

const isProd = process.env.NODE_ENV === 'production';

export default new DataSource({
  type: 'postgres',
  url: isProd ? process.env.DATABASE_URL : undefined,
  host: !isProd ? process.env.DB_HOST : undefined,
  port: !isProd ? parseInt(process.env.DB_PORT, 10) : undefined,
  username: !isProd ? process.env.DB_USERNAME : undefined,
  password: !isProd ? process.env.DB_PASSWORD : undefined,
  database: !isProd ? process.env.DB_NAME : undefined,
  entities: ['dist/**/*.entity{.ts,.js}'],
  migrations: ['dist/migrations/*{.ts,.js}'],
  ssl: isProd ? { rejectUnauthorized: false } : false,
});
