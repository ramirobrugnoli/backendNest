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
var FilmSyncTask_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilmSyncTask = void 0;
const common_1 = require("@nestjs/common");
const schedule_1 = require("@nestjs/schedule");
const films_service_1 = require("../services/films.service");
let FilmSyncTask = FilmSyncTask_1 = class FilmSyncTask {
    constructor(FilmsService) {
        this.FilmsService = FilmsService;
        this.logger = new common_1.Logger(FilmSyncTask_1.name);
    }
    async onModuleInit() {
        this.logger.log('Starting film sync with app build');
        await this.loadCharacters();
        await this.syncFilms();
    }
    async handleCron() {
        await this.syncFilms();
    }
    async syncFilms() {
        this.logger.log('Running film sync');
        await this.FilmsService.syncFilms();
    }
    async loadCharacters() {
        this.logger.log('loading characters');
        await this.FilmsService.loadCharacters();
    }
};
exports.FilmSyncTask = FilmSyncTask;
__decorate([
    (0, schedule_1.Cron)(schedule_1.CronExpression.EVERY_DAY_AT_MIDNIGHT),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], FilmSyncTask.prototype, "handleCron", null);
exports.FilmSyncTask = FilmSyncTask = FilmSyncTask_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [films_service_1.FilmsService])
], FilmSyncTask);
//# sourceMappingURL=film-sync.task.js.map