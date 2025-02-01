import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './entities/user.entity';
import { ListUserDTO } from './dto/list-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const userEntity = new User();
    userEntity.email = createUserDto.email;
    userEntity.name = createUserDto.name;
    userEntity.password = await bcrypt.hash(createUserDto.password, 10);

    this.userRepository.save(userEntity);
    return {
      message: 'Usuário criado com sucesso!',
      user: new ListUserDTO(
        userEntity.id,
        createUserDto.name,
        userEntity.email,
      ),
    };
  }

  async findAll() {
    const userSaves = await this.userRepository.find();
    const users = userSaves.map(
      (user) => new ListUserDTO(user.id, user.name, user.email),
    );
    return users;
  }

  async find(query: { id?: string; name?: string; email?: string }) {
    const whereConditions = [];

    if (query.id) {
      whereConditions.push({ id: query.id });
    }

    if (query.name) {
      whereConditions.push({ name: ILike(`%${query.name}%`) });
    }

    if (query.email) {
      whereConditions.push({ email: query.email });
    }

    const users = await this.userRepository.find({
      where: whereConditions,
    });

    if (users.length === 0) {
      return [];
    }

    return users.map((user) => new ListUserDTO(user.id, user.name, user.email));
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { email },
    });

    if (!user) {
      throw new NotFoundException(
        'Usuário com o email fornecido não encontrado',
      );
    }

    return user;
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
      throw new NotFoundException('Não foi encontrado o usuário!');
    }

    return {
      message: 'Usuário removido com sucesso',
    };
  }
}
