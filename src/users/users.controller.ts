import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  BadRequestException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { IsEmail } from 'class-validator';
import { IsPublic } from 'src/auth/decorators/is-public.decorator';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @IsPublic()
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get('search')
  async findOne(
    @Query('id') id?: string,
    @Query('name') name?: string,
    @Query('email') email?: string,
  ) {
    if (!id && !name && !email) {
      throw new Error(
        'É necessário fornecer ao menos "id" ,"name" ou "email" como parâmetro.',
      );
    }
    return this.usersService.find({ id, name, email });
  }

  @Get('search-by-email')
  async findByEmail(@Query('email') email) {
    if (!IsEmail(email)) {
      throw new BadRequestException('O email fornecido é inválido.');
    }
    return this.usersService.findByEmail(email);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
