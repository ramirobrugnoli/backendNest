import { Controller, Post, Body, UseGuards, Get, Req } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { CreateUserDto } from '../dtos/create-user.dto';
import { SignUserDto } from '../dtos/sign-user.dto';
import { AuthGuard } from '../../guards/auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly authService: AuthService) {}

  //si bien ambos usan un mismo dto (email y password), los mantengo separados por "si a futuro" se podría requerir otro dato para loguearse
  @Post('/register')
  async createUser(@Body() body: CreateUserDto) {
    const user = await this.authService.signup(body.email, body.password);
    return user;
  }

  @Post('/signin')
  async signin(@Body() body: SignUserDto) {
    const user = await this.authService.signin(body.email, body.password);
    return user;
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Req() req) {
    return req.user;
  }
}
