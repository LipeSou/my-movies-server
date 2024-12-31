import { WatchlistItem } from 'src/watchlist-item/entities/watchlist-item.entity';
import { WatchlistUser } from 'src/watchlist-users/entities/watchlist-user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

@Entity('watchlists')
export class Watchlist {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => WatchlistUser, (watchlistUsers) => watchlistUsers.watchlist)
  watchlistUsers: WatchlistUser[];

  @OneToMany(() => WatchlistItem, (watchlistItem) => watchlistItem.watchlist)
  items: WatchlistItem[];
}
