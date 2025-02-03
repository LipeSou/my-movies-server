import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcript from 'bcrypt';
import type { User } from 'src/users/entities/user.entity';
import type { UserPayload } from './models/UserPayload';
import { JwtService } from '@nestjs/jwt';
import type { UserToken } from './models/UserToken';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  login(user: User): UserToken {
    // Transforma o user em JWT
    const payload: UserPayload = {
      sub: user.id,
      email: user.email,
      name: user.name,
    };

    const jwtToken = this.jwtService.sign(payload);

    return {
      access_token: jwtToken,
    };
  }

  async validateUser(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);
    if (user) {
      // Checar se a senha informada corresponde a hash que está no banco
      const isPasswordValid = await bcript.compare(password, user.password);
      if (isPasswordValid) {
        return {
          ...user,
          password: undefined,
        };
      }
    }
    // Se chegar aqui significa que não encontrou um user e/ou a senha não corresponde
    throw new Error('Email ou senha informada é incorreta');
  }
}
