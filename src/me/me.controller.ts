import { Controller, Get } from '@nestjs/common';
import { MeService } from './me.service';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import type { User } from 'src/users/entities/user.entity';

@Controller('me')
export class MeController {
  constructor(private readonly meService: MeService) {}

  @Get()
  find(@CurrentUser() user: User) {
    return this.meService.find(user);
  }
}
