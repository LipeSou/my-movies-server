import { PartialType } from '@nestjs/mapped-types';
import { CreateWatchlistUserDto } from './create-watchlist-user.dto';

export class UpdateWatchlistUserDto extends PartialType(CreateWatchlistUserDto) {}
