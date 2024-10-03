"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("./src/users/entities/user.entity");
const film_entity_1 = require("./src/movies/entities/film.entity");
const character_entity_1 = require("./src/movies/entities/character.entity");
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const isProd = process.env.NODE_ENV === 'production';
exports.AppDataSource = new typeorm_1.DataSource({
    type: 'postgres',
    url: isProd ? process.env.DATABASE_URL : undefined,
    host: !isProd ? process.env.DB_HOST : undefined,
    port: !isProd ? +process.env.DB_PORT : undefined,
    username: !isProd ? process.env.DB_USERNAME : undefined,
    password: !isProd ? process.env.DB_PASSWORD : undefined,
    database: !isProd ? process.env.DB_NAME : undefined,
    ssl: isProd ? { rejectUnauthorized: false } : false,
    entities: [user_entity_1.User, film_entity_1.Film, character_entity_1.Character],
    synchronize: false,
    migrations: ['src/migrations/*.ts'],
    migrationsRun: isProd,
    logging: !isProd,
});
//# sourceMappingURL=ormconfig.js.map