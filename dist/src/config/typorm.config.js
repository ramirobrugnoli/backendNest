"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const isProd = process.env.NODE_ENV === 'production';
exports.default = new typeorm_1.DataSource({
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
//# sourceMappingURL=typorm.config.js.map