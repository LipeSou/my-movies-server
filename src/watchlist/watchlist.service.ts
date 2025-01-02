import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateWatchlistDto } from './dto/create-watchlist.dto';
import { UpdateWatchlistDto } from './dto/list-watchlist.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Watchlist } from './entities/watchlist.entity';
import { Repository } from 'typeorm';
import { WatchlistUser } from 'src/watchlist-users/entities/watchlist-user.entity';
import { User } from 'src/users/entities/user.entity';

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
    // const user = await this.userRepository.findOne({ where: { id: userId } });

    // if (!user) {
    //   throw new NotFoundException('Usuário não encontrado');
    // }

    const watchlist = this.watchlistRepository.create({
      name: createWatchlistDto.name,
    });

    const savedWatchlist = await this.watchlistRepository.save(watchlist);

    // Associar o criador como membro (owner) da watchlist
    // const watchlistUser = this.watchlistUsersRepository.create({
    //   watchlist: savedWatchlist,
    //   user,
    // });

    // await this.watchlistUsersRepository.save(watchlistUser);

    return {
      message: 'Lita criada com sucesso!',
      watchlistId: savedWatchlist.id,
    };
  }

  async findAllByUser() {
    // const watchlists = await this.watchlistRepository
    //   .createQueryBuilder('w')
    //   .innerJoinAndSelect('w.watchlistUsers', 'wu')
    //   .innerJoinAndSelect('wu.user', 'u')
    //   .where('wu.user.id = :userId', { userId })
    //   .getMany();

    const watchlists = await this.watchlistRepository
      .createQueryBuilder('w')
      .getMany();

    return watchlists.map((watchlist) => ({
      id: watchlist.id,
      name: watchlist.name,
      members:
        watchlist?.watchlistUsers && watchlist?.watchlistUsers.length > 0
          ? watchlist.watchlistUsers.map((wu) => ({
              id: wu.user.id,
              name: wu.user.name,
            }))
          : [],
    }));
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
}
