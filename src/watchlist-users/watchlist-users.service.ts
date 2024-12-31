import { Injectable } from '@nestjs/common';
import { CreateWatchlistUserDto } from './dto/create-watchlist-user.dto';
import { UpdateWatchlistUserDto } from './dto/update-watchlist-user.dto';

@Injectable()
export class WatchlistUsersService {
  create(createWatchlistUserDto: CreateWatchlistUserDto) {
    return 'This action adds a new watchlistUser';
  }

  findAll() {
    return `This action returns all watchlistUsers`;
  }

  findOne(id: number) {
    return `This action returns a #${id} watchlistUser`;
  }

  update(id: number, updateWatchlistUserDto: UpdateWatchlistUserDto) {
    return `This action updates a #${id} watchlistUser`;
  }

  remove(id: number) {
    return `This action removes a #${id} watchlistUser`;
  }
}
