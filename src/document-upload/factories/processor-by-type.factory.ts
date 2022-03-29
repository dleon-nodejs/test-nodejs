import { BuyerProcessService } from '@/buyer/services/buyer-process.service';
import { CategoryProcessService } from '@/category/services/category-process.service';
import { MaterialProcessService } from '@/material/services/material-process-csv.service';
import { ProductionPhaseProcessService } from '@/production-phase/services/production-phase-process.service';
import { PurchaseUnitProcessService } from '@/purchase-unit/services/purchase-unit-process.service';
import { ProcessorCsv } from '@/shared/interfaces/processor-csv.interface';
import { UploadType } from '../config/document-upload.enum';

export function getProcessorByTypeFactory(uploadType: UploadType): ProcessorCsv {
  const types = {
    [UploadType.buyer]: BuyerProcessService,
    [UploadType.category]: CategoryProcessService,
    [UploadType.productionPhase]: ProductionPhaseProcessService,
    [UploadType.purchaseUnit]: PurchaseUnitProcessService,
    [UploadType.material]: MaterialProcessService,
  };

  if (!types[uploadType]) {
    throw new Error('Processor not found');
  }

  return new types[uploadType]();
}
