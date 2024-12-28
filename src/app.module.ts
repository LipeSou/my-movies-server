import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { WatchlistModule } from './watchlist/watchlist.module';
import { WatchlistItemModule } from './watchlist-item/watchlist-item.module';
import { EpisodeModule } from './episode/episode.module';

@Module({
  imports: [UsersModule, WatchlistModule, WatchlistItemModule, EpisodeModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
