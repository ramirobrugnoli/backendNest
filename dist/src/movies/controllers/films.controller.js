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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilmController = void 0;
const common_1 = require("@nestjs/common");
const auth_guard_1 = require("../../guards/auth.guard");
const admin_guard_1 = require("../../guards/admin.guard");
const films_service_1 = require("../services/films.service");
const create_film_dto_1 = require("../dtos/create-film.dto");
const update_film_dto_1 = require("../dtos/update-film.dto");
const swagger_1 = require("@nestjs/swagger");
let FilmController = class FilmController {
    constructor(FilmsService) {
        this.FilmsService = FilmsService;
    }
    async getMovies() {
        return this.FilmsService.returnMovies();
    }
    async syncFilms() {
        return this.FilmsService.syncFilms();
    }
    async getOneFilm(id) {
        const film = await this.FilmsService.getOneFilm(id);
        if (!film) {
            throw new common_1.NotFoundException(`Film with episode ID ${id} not found`);
        }
        return film;
    }
    async createFilm(createFilmDto, req) {
        const userId = req.user.sub;
        return this.FilmsService.createFilm(createFilmDto, userId);
    }
    async updateFilm(id, updateFilmDto, req) {
        const userId = req.user.sub;
        return this.FilmsService.updateFilm(id, updateFilmDto, userId);
    }
    async deleteFilm(id) {
        return this.FilmsService.deleteFilm(id);
    }
};
exports.FilmController = FilmController;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get all movies' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Return all movies' }),
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], FilmController.prototype, "getMovies", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Synchronize films (Admin only)' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Films synchronized successfully' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden' }),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(admin_guard_1.AdminGuard),
    (0, common_1.Post)('sync'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], FilmController.prototype, "syncFilms", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get a film by episode ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Return a film' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Film not found' }),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Get)('getByEpisode/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], FilmController.prototype, "getOneFilm", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Create a new film (Admin only)' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Film created successfully' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Bad Request' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden' }),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, admin_guard_1.AdminGuard),
    (0, common_1.Post)('create'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_film_dto_1.CreateFilmDto, Object]),
    __metadata("design:returntype", Promise)
], FilmController.prototype, "createFilm", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Update a film (Admin only)' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Film updated successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Film not found' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden' }),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, admin_guard_1.AdminGuard),
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_film_dto_1.UpdateFilmDto, Object]),
    __metadata("design:returntype", Promise)
], FilmController.prototype, "updateFilm", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Delete a film (Admin only)' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Film deleted successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Film not found' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden' }),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, admin_guard_1.AdminGuard),
    (0, common_1.Delete)('/deleteFilm/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], FilmController.prototype, "deleteFilm", null);
exports.FilmController = FilmController = __decorate([
    (0, swagger_1.ApiTags)('films'),
    (0, common_1.Controller)('films'),
    __metadata("design:paramtypes", [films_service_1.FilmsService])
], FilmController);
//# sourceMappingURL=films.controller.js.map