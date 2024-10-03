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
exports.CreateFilmDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
class CreateFilmDto {
}
exports.CreateFilmDto = CreateFilmDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Title of the film' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateFilmDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Episode ID of the film' }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateFilmDto.prototype, "episode_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Opening crawl text of the film' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateFilmDto.prototype, "opening_crawl", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Director of the film' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateFilmDto.prototype, "director", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Producer of the film' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateFilmDto.prototype, "producer", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Release date of the film',
        type: String,
        format: 'date-time',
    }),
    (0, class_validator_1.IsDate)(),
    (0, class_transformer_1.Type)(() => Date),
    __metadata("design:type", Date)
], CreateFilmDto.prototype, "release_date", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Character URLs', type: [String] }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], CreateFilmDto.prototype, "character_urls", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Planets in the film', type: [String] }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], CreateFilmDto.prototype, "planets", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Starships in the film', type: [String] }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], CreateFilmDto.prototype, "starships", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Vehicles in the film', type: [String] }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], CreateFilmDto.prototype, "vehicles", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Species in the film', type: [String] }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], CreateFilmDto.prototype, "species", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'URL of the film' }),
    (0, class_validator_1.IsUrl)(),
    __metadata("design:type", String)
], CreateFilmDto.prototype, "url", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Creation date of the film',
        type: String,
        format: 'date-time',
    }),
    (0, class_validator_1.IsDate)(),
    (0, class_transformer_1.Type)(() => Date),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Date)
], CreateFilmDto.prototype, "created", void 0);
//# sourceMappingURL=create-film.dto.js.map