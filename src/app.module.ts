import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { WatchlistModule } from './watchlist/watchlist.module';
import { WatchlistItemModule } from './watchlist-item/watchlist-item.module';
import { EpisodeModule } from './episode/episode.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostgresConfigService } from './config/postgres.config.service';
import { ConfigModule } from '@nestjs/config';
import { WatchlistUsersModule } from './watchlist-users/watchlist-users.module';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { MeModule } from './me/me.module';

@Module({
  imports: [
    UsersModule,
    WatchlistModule,
    WatchlistItemModule,
    EpisodeModule,
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useClass: PostgresConfigService,
    }),
    WatchlistUsersModule,
    AuthModule,
    MeModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
