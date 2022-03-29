import { DecorateAll } from 'decorate-all';
import { Like } from 'typeorm';
import { EntityNotFoundError } from 'typeorm';

import { Buyer } from '@/buyer/entities/buyer.entity';
import { BuyerCreateDto, BuyerDto } from '@/buyer/types/buyer.type';

import { BaseRepository } from '@/shared/interfaces/base-repository.interface';
import { DbCatch } from '@/shared/decorators/db-catch.decorator';

@DecorateAll(DbCatch)
export class BuyerRepository implements BaseRepository<Buyer, BuyerDto, BuyerCreateDto> {
  async create(params: BuyerCreateDto): Promise<void> {
    await Buyer.create(params).save();
  }

  async findAll({ name = null }): Promise<Buyer[]> {
    const filterByName = {
      where: {
        name: Like(`%${name}%`),
      },
    };
    const filter = name ? filterByName : {};
    const response = await Buyer.find(filter);
    return response;
  }

  async findByActive(): Promise<Buyer[]> {
    const buyers: Buyer[] = await Buyer.find({ where: { status: true } });
    return buyers;
  }

  async getByName(name: string): Promise<Buyer> {
    const buyer = Buyer.findOne({ where: { name } });
    return buyer;
  }

  async findById(id: number): Promise<Buyer> {
    const buyer = await Buyer.findOneOrFail(id);
    return buyer;
  }

  async findOneByKey(key: string, value: any): Promise<Buyer> {
    const buyer = await Buyer.findOne({ where: { [key]: value } });
    return buyer;
  }

  async update(params: BuyerDto, id: number): Promise<void> {
    const buyer = await Buyer.update(id, params);
    if (buyer.affected === 0) {
      throw new EntityNotFoundError(Buyer, id);
    }
  }

  async changeStatus(id: number, status: boolean): Promise<void> {
    const buyer = await Buyer.update(id, { status });
    if (buyer.affected === 0) {
      throw new EntityNotFoundError(Buyer, id);
    }
  }
}
