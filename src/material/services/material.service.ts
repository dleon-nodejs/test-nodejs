import { DecorateAll } from 'decorate-all';

import { BaseService } from '@/shared/services/base.service';
import { EntityCatch } from '@/shared/decorators/entity-catch.decorator';
import { Material } from '@/material/entities/material.entity';
import {
  MaterialDto,
  MaterialRegisterDto,
  MaterialPaginatedDto,
  MaterialParamsDto,
  MaterialPaginatedData,
  MaterialCsvDto,
} from '@/material/types/material.type';
import { materialAdapter } from '@/material/utils/material-adapter.util';
import { MaterialRepository } from '@/material/repositories/material.repository';
import { ERR_MATERIAL_DUPLICATE, ERR_MATERIAL_NOT_EXISTS } from '@/material/config/material.config';
import { throwError } from '@/shared/utils/throw-error.util';
import { ERR_INVALID_ID } from '@/shared/errors/app.error';
import { BuyerService } from '@/buyer/services/buyer.service';
import { CategoryService } from '@/category/services/category.service';
import { PurchaseUnitService } from '@/purchase-unit/services/purchase-unit.service';
import { ERR_BUYER_INACTIVE } from '@/buyer/config/buyer.config';
import { ERR_CATEGORY_INACTIVE } from '@/category/config/category.config';
import { ERR_PURCHASE_UNIT_INACTIVE } from '@/purchase-unit/config/purchase-unit.config';
import { ERR_PRODUCTION_PHASE_INACTIVE } from '@/production-phase/config/production-phase.error';
import { ProductionPhaseService } from '@/production-phase/services/production-phase.service';

@DecorateAll(
  EntityCatch({
    notExists: ERR_MATERIAL_NOT_EXISTS,
    duplicate: ERR_MATERIAL_DUPLICATE,
  }),
  { deep: true, exclude: ['adapter'] }
)
export class MaterialService extends BaseService<Material, MaterialDto, MaterialRegisterDto> {
  protected repository = new MaterialRepository();

  public async changePrice(id: number, price: number): Promise<void> {
    if (Number.isNaN(id)) {
      throwError(ERR_INVALID_ID);
    }
    await this.repository.changePrice(id, price);
  }

  public async create(params: MaterialRegisterDto): Promise<void> {
    await this.validateComplements(params);
    await this.repository.create(params);
  }

  public async update(params: MaterialRegisterDto, id: number): Promise<void> {
    if (Number.isNaN(id)) {
      throwError(ERR_INVALID_ID);
    }
    await this.validateComplements(params);
    const newParams = params.datePrice ? params : { ...params, datePrice: new Date() };
    await this.repository.update(newParams, id);
  }

  private async validateComplements(item: MaterialRegisterDto): Promise<void> {
    const promiseBuyer = item.buyerId && new BuyerService().getById(item.buyerId);
    const promiseCategory = new CategoryService().getById(item.categoryId);
    const promisePurchaseUnit = new PurchaseUnitService().getById(item.purchaseUnitId);
    const promiseProductionPahse = item.productionPhaseId && new ProductionPhaseService().getById(item.productionPhaseId);
    const [buyer, category, purchaseUnit, productionPhase] = await Promise.all([
      promiseBuyer,
      promiseCategory,
      promisePurchaseUnit,
      promiseProductionPahse,
    ]);

    if (buyer && !buyer.status) {
      throwError(ERR_BUYER_INACTIVE);
    }
    if (!category.status) {
      throwError(ERR_CATEGORY_INACTIVE);
    }
    if (!purchaseUnit.status) {
      throwError(ERR_PURCHASE_UNIT_INACTIVE);
    }
    if (productionPhase && !productionPhase.status) {
      throwError(ERR_PRODUCTION_PHASE_INACTIVE);
    }
  }

  public adapter(item: Material): MaterialDto {
    return materialAdapter(item);
  }

  public async findPaginatedParams(paramsMaterial: MaterialParamsDto): Promise<MaterialPaginatedDto> {
    const [materials, total] = await new MaterialRepository().findPaginated(paramsMaterial);
    const resultDataMaterial: MaterialPaginatedDto = {
      limit: paramsMaterial.limit,
      page: paramsMaterial.page,
      totalItems: total,
      data: materials.map(function (item: Material): MaterialPaginatedData {
        return {
          id: item.id,
          code: item.code,
          name: item.name,
          purchaseUnitId: item.purchaseUnitId,
          productionPhaseId: item.productionPhaseId,
          purchaseUnitName: item.purchaseUnit.name,
          categoryId: item.categoryId,
          leadTimeDay: item.leadTimeDay,
          buyerId: item.buyerId,
          price: item.price,
          priceService: item.priceService,
          verifiable: item.verifiable,
        };
      }),
    };
    return resultDataMaterial;
  }

  public async listCsv(): Promise<MaterialCsvDto[]> {
    const materialCsvResult = await new MaterialRepository().findAllWithRelations();
    return materialCsvResult.map(function (item: Material): MaterialCsvDto {
      return {
        code: item.code,
        name: item.name,
        priceService: item.priceService.toString(),
        verifiable: item.verifiable ? '1' : '0',
        buyer: item.buyer?.email,
        category: item.category.name,
        purchaseUnit: item.purchaseUnit.name,
        productionPhase: item.productionPhase?.name,
        leadTimeDay: item.leadTimeDay.toString(),
        price: item.price.toString(),
      };
    });
  }
}
