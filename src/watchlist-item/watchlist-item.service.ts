import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateWatchlistItemDto } from './dto/create-watchlist-item.dto';
import { UpdateWatchlistItemDto } from './dto/update-watchlist-item.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { WatchlistItem } from './entities/watchlist-item.entity';
import { Repository } from 'typeorm';
import { Watchlist } from '../watchlist/entities/watchlist.entity';

@Injectable()
export class WatchlistItemService {
  constructor(
    @InjectRepository(WatchlistItem)
    private readonly watchlistItemRepository: Repository<WatchlistItem>,
    @InjectRepository(Watchlist)
    private readonly watchlistRepository: Repository<Watchlist>,
  ) {}

  async create(
    createWatchlistItemDto: CreateWatchlistItemDto,
  ): Promise<WatchlistItem> {
    const watchlist = await this.watchlistRepository.findOne({
      where: { id: createWatchlistItemDto.watchlistId },
    });

    if (!watchlist) {
      throw new NotFoundException(`Watchlist não foi encontrada`);
    }

    // Criar o novo WatchlistItem e associá-lo à Watchlist
    const newItem = this.watchlistItemRepository.create({
      ...createWatchlistItemDto,
      watchlist,
    });

    return this.watchlistItemRepository.save(newItem);
  }

  async findAllByWatchlist(watchlistId: string) {
    return this.watchlistItemRepository.find({
      where: { watchlist: { id: watchlistId } },
    });
  }

  async findOne(id: string) {
    const item = await this.watchlistItemRepository.findOne({ where: { id } });
    if (!item) {
      throw new NotFoundException(`Watchlist item não foi encontrado!`);
    }
    return item;
  }

  async update(id: string, updateWatchlistItemDto: UpdateWatchlistItemDto) {
    const item = await this.findOne(id);
    Object.assign(item, updateWatchlistItemDto);
    return this.watchlistItemRepository.save(item);
  }

  async markAsWatched(id: string): Promise<WatchlistItem> {
    const item = await this.findOne(id);
    item.watched = true;
    item.watchedAt = new Date(); // Atualiza a data de quando foi assistido
    return this.watchlistItemRepository.save(item);
  }

  async remove(id: string) {
    const item = await this.findOne(id);
    await this.watchlistItemRepository.remove(item);
    return { message: 'Item foi removido com sucesso!' };
  }
}
