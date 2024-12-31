import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './entities/user.entity';
import { ListUserDTO } from './dto/list-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { v4 as uuid } from 'uuid';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

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
    const userSaves = await this.userRepository.find();
    const users = userSaves.map((user) => new ListUserDTO(user.id, user.name));
    return users;
  }

  async findOne(query: { id?: string; name?: string }) {
    const user = await this.userRepository.findOne({
      where: [{ id: query.id }, { name: query.name }],
    });
    if (!user) {
      throw new Error('Usuário não encontrado');
    }
    return new ListUserDTO(user.id, user.name);
  }

  async update(id: string, updateUserDto: Partial<CreateUserDto>) {
    const result = await this.userRepository.update(id, updateUserDto);

    if (result.affected === 0) {
      throw new NotFoundException('Não foi encontrado o usuário');
    }

    return { message: 'Usuário foi atualizado com sucesso!', id };
  }

  async remove(id: string) {
    const removedUser = await this.userRepository.delete(id);

    if (removedUser.affected === 0) {
      throw new NotFoundException('Não foi encontrado o usuário');
    }

    return {
      message: 'Usuário removido com sucesso',
    };
  }
}
