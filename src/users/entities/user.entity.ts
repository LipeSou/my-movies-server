import { Watchlist } from '../../watchlist/entities/watchlist.entity';
import { WatchlistUser } from '../../watchlist-users/entities/watchlist-user.entity';
import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'name', length: '70', nullable: false })
  name: string;

  @Column({ name: 'email', length: '100', nullable: false })
  email: string;

  @Column({ name: 'password', length: '70', nullable: false })
  password: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date;

  @OneToMany(() => WatchlistUser, (watchlistUser) => watchlistUser.user)
  watchlistUsers: WatchlistUser[];

  @OneToMany(() => Watchlist, (watchlist) => watchlist.user)
  watchlist: Watchlist[];
}
