import { Injectable, NotFoundException } from '@nestjs/common';
import type { User } from './entities/user.entity';

@Injectable()
export class UserRepository {
  private users: User[] = [];

  async save(user: User) {
    this.users.push(user);
  }

  async list() {
    return this.users;
  }

  async update(id: string, updateData: Partial<User>) {
    const possibleUser = this.users.find((findUser) => findUser.id === id);
    if (!possibleUser) {
      throw new NotFoundException('Usuário não existe');
    }

    Object.entries(updateData).forEach(([key, value]) => {
      if (key === 'id') {
        return;
      }

      possibleUser[key] = value;
    });

    return possibleUser;
  }

  async isUserWithEmail(email: string) {
    const possibleUser = this.users.find((user) => user.email === email);

    return possibleUser !== undefined;
  }
}
