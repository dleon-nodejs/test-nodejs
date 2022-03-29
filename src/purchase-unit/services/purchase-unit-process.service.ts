import { BaseProcessService } from '@/shared/services/base-process.service';
import { PURCHASE_UNIT_CSV_FIELDS } from '../config/purchase-unit.config';
import { PurchaseUnit } from '../entities/purchase-unit.entity';
import { purchaseUnitSchema } from '../functions/schema/purchase-unit.schema';
import { PurchaseUnitCreateDto, PurchaseUnitDto } from '../types/purchase-unit.type';
import { PurchaseUnitService } from './purchase-unit.service';

export class PurchaseUnitProcessService extends BaseProcessService<PurchaseUnit, PurchaseUnitDto, PurchaseUnitCreateDto> {
  protected schema = purchaseUnitSchema;
  protected csvHeaders = PURCHASE_UNIT_CSV_FIELDS;
  protected keyUnique = 'name';
  protected service = new PurchaseUnitService();

  normalize(row): PurchaseUnitDto {
    const purchaseUnit = { ...row } as PurchaseUnitDto;
    if (typeof row.variations === 'string') {
      purchaseUnit.variations = row.variations.split(',');
    }
    return purchaseUnit;
  }
}
