import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcript from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}
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
