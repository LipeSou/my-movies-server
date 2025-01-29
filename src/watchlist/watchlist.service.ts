import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateWatchlistDto } from './dto/create-watchlist.dto';
import { UpdateWatchlistDto } from './dto/update-watchlist.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Watchlist } from './entities/watchlist.entity';
import { Repository } from 'typeorm';
import { WatchlistUser } from '../watchlist-users/entities/watchlist-user.entity';
import { User } from '../users/entities/user.entity';

@Injectable()
export class WatchlistService {
  constructor(
    @InjectRepository(Watchlist)
    private readonly watchlistRepository: Repository<Watchlist>,

    @InjectRepository(WatchlistUser)
    private readonly watchlistUsersRepository: Repository<WatchlistUser>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createWatchlistDto: CreateWatchlistDto) {
    const user = await this.userRepository.findOne({
      where: { id: createWatchlistDto.userId },
    });

    if (!user) {
      throw new NotFoundException(
        `Usuário com id: ${createWatchlistDto.userId} não foi encontrado`,
      );
    }

    const watchlist = this.watchlistRepository.create({
      name: createWatchlistDto.name,
      user,
    });

    return this.watchlistRepository.save(watchlist);
  }

  async findAllByUser(userId: string) {
    const watchlists = await this.watchlistRepository.find({
      where: { user: { id: userId } },
      relations: ['user', 'watchlistUsers', 'items'],
    });

    return watchlists;
  }

  async findOne(id: string) {
    const watchlist = await this.watchlistRepository.findOne({
      where: { id },
      // relations: ['watchlistUsers', 'watchlistUsers.user'],
    });

    if (!watchlist) {
      throw new NotFoundException('Watchlist não encontrada');
    }
    return {
      id: watchlist.id,
      name: watchlist.name,
      members:
        watchlist?.watchlistUsers && watchlist?.watchlistUsers.length > 0
          ? watchlist.watchlistUsers.map((wu) => ({
              id: wu.user.id,
              name: wu.user.name,
            }))
          : [],
    };
  }

  async findInvited(userId: string) {
    const invitedWatchlists = await this.watchlistRepository
      .createQueryBuilder('watchlist')
      .innerJoinAndSelect('watchlist.watchlistUsers', 'watchlistUsers')
      .innerJoinAndSelect('watchlistUsers.user', 'user')
      .where('user.id = :userId', { userId })
      .leftJoinAndSelect('watchlist.user', 'creator')
      .leftJoinAndSelect('watchlist.items', 'items')
      .getMany();

    return invitedWatchlists.map((watchlist) => ({
      id: watchlist.id,
      name: watchlist.name,
      creator: {
        id: watchlist.user.id,
        name: watchlist.user.name,
      },
      items: watchlist.items,
    }));
  }

  async update(id: string, updateWatchlistDto: UpdateWatchlistDto) {
    const watchlist = await this.watchlistRepository.findOne({ where: { id } });

    if (!watchlist) {
      throw new NotFoundException('Watchlist não encontrada');
    }

    Object.assign(watchlist, updateWatchlistDto);

    await this.watchlistRepository.save(watchlist);

    return {
      message: 'Watchlist atualizada com sucesso!',
      watchlistId: watchlist.id,
    };
  }

  async remove(id: string) {
    const removedWatchlist = await this.watchlistRepository.delete(id);

    if (removedWatchlist.affected === 0) {
      throw new NotFoundException(
        'Não foi encontrada a lista para ser removida!',
      );
    }

    return {
      message: 'Lista removida com sucesso',
    };
  }
  // Convidar um usuário para uma watchlist
  async inviteUser(watchlistId: string, userId: string) {
    const watchlist = await this.watchlistRepository.findOne({
      where: { id: watchlistId },
    });
    const user = await this.userRepository.findOne({ where: { id: userId } });

    if (!watchlist) {
      throw new NotFoundException('Watchlist não encontrada');
    }

    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    // Verificar se o usuário já está associado à watchlist
    const existing = await this.watchlistUsersRepository.findOne({
      where: { watchlist, user },
    });

    if (existing) {
      throw new Error('Usuário já associado a esta watchlist');
    }

    const watchlistUser = this.watchlistUsersRepository.create({
      watchlist,
      user,
    });

    await this.watchlistUsersRepository.save(watchlistUser);

    return { message: 'Usuário convidado com sucesso!' };
  }
}
