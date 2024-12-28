import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UserRepository } from './user.repository';
import { EmailIsUnique } from './validation/email-is-unique.validator';

@Module({
  controllers: [UsersController],
  providers: [UsersService, UserRepository, EmailIsUnique],
})
export class UsersModule {}
