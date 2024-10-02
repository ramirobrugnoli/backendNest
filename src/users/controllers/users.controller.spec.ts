import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { AuthService } from '../services/auth.service';
import { CreateUserDto } from '../dtos/create-user.dto';
import { SignUserDto } from '../dtos/sign-user.dto';
import { User } from '../entities/user.entity';
import { AdminStatus } from '../constants';
import { AuthGuard } from '../../guards/auth.guard';
import { ConfigService } from '@nestjs/config';

describe('UsersController', () => {
  let controller: UsersController;
  let authService: AuthService;

  const mockUser: Partial<User> = {
    id: 1,
    email: 'test@example.com',
    role: AdminStatus.USER,
  };

  const mockAuthService = {
    signup: jest.fn(),
    signin: jest.fn(),
  };

  const mockConfigService = {
    get: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: AuthService,
          useValue: mockAuthService,
        },
        {
          provide: ConfigService,
          useValue: mockConfigService,
        },
      ],
    })
      .overrideGuard(AuthGuard)
      .useValue({ canActivate: () => true })
      .compile();

    controller = module.get<UsersController>(UsersController);
    authService = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('createUser', () => {
    it('should create a new user', async () => {
      const createUserDto: CreateUserDto = {
        email: 'test@example.com',
        password: 'password123',
      };

      mockAuthService.signup.mockResolvedValue(mockUser);

      const result = await controller.createUser(createUserDto);

      expect(result).toEqual(mockUser);
      expect(authService.signup).toHaveBeenCalledWith(
        createUserDto.email,
        createUserDto.password,
      );
    });
  });

  describe('signin', () => {
    it('should sign in a user and return an access token', async () => {
      const signUserDto: SignUserDto = {
        email: 'test@example.com',
        password: 'password123',
      };

      const mockToken = { access_token: 'mock_token' };

      mockAuthService.signin.mockResolvedValue(mockToken);

      const result = await controller.signin(signUserDto);

      expect(result).toEqual(mockToken);
      expect(authService.signin).toHaveBeenCalledWith(
        signUserDto.email,
        signUserDto.password,
      );
    });
  });

  describe('getProfile', () => {
    it('should return the user profile', () => {
      const mockReq = {
        user: mockUser,
      };

      const result = controller.getProfile(mockReq as any);

      expect(result).toEqual(mockUser);
    });
  });
});
