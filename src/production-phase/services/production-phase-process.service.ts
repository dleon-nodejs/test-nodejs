import { BaseProcessService } from '@/shared/services/base-process.service';
import { PRODUCTION_PHASE_CSV_FIELDS } from '../config/production-phase.config';
import { ProductionPhase } from '../entities/production-phase.entity';
import { productionPhaseSchema } from '../functions/schema/production-phase.schema';
import { ProductionPhaseCreateDto, ProductionPhaseDto } from '../types/production-phase.type';
import { ProductionPhaseService } from './production-phase.service';

export class ProductionPhaseProcessService extends BaseProcessService<ProductionPhase, ProductionPhaseDto, ProductionPhaseCreateDto> {
  protected schema = productionPhaseSchema;
  protected csvHeaders = PRODUCTION_PHASE_CSV_FIELDS;
  protected keyUnique = 'name';
  protected service = new ProductionPhaseService();
}
