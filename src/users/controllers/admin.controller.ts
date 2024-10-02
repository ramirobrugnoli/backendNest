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
import { AdminGuard } from '../../guards/admin.guard';
import { AdminStatus } from '../constants';

@Controller('admin')
@UseGuards(AuthGuard, AdminGuard)
export class AdminController {
  constructor(private readonly usersService: UsersService) {}

  //arme un mini-controlador para gestionar los permisos de admin de los usuarios. los usuarios superadmin pueden darle admin a otros usuarios.
  //el superadmin se va a definir en el seed de la app cuando se crea la base de datos.
  @Post('promoteAdmin/:id')
  async promoteToAdmin(@Param('id', ParseIntPipe) id: number) {
    const user = await this.usersService.findOne(id);
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return this.usersService.setAdminStatus(id, AdminStatus.ADMIN);
  }

  @Post('removeAdmin/:id')
  async removeFromAdmin(@Param('id', ParseIntPipe) id: number) {
    const user = await this.usersService.findOne(id);
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return this.usersService.setAdminStatus(id, AdminStatus.USER);
  }
}
