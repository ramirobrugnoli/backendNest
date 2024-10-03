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
exports.AdminController = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("../services/users.service");
const auth_guard_1 = require("../../guards/auth.guard");
const super_admin_guard_1 = require("../../guards/super-admin.guard");
const constants_1 = require("../constants");
const swagger_1 = require("@nestjs/swagger");
let AdminController = class AdminController {
    constructor(usersService) {
        this.usersService = usersService;
    }
    async promoteToAdmin(id) {
        const user = await this.usersService.findOne(id);
        if (!user) {
            throw new common_1.NotFoundException(`User with ID ${id} not found`);
        }
        return this.usersService.setAdminStatus(id, constants_1.AdminStatus.ADMIN);
    }
    async removeFromAdmin(id) {
        const user = await this.usersService.findOne(id);
        if (!user) {
            throw new common_1.NotFoundException(`User with ID ${id} not found`);
        }
        return this.usersService.setAdminStatus(id, constants_1.AdminStatus.USER);
    }
};
exports.AdminController = AdminController;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Promote user to admin (Super Admin only)' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'User promoted to admin successfully',
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'User not found' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden' }),
    (0, common_1.Post)('promoteAdmin/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "promoteToAdmin", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Remove admin status from user (Super Admin only)' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Admin status removed successfully',
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'User not found' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden' }),
    (0, common_1.Post)('removeAdmin/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "removeFromAdmin", null);
exports.AdminController = AdminController = __decorate([
    (0, swagger_1.ApiTags)('admin'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Controller)('admin'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, super_admin_guard_1.SuperAdminGuard),
    __metadata("design:paramtypes", [users_service_1.UsersService])
], AdminController);
//# sourceMappingURL=admin.controller.js.map