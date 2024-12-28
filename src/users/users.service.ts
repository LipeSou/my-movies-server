import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { User } from './entities/user.entity';
import { ListUserDTO } from './dto/list-user.dto';
import type { CreateUserDto } from './dto/create-user.dto';
import { v4 as uuid } from 'uuid';

@Injectable()
export class UsersService {
  constructor(private userRepository: UserRepository) {}

  create(createUserDto: CreateUserDto) {
    const userEntity = new User();
    userEntity.email = createUserDto.email;
    userEntity.name = createUserDto.name;
    userEntity.password = createUserDto.password;
    userEntity.id = uuid();

    this.userRepository.save(userEntity);
    return {
      message: 'Usuário criado com sucesso!',
      user: new ListUserDTO(userEntity.id, createUserDto.name),
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

  async remove(id: string) {
    const removedUser = await this.userRepository.remove(id);
    return {
      usuario: removedUser,
      message: 'Usuário removido com sucesso',
    };
  }
}
