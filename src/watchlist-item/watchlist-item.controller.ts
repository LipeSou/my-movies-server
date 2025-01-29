import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { WatchlistItemService } from './watchlist-item.service';
import { CreateWatchlistItemDto } from './dto/create-watchlist-item.dto';
import { UpdateWatchlistItemDto } from './dto/update-watchlist-item.dto';

@Controller('watchlist-item')
export class WatchlistItemController {
  constructor(private readonly watchlistItemService: WatchlistItemService) {}

  @Post()
  create(@Body() createWatchlistItemDto: CreateWatchlistItemDto) {
    return this.watchlistItemService.create(createWatchlistItemDto);
  }

  @Get()
  findAllByWatchlist(@Param('watchlistId') watchlistId: string) {
    return this.watchlistItemService.findAllByWatchlist(watchlistId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.watchlistItemService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateWatchlistItemDto: UpdateWatchlistItemDto,
  ) {
    return this.watchlistItemService.update(id, updateWatchlistItemDto);
  }

  @Patch(':id/watched')
  markAsWatched(@Param('id') id: string) {
    return this.watchlistItemService.markAsWatched(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.watchlistItemService.remove(id);
  }
}
