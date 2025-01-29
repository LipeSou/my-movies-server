export class ListWatchlistDto {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;

  // Queremos renomear "user" para "userOwner"
  userOwner: {
    name: string;
    email: string;
  } | null;

  // watchlistUsers (caso queira retornar algo)
  watchlistUsers: Array<{
    id: string;
    createdAt: Date;
    user?: {
      name: string;
      email: string;
    };
  }>;

  // items (retorne só o que for necessário)
  items: Array<{
    id: string;
    tmdbId: number;
    mediaType: string;
    movieData: any;
    watched: boolean;
    watchedAt: Date;
    userRating: any;
    createdAt: Date;
  }>;

  constructor(entity: any /* ou WatchlistEntity */) {
    this.id = entity.id;
    this.name = entity.name;
    this.createdAt = entity.createdAt;
    this.updatedAt = entity.updatedAt;

    // Monta o userOwner com apenas name e email
    this.userOwner = entity.user
      ? {
          name: entity.user.name,
          email: entity.user.email,
        }
      : null;

    // Se você quiser retornar também o usuário de cada watchlistUser
    // pode precisar carregar o 'watchlistUsers.user' na relação
    this.watchlistUsers =
      entity.watchlistUsers?.map((wu: any) => ({
        id: wu.id,
        createdAt: wu.createdAt,
        user: wu.user
          ? {
              name: wu.user.name,
              email: wu.user.email,
            }
          : undefined,
      })) ?? [];

    this.items =
      entity.items?.map((item: any) => ({
        id: item.id,
        tmdbId: item.tmdbId,
        mediaType: item.mediaType,
        movieData: item.movieData,
        watched: item.watched,
        watchedAt: item.watchedAt,
        userRating: item.userRating,
        createdAt: item.createdAt,
      })) ?? [];
  }
}
