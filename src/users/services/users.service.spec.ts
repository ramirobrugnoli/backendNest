import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { NotFoundException } from '@nestjs/common';
import { AdminStatus } from '../constants';

describe('UsersService', () => {
  let service: UsersService;
  let repo: jest.Mocked<Repository<User>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: {
            create: jest.fn(),
            save: jest.fn(),
            find: jest.fn(),
            findOneBy: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    repo = module.get(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should successfully create a user', async () => {
      const user = {
        id: 1,
        email: 'test@test.com',
        password: 'password',
      } as User;
      repo.create.mockReturnValue(user);
      repo.save.mockResolvedValue(user);

      const result = await service.create('test@test.com', 'password');
      expect(result).toEqual(user);
    });
  });

  describe('find', () => {
    it('should return an array of users', async () => {
      const user = { id: 1, email: 'test@test.com' } as User;
      repo.find.mockResolvedValue([user]);

      const result = await service.find('test@test.com');
      expect(result).toEqual([user]);
    });
  });

  describe('findOne', () => {
    it('should return a user if found', async () => {
      const user = { id: 1, email: 'test@test.com' } as User;
      repo.findOneBy.mockResolvedValue(user);

      const result = await service.findOne(1);
      expect(result).toEqual(user);
    });

    it('should return null if user not found', async () => {
      repo.findOneBy.mockResolvedValue(null);

      const result = await service.findOne(1);
      expect(result).toBeNull();
    });
  });

  describe('setAdminStatus', () => {
    it('should set admin status for a user', async () => {
      const user = {
        id: 1,
        email: 'test@test.com',
        role: AdminStatus.USER,
      } as User;
      repo.findOneBy.mockResolvedValue(user);
      repo.save.mockResolvedValue({ ...user, role: AdminStatus.ADMIN });

      const result = await service.setAdminStatus(1, AdminStatus.ADMIN);
      expect(result.role).toBe(AdminStatus.ADMIN);
    });

    it('should throw NotFoundException if user not found', async () => {
      repo.findOneBy.mockResolvedValue(null);

      await expect(
        service.setAdminStatus(1, AdminStatus.ADMIN),
      ).rejects.toThrow(NotFoundException);
    });
  });
});
