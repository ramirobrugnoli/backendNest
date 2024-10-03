"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InitialMigration1234567890123 = void 0;
class InitialMigration1234567890123 {
    constructor() {
        this.name = 'InitialMigration1234567890123';
    }
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "email" character varying NOT NULL, "role" character varying NOT NULL DEFAULT 'user', "password" character varying NOT NULL, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "character" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "height" character varying NOT NULL, "mass" character varying NOT NULL, "hair_color" character varying NOT NULL, "skin_color" character varying NOT NULL, "eye_color" character varying NOT NULL, "birth_year" character varying NOT NULL, "gender" character varying NOT NULL, "homeworld" character varying NOT NULL, "url" character varying NOT NULL, CONSTRAINT "PK_6c4aec48c564968be15078b5d4d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "film" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "episode_id" integer NOT NULL, "opening_crawl" text NOT NULL, "director" character varying NOT NULL, "producer" character varying NOT NULL, "release_date" TIMESTAMP NOT NULL, "planets" text NOT NULL, "starships" text NOT NULL, "vehicles" text NOT NULL, "species" text NOT NULL, "url" character varying NOT NULL, "created" TIMESTAMP NOT NULL, "edited" TIMESTAMP, "created_user" bigint, "edited_user" bigint, CONSTRAINT "PK_37ec0ffe0011ccbe438a65e3c6e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "film_characters_character" ("filmId" integer NOT NULL, "characterId" integer NOT NULL, CONSTRAINT "PK_ea0b567b2b8080e2f338aa61a1f" PRIMARY KEY ("filmId", "characterId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_7304fd89b1d9e8c27252d684b1" ON "film_characters_character" ("filmId") `);
        await queryRunner.query(`CREATE INDEX "IDX_3da3400d43d55c2b1e4bf76de1" ON "film_characters_character" ("characterId") `);
        await queryRunner.query(`ALTER TABLE "film_characters_character" ADD CONSTRAINT "FK_7304fd89b1d9e8c27252d684b10" FOREIGN KEY ("filmId") REFERENCES "film"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "film_characters_character" ADD CONSTRAINT "FK_3da3400d43d55c2b1e4bf76de1c" FOREIGN KEY ("characterId") REFERENCES "character"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "film_characters_character" DROP CONSTRAINT "FK_3da3400d43d55c2b1e4bf76de1c"`);
        await queryRunner.query(`ALTER TABLE "film_characters_character" DROP CONSTRAINT "FK_7304fd89b1d9e8c27252d684b10"`);
        await queryRunner.query(`DROP INDEX "IDX_3da3400d43d55c2b1e4bf76de1"`);
        await queryRunner.query(`DROP INDEX "IDX_7304fd89b1d9e8c27252d684b1"`);
        await queryRunner.query(`DROP TABLE "film_characters_character"`);
        await queryRunner.query(`DROP TABLE "film"`);
        await queryRunner.query(`DROP TABLE "character"`);
        await queryRunner.query(`DROP TABLE "user"`);
    }
}
exports.InitialMigration1234567890123 = InitialMigration1234567890123;
//# sourceMappingURL=InitialMigration.js.map