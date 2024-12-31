import { Watchlist } from 'src/watchlist/entities/watchlist.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';

@Entity('watchlist_items')
export class WatchlistItem {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Watchlist, (watchlist) => watchlist.items, {
    onDelete: 'CASCADE',
  })
  watchlist: Watchlist;

  @Column()
  tmdbId: number;

  @Column()
  mediaType: string; // 'movie' ou 'tv'

  @Column({ type: 'jsonb' })
  movieData: object; // JSON detalhado do TMDB

  @Column({ default: false })
  watched: boolean;

  @Column({ type: 'float', nullable: true })
  userRating: number;

  @CreateDateColumn()
  createdAt: Date;
}
