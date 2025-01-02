export class ListWatchlistItemDto {
  constructor(
    public id: string,
    public watchlistId: string,
    public tmdbId: number,
    public mediaType: string,
    public watched: boolean,
    public userRating?: number,
    public movieData?: object,
  ) {}
}
