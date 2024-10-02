import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from './users.service';
import { JwtService } from '@nestjs/jwt';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { User } from '../entities/user.entity';

describe('AuthService', () => {
  let service: AuthService;
  let fakeUsersService: Partial<UsersService>;
  let fakeJwtService: Partial<JwtService>;

  beforeEach(async () => {
    const users: User[] = [];
    fakeUsersService = {
      find: jest.fn((email: string) => {
        const filteredUsers = users.filter((user) => user.email === email);
        return Promise.resolve(filteredUsers);
      }),
      create: jest.fn((email: string, password: string) => {
        const user = {
          id: Math.floor(Math.random() * 999999),
          email,
          password,
        } as User;
        users.push(user);
        return Promise.resolve(user);
      }),
    };
    fakeJwtService = {
      signAsync: jest.fn().mockResolvedValue('mockedToken'),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: fakeUsersService,
        },
        {
          provide: JwtService,
          useValue: fakeJwtService,
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('signup', () => {
    it('should create a new user with a hashed password', async () => {
      const user = await service.signup('test@test.com', 'password');

      expect(user.password).not.toEqual('password');
      expect(user.email).toEqual('test@test.com');
      const [salt, hash] = user.password.split('.');
      expect(salt).toBeDefined();
      expect(hash).toBeDefined();
    });

    it('throws an error if user signs up with email that is in use', async () => {
      await service.signup('a@a.com', 'password');
      await expect(service.signup('a@a.com', 'password')).rejects.toThrow(
        BadRequestException,
      );
    });
  });

  describe('signin', () => {
    it('returns a token if correct password is provided', async () => {
      await service.signup('test@test.com', 'password');
      const result = await service.signin('test@test.com', 'password');
      expect(result.access_token).toEqual('mockedToken');
    });

    it('throws if an invalid email is provided', async () => {
      await expect(service.signin('test@test.com', 'password')).rejects.toThrow(
        NotFoundException,
      );
    });

    it('throws if an invalid password is provided', async () => {
      await service.signup('test@test.com', 'password');
      await expect(
        service.signin('test@test.com', 'wrongpassword'),
      ).rejects.toThrow(BadRequestException);
    });
  });
});
