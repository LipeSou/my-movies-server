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

  private searchForId(id: string) {
    const possibleUser = this.users.find((findUser) => findUser.id === id);
    if (!possibleUser) {
      throw new NotFoundException('Usuário não existe');
    }

    return possibleUser;
  }

  async update(id: string, updateData: Partial<User>) {
    const user = this.searchForId(id);

    Object.entries(updateData).forEach(([key, value]) => {
      if (key === 'id') {
        return;
      }

      user[key] = value;
    });

    return user;
  }

  async isUserWithEmail(email: string) {
    const possibleUser = this.users.find((user) => user.email === email);

    return possibleUser !== undefined;
  }

  async remove(id: string) {
    const userForDelete = this.searchForId(id);

    this.users = this.users.filter((user) => userForDelete.id !== user.id);

    return {
      id: userForDelete.id,
      name: userForDelete.name,
      email: userForDelete.email,
    };
  }
}
