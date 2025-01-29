import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { WatchlistService } from './watchlist.service';
import { CreateWatchlistDto } from './dto/create-watchlist.dto';
import type { UpdateWatchlistDto } from './dto/update-watchlist.dto';
import { ListWatchlistDto } from './dto/list-watchlist.dto';

@Controller('watchlist')
export class WatchlistController {
  constructor(private readonly watchlistService: WatchlistService) {}

  @Post()
  create(@Body() createWatchlistDto: CreateWatchlistDto) {
    return this.watchlistService.create(createWatchlistDto);
  }

  @Get()
  async findAllByUser(@Query('userId') userId: string) {
    if (!userId) {
      throw new Error('Parâmetro userId é obrigatório');
    }
    const watchlists = await this.watchlistService.findAllByUser(userId);

    // Agora transformamos cada watchlist numa instância do nosso DTO
    return watchlists.map((watchlist) => new ListWatchlistDto(watchlist));
  }

  @Get('invited')
  findInvited(@Query('userId') userId: string) {
    if (!userId) {
      throw new Error('Parâmetro userId é obrigatório');
    }
    return this.watchlistService.findInvited(userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.watchlistService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateWatchlistDto: UpdateWatchlistDto,
  ) {
    return this.watchlistService.update(id, updateWatchlistDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.watchlistService.remove(id);
  }

  // Convidar um usuário para uma watchlist
  @Post('/invite-user')
  async inviteUser(
    @Param('id') watchlistId: string,
    @Query('userId') userId: string,
  ) {
    return this.watchlistService.inviteUser(watchlistId, userId);
  }
}
