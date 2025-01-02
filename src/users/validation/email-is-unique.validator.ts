import { Injectable } from '@nestjs/common';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  type ValidationOptions,
  registerDecorator,
} from 'class-validator';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';

@ValidatorConstraint({ async: true })
@Injectable()
export class IsEmailUniqueConstraint implements ValidatorConstraintInterface {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async validate(email: string): Promise<boolean> {
    const user = await this.userRepository.findOne({ where: { email } });
    return !user; // Retorna true se o e-mail não existir (é único)
  }

  defaultMessage(): string {
    return 'O e-mail informado já existe';
  }
}

export const IsEmailUnique = (validationOptions: ValidationOptions) => {
  return (object: object, prop: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName: prop,
      options: validationOptions,
      constraints: [],
      validator: IsEmailUniqueConstraint,
    });
  };
};
