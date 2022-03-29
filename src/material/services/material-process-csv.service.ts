import { BaseProcessService } from '@/shared/services/base-process.service';
import { Material } from '@/material/entities/material.entity';
import { MaterialRegisterDto, MaterialCsvDto, MaterialDto } from '@/material/types/material.type';
import { MATERIAL_CSV_FIELDS } from '../config/material.config';
import { MaterialService } from './material.service';
import { materialSchema } from '../functions/schema/material.schema';
import { BuyerService } from '@/buyer/services/buyer.service';
import { CategoryService } from '@/category/services/category.service';
import { PurchaseUnitService } from '@/purchase-unit/services/purchase-unit.service';
import { ProductionPhaseService } from '@/production-phase/services/production-phase.service';
import { throwError } from '@/shared/utils/throw-error.util';
import { ERR_CATEGORY_NOT_EXISTS } from '@/category/config/category.config';
import { ERR_PURCHASE_UNIT_NOT_EXISTS } from '@/purchase-unit/config/purchase-unit.config';
import { dataToCSV } from '@/shared/utils/csv/csv.util';
import { streamToBuffer } from '@/shared/utils/stream-to-buffer.util';

export class MaterialProcessService extends BaseProcessService<Material, MaterialDto, MaterialRegisterDto> {
  protected schema = materialSchema;
  protected csvHeaders = MATERIAL_CSV_FIELDS;
  protected keyUnique = 'code';
  protected service = new MaterialService();

  private async getComplements(item: MaterialCsvDto): Promise<MaterialRegisterDto> {
    const promiseBuyer = new BuyerService().getOneByKey('email', item.buyer);
    const promiseCategory = new CategoryService().getOneByKey('name', item.category);
    const promisePurchaseUnit = new PurchaseUnitService().getOneByKey('name', item.purchaseUnit);
    const promiseProductionPhase = new ProductionPhaseService().getOneByKey('name', item.productionPhase);

    const [buyer, category, purchaseUnit, productionPhase] = await Promise.all([
      promiseBuyer,
      promiseCategory,
      promisePurchaseUnit,
      promiseProductionPhase,
    ]);

    return {
      code: item.code,
      name: item.name,
      leadTimeDay: Number(item.leadTimeDay),
      price: Number(item.price),
      priceService: Number(item.priceService),
      categoryId: category?.id,
      purchaseUnitId: purchaseUnit?.id,
      productionPhaseId: productionPhase?.id,
      buyerId: buyer?.id,
      verifiable: Number(item.verifiable) === 1 ? true : false,
    };
  }

  private validateInput(material: MaterialRegisterDto): void {
    if (!material.categoryId) {
      throwError(ERR_CATEGORY_NOT_EXISTS);
    }
    if (!material.purchaseUnitId) {
      throwError(ERR_PURCHASE_UNIT_NOT_EXISTS);
    }
    this.schema.validateSync(material);
  }

  protected async createOrUpdate(material: MaterialCsvDto): Promise<void> {
    const newMaterial = await this.getComplements(material);
    this.validateInput(newMaterial);

    const exists = await this.service.getOneByKey(this.keyUnique, newMaterial[this.keyUnique]);
    if (exists) {
      const priceUpdated = exists.price !== newMaterial.price;
      const datePrice = new Date();
      const newMaterialParams = priceUpdated ? { ...newMaterial, datePrice } : { ...newMaterial, datePrice: exists.datePrice };
      await this.service.update({ ...newMaterialParams }, exists['id']);
    } else {
      await this.service.create(newMaterial);
    }
  }

  public async getCsvFile(): Promise<Buffer> {
    const items = await this.service.listCsv();
    const stream = dataToCSV<MaterialCsvDto>(items, this.csvHeaders);
    const data = await streamToBuffer(stream);
    return data;
  }
}
