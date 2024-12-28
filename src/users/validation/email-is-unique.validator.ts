import {
  registerDecorator,
  ValidatorConstraint,
  ValidationOptions,
  ValidatorConstraintInterface,
} from 'class-validator';
import { UserRepository } from '../user.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
@ValidatorConstraint({ async: true })
export class EmailIsUnique implements ValidatorConstraintInterface {
  constructor(private userRepository: UserRepository) {}

  async validate(email: any): Promise<boolean> {
    const isUserWithEmail = await this.userRepository.isUserWithEmail(email);
    return !isUserWithEmail;
  }
}

export const IsEmailUnique = (validationOptions: ValidationOptions) => {
  return (object: object, prop: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName: prop,
      options: validationOptions,
      constraints: [],
      validator: EmailIsUnique,
    });
  };
};
