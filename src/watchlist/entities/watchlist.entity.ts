import { User } from '../../users/entities/user.entity';
import { WatchlistItem } from '../../watchlist-item/entities/watchlist-item.entity';
import { WatchlistUser } from '../../watchlist-users/entities/watchlist-user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity('watchlists')
export class Watchlist {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.watchlist, { onDelete: 'CASCADE' }) // Relacionamento com User
  @JoinColumn({ name: 'user_id' })
  user: User;

  @OneToMany(
    () => WatchlistUser,
    (watchlistUsers) => watchlistUsers.watchlist,
    { cascade: true },
  )
  watchlistUsers: WatchlistUser[];

  @OneToMany(() => WatchlistItem, (watchlistItem) => watchlistItem.watchlist, {
    eager: true,
    cascade: true,
  })
  items: WatchlistItem[];
}
