"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const isProd = process.env.NODE_ENV === 'production';
const dataSourceOptions = {
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
exports.default = new typeorm_1.DataSource(dataSourceOptions);
//# sourceMappingURL=typeorm.config.js.map