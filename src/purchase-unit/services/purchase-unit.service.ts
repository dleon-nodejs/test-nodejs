import {
  ERR_PURCHASE_UNIT_DUPLICATE,
  ERR_PURCHASE_UNIT_NOT_EXISTS,
  ERR_PURCHASE_UNIT_VARIATION_DUPLICATE,
} from '@/purchase-unit/config/purchase-unit.config';
import { EntityCatch } from '@/shared/decorators/entity-catch.decorator';
import { BaseService } from '@/shared/services/base.service';
import { throwError } from '@/shared/utils/throw-error.util';
import { DecorateAll } from 'decorate-all';
import { PurchaseUnit } from '../entities/purchase-unit.entity';
import { PurchaseUnitRepository } from '../repositories/purchase-unit.repository';
import { PurchaseUnitCreateDto, PurchaseUnitDto } from '../types/purchase-unit.type';

@DecorateAll(
  EntityCatch({
    notExists: ERR_PURCHASE_UNIT_NOT_EXISTS,
    duplicate: ERR_PURCHASE_UNIT_DUPLICATE,
  }),
  { deep: true, exclude: ['adapter'] }
)
export class PurchaseUnitService extends BaseService<PurchaseUnit, PurchaseUnitDto, PurchaseUnitCreateDto> {
  protected repository = new PurchaseUnitRepository();

  public async listActive(): Promise<PurchaseUnitDto[]> {
    const purchaseUnits = await this.repository.findByActive();
    return purchaseUnits.map(this.adapter);
  }

  public adapter(purchaseUnit: PurchaseUnit): PurchaseUnitDto {
    return {
      id: purchaseUnit.id,
      name: purchaseUnit.name,
      description: purchaseUnit.description || '',
      variations: purchaseUnit.variations?.map((variation) => variation.variation) || [],
      status: purchaseUnit.status,
    };
  }

  public async create(params: PurchaseUnitCreateDto): Promise<void> {
    const variations = await this.normalizeAndValidVariations(params.name, params.variations);
    await this.repository.create({
      ...params,
      variations,
    });
  }

  public async update(params: PurchaseUnitDto, id: number): Promise<void> {
    if (Number.isNaN(id)) {
      throwError(ERR_PURCHASE_UNIT_NOT_EXISTS);
    }

    const variations = await this.normalizeAndValidVariations(params.name, params.variations, id);

    await this.repository.update(
      {
        ...params,
        variations,
      },
      id
    );
  }

  private async normalizeAndValidVariations(name: string, variations: string[] = [], id?: number): Promise<string[]> {
    let arrayVariation = [...variations];
    arrayVariation.push(name);

    arrayVariation = arrayVariation.map((items) => items.toLowerCase().trim()).filter((item) => item);
    arrayVariation = [...new Set(arrayVariation)];

    const existsPurchaseUnitVariation = await this.repository.findByVariation(arrayVariation, id);

    if (existsPurchaseUnitVariation.length) {
      throwError(ERR_PURCHASE_UNIT_VARIATION_DUPLICATE);
    }

    return arrayVariation;
  }
}
