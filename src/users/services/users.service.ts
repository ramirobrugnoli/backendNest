import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { AdminStatus } from '../constants';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly repo: Repository<User>,
  ) {}

  async create(email: string, password: string): Promise<User> {
    try {
      const user = this.repo.create({ email, password });
      return await this.repo.save(user);
    } catch (error) {
      throw error;
    }
  }

  async find(email: string) {
    const user = await this.repo.find({ where: { email } });
    return user;
  }

  async findOne(id: number) {
    const user = await this.repo.findOneBy({ id });
    return user;
  }

  async setAdminStatus(userId: number, isAdmin: AdminStatus): Promise<User> {
    const user = await this.repo.findOneBy({ id: userId });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    user.role = isAdmin;
    return this.repo.save(user);
  }
}
