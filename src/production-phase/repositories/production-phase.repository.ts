import { EntityNotFoundError, UpdateResult, Like } from 'typeorm';

import { ProductionPhase } from '@/production-phase/entities/production-phase.entity';
import { ProductionPhaseCreateDto, ProductionPhaseDto } from '@/production-phase/types/production-phase.type';
import { DecorateAll } from 'decorate-all';
import { DbCatch } from '@/shared/decorators/db-catch.decorator';
import { BaseRepository } from '@/shared/interfaces/base-repository.interface';

@DecorateAll(DbCatch)
export class ProductionPhaseRepository implements BaseRepository<ProductionPhase, ProductionPhaseCreateDto, ProductionPhaseDto> {
  async create(params: ProductionPhaseCreateDto): Promise<void> {
    await ProductionPhase.create(params).save();
  }

  async findAll({ name = null }: { name: string }): Promise<ProductionPhase[]> {
    const filterByName = {
      where: {
        name: Like(`%${name}%`),
      },
    };
    const filter = name ? filterByName : {};

    return ProductionPhase.find({ ...filter });
  }

  async findById(id: number): Promise<ProductionPhase> {
    const productionPhase = await ProductionPhase.findOneOrFail(id);
    return productionPhase;
  }

  async findOneByKey(key: string, value: any): Promise<ProductionPhase> {
    const productionPhase = await ProductionPhase.findOne({ where: { [key]: value } });
    return productionPhase;
  }

  async getByName(name: string): Promise<ProductionPhase> {
    const productionPhase = await ProductionPhase.findOne({ where: { name } });
    return productionPhase;
  }

  async changeStatus(id: number, status: boolean): Promise<void> {
    const productionPhase = await ProductionPhase.update(id, { status });
    if (productionPhase.affected === 0) {
      throw new EntityNotFoundError(ProductionPhase, id);
    }
  }

  async update(params: ProductionPhaseDto, id: number): Promise<void> {
    const response: UpdateResult = await ProductionPhase.update(id, params);
    if (response.affected === 0) {
      throw new EntityNotFoundError(ProductionPhase, id);
    }
  }
}
