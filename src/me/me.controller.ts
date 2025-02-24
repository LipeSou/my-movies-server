import { Controller, Get, Param } from '@nestjs/common';
import { MeService } from './me.service';

@Controller('me')
export class MeController {
  constructor(private readonly meService: MeService) {}

  @Get()
  findAll() {
    return this.meService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.meService.findOne(+id);
  }
}
