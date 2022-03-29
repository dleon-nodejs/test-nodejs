import { BaseRepository } from '@/shared/interfaces/base-repository.interface';
import { DecorateAll } from 'decorate-all';
import { EntityNotFoundError, getManager, In, Like } from 'typeorm';

import { DbCatch } from '@/shared/decorators/db-catch.decorator';
import { Provider } from '../entities/provider.entity';
import { ProviderComplement } from '../entities/provider-complement.entity';
import { ProviderCreateDto, ProviderDto, ProviderParamsDto } from '../types/provider.type';

@DecorateAll(DbCatch)
export class ProviderRepository implements BaseRepository<Provider, ProviderDto, ProviderCreateDto> {
  async create(params: ProviderCreateDto): Promise<void> {
    const providerBrands = params.brands?.map((name) => {
      return ProviderComplement.create({ name });
    });

    const providerProducts = params.products?.map((name) => {
      return ProviderComplement.create({ name });
    });

    const data = {
      ...params,
      brands: providerBrands,
      products: providerProducts,
    };

    await Provider.create(data).save();
  }

  async findAll({ name = null }: { name: string }): Promise<Provider[]> {
    const filterByVariations = {
      where: (qb) => {
        qb.where('PurchaseUnitVariation.variation LIKE :variationName', { variationName: `%${name}%` });
      },
      join: { alias: 'PurchaseUnit', innerJoin: { PurchaseUnitVariation: 'PurchaseUnit.variations' } },
    };
    const filter = name ? filterByVariations : {};
    return Provider.find({ relations: ['variations'], ...filter });
  }

  async findByComplements(brands: string[], type?: number): Promise<ProviderComplement[]> {
    return ProviderComplement.find({
      where: { name: In(brands), type },
    });
  }

  async getByCodErp(codErp: string): Promise<Provider[]> {
    return Provider.find({
      where: { codeErp: codErp },
    });
  }

  async findById(id: number): Promise<Provider> {
    const result = await Provider.findOneOrFail(id, { relations: ['complements'] });
    return result;
  }

  async findOneByKey(key: string, value: any): Promise<Provider> {
    const purchaseUnit = await Provider.findOne({ where: { [key]: value } });
    return purchaseUnit;
  }

  async update(params: ProviderDto, id: number): Promise<void> {
    const providerComplement = params.brands
      ?.filter((item) => item)
      ?.map((name) => {
        return ProviderComplement.create({ name });
      });

    const data = {
      ...params,
      brands: providerComplement,
    };

    const unit = await Provider.findOne(id, { relations: ['brands'] });
    const manager = getManager();
    await manager.transaction(async (transactionalEntityManager) => {
      await transactionalEntityManager.remove(unit.complements);
      const unitToSave = Object.assign(unit, data);
      await transactionalEntityManager.save(unitToSave);
    });
  }

  async changeStatus(id: number, status: boolean): Promise<void> {
    const provider = await Provider.update(id, { status });
    if (provider.affected === 0) {
      throw new EntityNotFoundError(Provider, id);
    }
  }

  async findPaginated(paramsProvider: ProviderParamsDto): Promise<[Provider[], number]> {
    const { page, limit, document, name, codeErp, produto } = paramsProvider;

    const filterWhere: Record<string, any> = {};

    if (name) {
      filterWhere.name = Like(`%${name}%`);
    }

    if (produto) {
      filterWhere.produto = Like(`%${produto}%`);
    }

    if (codeErp) {
      filterWhere.codeErp = codeErp;
    }

    const filter = {
      where: (qb) => {
        qb.where(document ? `document = '${document}'` : {});
        if (Object.keys(filterWhere).length) {
          qb.andWhere(filterWhere);
        }
      },
      take: limit,
      skip: (page - 1) * limit,
      join: {
        alias: 'Provider',
        innerJoin: {
          Complements: 'Provider.complements',
        },
      },
    };
    const providers = await Provider.findAndCount({ relations: ['complements'], ...filter });
    return providers;
  }
}
