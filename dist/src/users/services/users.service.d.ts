import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { AdminStatus } from '../constants';
export declare class UsersService {
    private readonly repo;
    constructor(repo: Repository<User>);
    create(email: string, password: string): Promise<User>;
    find(email: string): Promise<User[]>;
    findOne(id: number): Promise<User>;
    setAdminStatus(userId: number, isAdmin: AdminStatus): Promise<User>;
}
