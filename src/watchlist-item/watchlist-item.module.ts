import { Module } from '@nestjs/common';
import { WatchlistItemService } from './watchlist-item.service';
import { WatchlistItemController } from './watchlist-item.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WatchlistItem } from './entities/watchlist-item.entity';
import { Watchlist } from '../watchlist/entities/watchlist.entity';

@Module({
  imports: [TypeOrmModule.forFeature([WatchlistItem, Watchlist])],
  controllers: [WatchlistItemController],
  providers: [WatchlistItemService],
})
export class WatchlistItemModule {}
