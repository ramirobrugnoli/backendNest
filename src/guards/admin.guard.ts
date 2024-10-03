import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';

@Injectable()
export class AdminGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    if (!request.user) return false;
    return (
      request.user &&
      (request.user.admin === 'admin' || request.user.admin === 'superadmin')
    );
  }
}
