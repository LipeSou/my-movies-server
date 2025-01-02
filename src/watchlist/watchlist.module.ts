import { Module } from '@nestjs/common';
import { WatchlistService } from './watchlist.service';
import { WatchlistController } from './watchlist.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Watchlist } from './entities/watchlist.entity';
import { WatchlistUser } from 'src/watchlist-users/entities/watchlist-user.entity';
import { User } from 'src/users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Watchlist, WatchlistUser, User])],
  controllers: [WatchlistController],
  providers: [WatchlistService],
})
export class WatchlistModule {}
