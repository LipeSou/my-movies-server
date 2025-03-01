import { Injectable } from '@nestjs/common';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import type { User } from 'src/users/entities/user.entity';

@Injectable()
export class MeService {
  find(@CurrentUser() user: User) {
    return user;
  }
}
