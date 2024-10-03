import { ExecutionContext } from '@nestjs/common';
import { AdminGuard } from './admin.guard';

describe('AdminGuard', () => {
  let guard: AdminGuard;

  beforeEach(() => {
    guard = new AdminGuard();
  });

  it('should allow access for admin user', () => {
    const mockContext = {
      switchToHttp: () => ({
        getRequest: () => ({
          user: { admin: 'admin' },
        }),
      }),
    } as ExecutionContext;

    expect(guard.canActivate(mockContext)).toBe(true);
  });

  it('should allow access for superadmin user', () => {
    const mockContext = {
      switchToHttp: () => ({
        getRequest: () => ({
          user: { admin: 'superadmin' },
        }),
      }),
    } as ExecutionContext;

    expect(guard.canActivate(mockContext)).toBe(true);
  });

  it('should deny access for non-admin user', () => {
    const mockContext = {
      switchToHttp: () => ({
        getRequest: () => ({
          user: { admin: 'user' },
        }),
      }),
    } as ExecutionContext;

    expect(guard.canActivate(mockContext)).toBe(false);
  });

  it('should deny access when user is not present', () => {
    const mockContext = {
      switchToHttp: () => ({
        getRequest: () => ({}),
      }),
    } as ExecutionContext;

    expect(guard.canActivate(mockContext)).toBe(false);
  });
});
