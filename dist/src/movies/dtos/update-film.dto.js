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
exports.UpdateFilmDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
class UpdateFilmDto {
}
exports.UpdateFilmDto = UpdateFilmDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Title of the film' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateFilmDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Episode ID of the film' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], UpdateFilmDto.prototype, "episode_id", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Opening crawl text of the film' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateFilmDto.prototype, "opening_crawl", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Director of the film' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateFilmDto.prototype, "director", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Producer of the film' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateFilmDto.prototype, "producer", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Release date of the film',
        type: String,
        format: 'date-time',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDate)(),
    (0, class_transformer_1.Type)(() => Date),
    __metadata("design:type", Date)
], UpdateFilmDto.prototype, "release_date", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Character URLs', type: [String] }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], UpdateFilmDto.prototype, "characters", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Planets in the film', type: [String] }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], UpdateFilmDto.prototype, "planets", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Starships in the film', type: [String] }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], UpdateFilmDto.prototype, "starships", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Vehicles in the film', type: [String] }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], UpdateFilmDto.prototype, "vehicles", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Species in the film', type: [String] }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], UpdateFilmDto.prototype, "species", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'URL of the film' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUrl)(),
    __metadata("design:type", String)
], UpdateFilmDto.prototype, "url", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Edit date of the film',
        type: String,
        format: 'date-time',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDate)(),
    (0, class_transformer_1.Type)(() => Date),
    __metadata("design:type", Date)
], UpdateFilmDto.prototype, "edited", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'User who edited the film' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], UpdateFilmDto.prototype, "edited_user", void 0);
//# sourceMappingURL=update-film.dto.js.map