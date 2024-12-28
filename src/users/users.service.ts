import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import type { User } from './entities/user.entity';
import { ListUserDTO } from './dto/list-user.dto';

@Injectable()
export class UsersService {
  constructor(private userRepository: UserRepository) {}

  create(createUserDto: User) {
    this.userRepository.save(createUserDto);
    return {
      message: 'Usuário criado com sucesso!',
      user: new ListUserDTO(createUserDto.id, createUserDto.name),
    };
  }

  async findAll() {
    const userSaves = await this.userRepository.list();
    const users = userSaves.map((user) => new ListUserDTO(user.id, user.name));
    return users;
  }

  findOne(id: string) {
    return `This action returns a #${id} user`;
  }

  async update(id: string, updateUserDto) {
    const result = await this.userRepository.update(id, updateUserDto);
    if ((result as any)?.status === 404) {
      return result;
    }

    return { message: 'Usuário foi atualizado com sucesso!', id };
  }

  remove(id: string) {
    return `This action removes a #${id} user`;
  }
}
