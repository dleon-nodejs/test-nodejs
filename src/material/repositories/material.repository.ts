import { EntityNotFoundError, UpdateResult, Like } from 'typeorm';

import { MaterialDto, MaterialParamsDto } from '@/material/types/material.type';
import { Material } from '@/material/entities/material.entity';
import { MaterialRegisterDto } from '@/material/types/material.type';
import { BaseRepository } from '@/shared/interfaces/base-repository.interface';
import { DecorateAll } from 'decorate-all';
import { DbCatch } from '@/shared/decorators/db-catch.decorator';

@DecorateAll(DbCatch)
export class MaterialRepository implements BaseRepository<Material, MaterialDto, MaterialRegisterDto> {
  async create(params: MaterialRegisterDto): Promise<void> {
    await Material.create(params).save();
  }

  async findAll({ name }: { name: string }): Promise<Material[]> {
    const filterByName = {
      where: {
        name: Like(`%${name}%`),
      },
      join: {
        alias: 'Material',
        innerJoin: { PurchaseUnit: 'Material.purchaseUnit', Category: 'Material.category', Buyer: 'Material.buyer' },
      },
    };
    const filter = name ? filterByName : {};
    const materials: Material[] = await Material.find(filter);
    return materials;
  }

  async findById(id: number): Promise<Material> {
    const material = await Material.findOneOrFail(id);
    return material;
  }

  async findOneByKey(key: string, value: any): Promise<Material> {
    const material = await Material.findOne({ where: { [key]: value } });
    return material;
  }

  async getByName(name: string): Promise<Material> {
    const material = Material.findOne({ where: { name } });
    return material;
  }

  async update(params: MaterialRegisterDto, id: number): Promise<void> {
    const material: UpdateResult = await Material.update(id, params);
    if (material.affected === 0) {
      throw new EntityNotFoundError(Material, id);
    }
  }

  async changePrice(id: number, price: number): Promise<void> {
    const datePrice = new Date();
    const material = await Material.update(id, { price, datePrice });
    if (material.affected === 0) {
      throw new EntityNotFoundError(Material, id);
    }
  }

  async changeStatus(id: number, status: boolean): Promise<void> {
    const material: UpdateResult = await Material.update(id, { status });
    if (material.affected === 0) {
      throw new EntityNotFoundError(Material, id);
    }
  }

  async findPaginated(paramsMaterial: MaterialParamsDto): Promise<[Material[], number]> {
    const { page, limit, name, code, buyerEmail } = paramsMaterial;

    const filterWhere: Record<string, any> = {};

    if (name) {
      filterWhere.name = Like(`%${name}%`);
    }

    if (code) {
      filterWhere.code = code;
    }

    const filter = {
      where: (qb) => {
        qb.where(buyerEmail ? `Buyer.email = '${buyerEmail}'` : {});
        if (Object.keys(filterWhere).length) {
          qb.andWhere(filterWhere);
        }
      },
      take: limit,
      skip: (page - 1) * limit,
      join: {
        alias: 'Material',
        innerJoin: {
          PurchaseUnit: 'Material.purchaseUnit',
        },
        leftJoin: {
          Buyer: 'Material.buyer',
        },
      },
    };
    const materials = await Material.findAndCount({ relations: ['buyer', 'purchaseUnit'], ...filter });
    return materials;
  }

  async findAllWithRelations(): Promise<Material[]> {
    const resultMaterial = await Material.find({
      relations: ['buyer', 'purchaseUnit', 'category', 'productionPhase'],
    });
    return resultMaterial;
  }
}
