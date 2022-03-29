import { ERR_PRODUCTION_PHASE_DUPLICATE, ERR_PRODUCTION_PHASE_NOT_EXISTS } from '@/production-phase/config/production-phase.error';

import { ProductionPhaseCreateDto, ProductionPhaseDto } from '@/production-phase/types/production-phase.type';
import { ProductionPhase } from '@/production-phase/entities/production-phase.entity';
import { DecorateAll } from 'decorate-all';
import { EntityCatch } from '@/shared/decorators/entity-catch.decorator';
import { BaseService } from '@/shared/services/base.service';
import { ProductionPhaseRepository } from '../repositories/production-phase.repository';

@DecorateAll(
  EntityCatch({
    notExists: ERR_PRODUCTION_PHASE_NOT_EXISTS,
    duplicate: ERR_PRODUCTION_PHASE_DUPLICATE,
  }),
  { deep: true, exclude: ['adapter'] }
)
export class ProductionPhaseService extends BaseService<ProductionPhase, ProductionPhaseDto, ProductionPhaseCreateDto> {
  protected repository = new ProductionPhaseRepository();

  public adapter(productionPhase: ProductionPhase): ProductionPhaseDto {
    return {
      id: productionPhase.id,
      name: productionPhase.name,
      description: productionPhase.description || '',
      status: productionPhase.status,
    };
  }
}
