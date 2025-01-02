import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateWatchlistDto {
  @IsString({ message: 'O nome precisa ser no formato texto' })
  @IsNotEmpty({ message: 'O nome não pode estar vazio' })
  @MinLength(4, { message: 'A nome precisa ter pelo menos 4 caracteres' })
  name: string;
}
