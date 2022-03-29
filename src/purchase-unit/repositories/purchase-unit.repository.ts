import { PurchaseUnit } from '@/purchase-unit/entities/purchase-unit.entity';
import { PurchaseUnitVariation } from '@/purchase-unit/entities/purchase-unit-variation.entity';
import { EntityNotFoundError, getManager, In, Not } from 'typeorm';
import { BaseRepository } from '@/shared/interfaces/base-repository.interface';
import { PurchaseUnitCreateDto, PurchaseUnitDto } from '../types/purchase-unit.type';
import { DecorateAll } from 'decorate-all';
import { DbCatch } from '@/shared/decorators/db-catch.decorator';

@DecorateAll(DbCatch)
export class PurchaseUnitRepository implements BaseRepository<PurchaseUnit, PurchaseUnitDto, PurchaseUnitCreateDto> {
  async create(params: PurchaseUnitCreateDto): Promise<void> {
    const purchaseUnitVariations = params.variations?.map((variation) => {
      return PurchaseUnitVariation.create({ variation });
    });

    const data = {
      ...params,
      variations: purchaseUnitVariations,
    };

    await PurchaseUnit.create(data).save();
  }

  async findAll({ name = null }: { name: string }): Promise<PurchaseUnit[]> {
    const filterByVariations = {
      where: (qb) => {
        qb.where('PurchaseUnitVariation.variation LIKE :variationName', { variationName: `%${name}%` });
      },
      join: { alias: 'PurchaseUnit', innerJoin: { PurchaseUnitVariation: 'PurchaseUnit.variations' } },
    };
    const filter = name ? filterByVariations : {};
    return PurchaseUnit.find({ relations: ['variations'], ...filter });
  }

  async findById(id: number): Promise<PurchaseUnit> {
    return PurchaseUnit.findOneOrFail(id, { relations: ['variations'] });
  }

  async findOneByKey(key: string, value: any): Promise<PurchaseUnit> {
    const purchaseUnit = await PurchaseUnit.findOne({ where: { [key]: value } });
    return purchaseUnit;
  }

  async findByActive(): Promise<PurchaseUnit[]> {
    const purchaseUnits: PurchaseUnit[] = await PurchaseUnit.find({ where: { status: true } });
    return purchaseUnits;
  }

  async findByName(name: string, id?: number): Promise<PurchaseUnit[]> {
    const idWhere = id ? { id: Not(id) } : {};

    return PurchaseUnit.find({ where: { name, ...idWhere } });
  }

  async findByVariation(variations: string[], purchaseUnitId?: number): Promise<PurchaseUnitVariation[]> {
    const idWhere = purchaseUnitId ? { purchaseUnitId: Not(purchaseUnitId) } : {};

    return PurchaseUnitVariation.find({
      where: { variation: In(variations), ...idWhere },
    });
  }

  async update(params: PurchaseUnitDto, id: number): Promise<void> {
    const purchaseUnitVariations = params.variations
      ?.filter((item) => item)
      ?.map((variation) => {
        return PurchaseUnitVariation.create({ variation });
      });

    const data = {
      ...params,
      variations: purchaseUnitVariations,
    };

    const unit = await PurchaseUnit.findOne(id, { relations: ['variations'] });
    const manager = getManager();
    await manager.transaction(async (transactionalEntityManager) => {
      await transactionalEntityManager.remove(unit.variations);
      const unitToSave = Object.assign(unit, data);
      await transactionalEntityManager.save(unitToSave);
    });
  }

  async changeStatus(id: number, status: boolean): Promise<void> {
    const purchaseUnit = await PurchaseUnit.update(id, { status });
    if (purchaseUnit.affected === 0) {
      throw new EntityNotFoundError(PurchaseUnit, id);
    }
  }
}
