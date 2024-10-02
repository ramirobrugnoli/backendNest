import { Test, TestingModule } from '@nestjs/testing';
import { AdminController } from './admin.controller';
import { UsersService } from '../services/users.service';
import { AuthGuard } from '../../guards/auth.guard';
import { SuperAdminGuard } from '../../guards/super-admin.guard';
import { AdminStatus } from '../constants';
import { NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

describe('AdminController', () => {
  let controller: AdminController;
  let usersService: UsersService;

  const mockUsersService = {
    findOne: jest.fn(),
    setAdminStatus: jest.fn(),
  };

  const mockConfigService = {
    get: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AdminController],
      providers: [
        {
          provide: UsersService,
          useValue: mockUsersService,
        },
        {
          provide: ConfigService,
          useValue: mockConfigService,
        },
      ],
    })
      .overrideGuard(AuthGuard)
      .useValue({ canActivate: () => true })
      .overrideGuard(SuperAdminGuard)
      .useValue({ canActivate: () => true })
      .compile();

    controller = module.get<AdminController>(AdminController);
    usersService = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('promoteToAdmin', () => {
    it('should promote a user to admin', async () => {
      const userId = 1;
      const mockUser = { id: userId, email: 'test@example.com' };
      mockUsersService.findOne.mockResolvedValue(mockUser);
      mockUsersService.setAdminStatus.mockResolvedValue({
        ...mockUser,
        role: AdminStatus.ADMIN,
      });

      const result = await controller.promoteToAdmin(userId);

      expect(usersService.findOne).toHaveBeenCalledWith(userId);
      expect(usersService.setAdminStatus).toHaveBeenCalledWith(
        userId,
        AdminStatus.ADMIN,
      );
      expect(result).toEqual({ ...mockUser, role: AdminStatus.ADMIN });
    });

    it('should throw NotFoundException if user is not found', async () => {
      const userId = 1;
      mockUsersService.findOne.mockResolvedValue(null);

      await expect(controller.promoteToAdmin(userId)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('removeFromAdmin', () => {
    it('should remove admin status from a user', async () => {
      const userId = 1;
      const mockUser = {
        id: userId,
        email: 'test@example.com',
        role: AdminStatus.ADMIN,
      };
      mockUsersService.findOne.mockResolvedValue(mockUser);
      mockUsersService.setAdminStatus.mockResolvedValue({
        ...mockUser,
        role: AdminStatus.USER,
      });

      const result = await controller.removeFromAdmin(userId);

      expect(usersService.findOne).toHaveBeenCalledWith(userId);
      expect(usersService.setAdminStatus).toHaveBeenCalledWith(
        userId,
        AdminStatus.USER,
      );
      expect(result).toEqual({ ...mockUser, role: AdminStatus.USER });
    });

    it('should throw NotFoundException if user is not found', async () => {
      const userId = 1;
      mockUsersService.findOne.mockResolvedValue(null);

      await expect(controller.removeFromAdmin(userId)).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
