import { AuthService } from '../services/auth.service';
import { CreateUserDto } from '../dtos/create-user.dto';
import { SignUserDto } from '../dtos/sign-user.dto';
import { Request } from 'express';
export declare class UsersController {
    private readonly authService;
    constructor(authService: AuthService);
    createUser(body: CreateUserDto): Promise<Partial<import("../entities/user.entity").User>>;
    signin(body: SignUserDto): Promise<{
        access_token: string;
    }>;
    getProfile(req: Request): any;
}
