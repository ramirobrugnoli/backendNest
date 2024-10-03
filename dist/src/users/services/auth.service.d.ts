import { UsersService } from './users.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '../entities/user.entity';
export declare class AuthService {
    private readonly usersService;
    private readonly jwtService;
    constructor(usersService: UsersService, jwtService: JwtService);
    signup(email: string, password: string): Promise<Partial<User>>;
    signin(email: string, password: string): Promise<{
        access_token: string;
    }>;
}
