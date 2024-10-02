import {
  Controller,
  Post,
  UseGuards,
  Param,
  NotFoundException,
  ParseIntPipe,
} from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { AuthGuard } from '../../guards/auth.guard';
import { SuperAdminGuard } from '../../guards/super-admin.guard';
import { AdminStatus } from '../constants';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('admin')
@ApiBearerAuth()
@Controller('admin')
@UseGuards(AuthGuard, SuperAdminGuard)
export class AdminController {
  constructor(private readonly usersService: UsersService) {}

  //arme un mini-controlador para gestionar los permisos de admin de los usuarios. los usuarios superadmin pueden darle admin a otros usuarios.
  //el superadmin se va a definir en el seed de la app cuando se crea la base de datos.
  @ApiOperation({ summary: 'Promote user to admin (Super Admin only)' })
  @ApiResponse({
    status: 200,
    description: 'User promoted to admin successfully',
  })
  @ApiResponse({ status: 404, description: 'User not found' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @Post('promoteAdmin/:id')
  async promoteToAdmin(@Param('id', ParseIntPipe) id: number) {
    const user = await this.usersService.findOne(id);
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return this.usersService.setAdminStatus(id, AdminStatus.ADMIN);
  }

  @ApiOperation({ summary: 'Remove admin status from user (Super Admin only)' })
  @ApiResponse({
    status: 200,
    description: 'Admin status removed successfully',
  })
  @ApiResponse({ status: 404, description: 'User not found' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @Post('removeAdmin/:id')
  async removeFromAdmin(@Param('id', ParseIntPipe) id: number) {
    const user = await this.usersService.findOne(id);
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return this.usersService.setAdminStatus(id, AdminStatus.USER);
  }
}
