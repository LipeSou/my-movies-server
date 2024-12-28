import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { IsEmailUnique } from '../validation/email-is-unique.validator';

export class CreateUserDto {
  @IsString({ message: 'O nome precisa ser no formato texto' })
  @IsNotEmpty({ message: 'O nome não pode estar vazio' })
  name: string;

  @IsEmail(undefined, { message: 'O E-mail precisa ser do tipo e-mail' })
  @IsEmailUnique({ message: 'O e-mail informado já existe' })
  email: string;

  @MinLength(6, { message: 'A senha precisa ter pelo menos 6 caracteres' })
  password: string;
}
