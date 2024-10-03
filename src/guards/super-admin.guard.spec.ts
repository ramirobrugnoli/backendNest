import { ExecutionContext } from '@nestjs/common';
import { SuperAdminGuard } from './super-admin.guard';

describe('SuperAdminGuard', () => {
  let guard: SuperAdminGuard;

  beforeEach(() => {
    guard = new SuperAdminGuard();
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

  it('should deny access for admin user', () => {
    const mockContext = {
      switchToHttp: () => ({
        getRequest: () => ({
          user: { admin: 'admin' },
        }),
      }),
    } as ExecutionContext;

    expect(guard.canActivate(mockContext)).toBe(false);
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
