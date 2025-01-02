import { PartialType } from '@nestjs/mapped-types';
import { CreateWatchlistItemDto } from './create-watchlist-item.dto';
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsOptional,
} from 'class-validator';

export class UpdateWatchlistItemDto extends PartialType(
  CreateWatchlistItemDto,
) {
  @IsBoolean()
  @IsOptional()
  watched?: boolean;

  @IsNumber()
  @IsOptional()
  userRating?: number;

  @IsObject()
  @IsNotEmpty()
  @IsOptional()
  movieData: object;
}
