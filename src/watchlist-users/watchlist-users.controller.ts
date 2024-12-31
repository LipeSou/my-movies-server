import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { WatchlistUsersService } from './watchlist-users.service';
import { CreateWatchlistUserDto } from './dto/create-watchlist-user.dto';
import { UpdateWatchlistUserDto } from './dto/update-watchlist-user.dto';

@Controller('watchlist-users')
export class WatchlistUsersController {
  constructor(private readonly watchlistUsersService: WatchlistUsersService) {}

  @Post()
  create(@Body() createWatchlistUserDto: CreateWatchlistUserDto) {
    return this.watchlistUsersService.create(createWatchlistUserDto);
  }

  @Get()
  findAll() {
    return this.watchlistUsersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.watchlistUsersService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateWatchlistUserDto: UpdateWatchlistUserDto,
  ) {
    return this.watchlistUsersService.update(+id, updateWatchlistUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.watchlistUsersService.remove(+id);
  }
}
