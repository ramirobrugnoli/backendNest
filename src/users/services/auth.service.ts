import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';
import { JwtService } from '@nestjs/jwt';
import { instanceToPlain } from 'class-transformer';
import { User } from '../entities/user.entity';

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async signup(email: string, password: string): Promise<Partial<User>> {
    const users = await this.usersService.find(email);
    if (users.length) {
      throw new BadRequestException('email in use');
    }
    // acá implemento un hash de la contraseña, para que no se guarde en la bd como texto plano, ya que es una muy mala práctica x temas de seguridad
    const salt = randomBytes(8).toString('hex');
    const hash = (await scrypt(password, salt, 32)) as Buffer;
    const result = salt + '.' + hash.toString('hex');
    const user = await this.usersService.create(email, result);
    // retorno un instanceToPlain para que no se devuelva el password ni el rol (@Exclude) en la respuesta
    return instanceToPlain(user);
  }

  async signin(
    email: string,
    password: string,
  ): Promise<{ access_token: string }> {
    const [user] = await this.usersService.find(email);
    if (!user) {
      throw new NotFoundException('user not found');
    }

    const [salt, storedHash] = user.password.split('.');
    //se recupera el código con el que hasheamos la contraseña al momento del registro (storedHash) y volvemos a hashear la contraseña ingresada para comparar
    const hash = (await scrypt(password, salt, 32)) as Buffer;
    if (storedHash !== hash.toString('hex')) {
      throw new BadRequestException('bad password');
    }

    // incluimos la información relevante del usuario que queremos almacenar en el access_token q vamos a usar luego para verificar los permisos
    const payload = { sub: user.id, email: user.email, admin: user.role };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
