import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsString,
} from 'class-validator';

export class CreateWatchlistItemDto {
  @IsString()
  @IsNotEmpty()
  watchlistId: string;

  @IsNumber()
  @IsNotEmpty()
  tmdbId: number;

  @IsString()
  @IsNotEmpty()
  mediaType: 'movie' | 'tv';

  @IsObject()
  @IsNotEmpty()
  movieData: object;

  @IsBoolean()
  @IsNotEmpty()
  watched: boolean;
}
