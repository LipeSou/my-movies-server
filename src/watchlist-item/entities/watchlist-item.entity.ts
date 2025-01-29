import { Watchlist } from '../../watchlist/entities/watchlist.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  JoinColumn,
} from 'typeorm';

@Entity('watchlist_items')
export class WatchlistItem {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Watchlist, (watchlist) => watchlist.items, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'watchlist_id' })
  watchlist: Watchlist;

  @Column({ name: 'tmdb_id' })
  tmdbId: number;

  @Column({ name: 'media_type' })
  mediaType: string; // 'movie' ou 'tv'

  @Column({ name: 'movie_data', type: 'jsonb' })
  movieData: object; // JSON detalhado do TMDB

  @Column({ default: false })
  watched: boolean;

  @CreateDateColumn({ name: 'watched_at', nullable: true })
  watchedAt: Date;

  @Column({ name: 'user_rating', type: 'float', nullable: true })
  userRating: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
