"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Film = void 0;
const typeorm_1 = require("typeorm");
const character_entity_1 = require("./character.entity");
let Film = class Film {
    constructor(partial) {
        Object.assign(this, partial);
    }
};
exports.Film = Film;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Film.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Film.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Film.prototype, "episode_id", void 0);
__decorate([
    (0, typeorm_1.Column)('text'),
    __metadata("design:type", String)
], Film.prototype, "opening_crawl", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Film.prototype, "director", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Film.prototype, "producer", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Date)
], Film.prototype, "release_date", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => character_entity_1.Character),
    (0, typeorm_1.JoinTable)(),
    __metadata("design:type", Array)
], Film.prototype, "characters", void 0);
__decorate([
    (0, typeorm_1.Column)('simple-array'),
    __metadata("design:type", Array)
], Film.prototype, "planets", void 0);
__decorate([
    (0, typeorm_1.Column)('simple-array'),
    __metadata("design:type", Array)
], Film.prototype, "starships", void 0);
__decorate([
    (0, typeorm_1.Column)('simple-array'),
    __metadata("design:type", Array)
], Film.prototype, "vehicles", void 0);
__decorate([
    (0, typeorm_1.Column)('simple-array'),
    __metadata("design:type", Array)
], Film.prototype, "species", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Film.prototype, "url", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Date)
], Film.prototype, "created", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Date)
], Film.prototype, "edited", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, type: 'bigint' }),
    __metadata("design:type", Number)
], Film.prototype, "created_user", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, type: 'bigint' }),
    __metadata("design:type", Number)
], Film.prototype, "edited_user", void 0);
exports.Film = Film = __decorate([
    (0, typeorm_1.Entity)(),
    __metadata("design:paramtypes", [Object])
], Film);
//# sourceMappingURL=film.entity.js.map