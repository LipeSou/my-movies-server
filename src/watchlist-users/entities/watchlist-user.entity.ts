import { User } from 'src/users/entities/user.entity';
import { Watchlist } from 'src/watchlist/entities/watchlist.entity';
import {
  CreateDateColumn,
  Entity,
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
  watchlist: Watchlist;

  @ManyToOne(() => User, (user) => user.watchlistUsers, { onDelete: 'CASCADE' })
  user: User;

  @CreateDateColumn()
  createdAt: Date;
}
