import { UsersService } from '../services/users.service';
export declare class AdminController {
    private readonly usersService;
    constructor(usersService: UsersService);
    promoteToAdmin(id: number): Promise<import("../entities/user.entity").User>;
    removeFromAdmin(id: number): Promise<import("../entities/user.entity").User>;
}
