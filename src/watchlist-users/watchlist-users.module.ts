import { Module } from '@nestjs/common';
import { WatchlistUsersService } from './watchlist-users.service';
import { WatchlistUsersController } from './watchlist-users.controller';

@Module({
  controllers: [WatchlistUsersController],
  providers: [WatchlistUsersService],
})
export class WatchlistUsersModule {}
