import { Injectable } from '@nestjs/common';

@Injectable()
export class MeService {
  findAll() {
    return `This action returns all me`;
  }

  findOne(id: number) {
    return `This action returns a #${id} me`;
  }
}
