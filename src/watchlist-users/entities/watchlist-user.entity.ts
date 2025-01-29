import { User } from '../../users/entities/user.entity';
import { Watchlist } from '../../watchlist/entities/watchlist.entity';
import {
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('watchlist_users')
export class WatchlistUser {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Watchlist, (watchlist) => watchlist.watchlistUsers, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'watchlist_id' })
  watchlist: Watchlist;

  @ManyToOne(() => User, (user) => user.watchlistUsers, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
