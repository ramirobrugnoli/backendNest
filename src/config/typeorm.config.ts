import { DataSource, DataSourceOptions } from 'typeorm';
import { config } from 'dotenv';

config();

const isProd = process.env.NODE_ENV === 'production';

const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  ...(isProd
    ? { url: process.env.DATABASE_URL }
    : {
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT, 10),
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
      }),
  entities: ['dist/**/*.entity.js'],
  migrations: ['dist/migrations/*.js'],
  ssl: isProd ? { rejectUnauthorized: false } : false,
  synchronize: false,
  logging: !isProd,
};

export default new DataSource(dataSourceOptions);
