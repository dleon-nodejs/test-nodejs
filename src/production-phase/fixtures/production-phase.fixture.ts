import { ProductionPhase } from '@/production-phase/entities/production-phase.entity';
import { ProductionPhaseDto } from '@/production-phase/types/production-phase.type';

export const productionPhaseFormattedItemFixture: ProductionPhaseDto = {
  id: 1,
  name: 'Madeira',
  description: 'Madeira de carvalho',
  status: true,
};
export const productionPhaseItemFixture: ProductionPhase = {
  id: 1,
  name: 'Madeira',
  description: 'Madeira de carvalho',
  status: true,
  createdAt: new Date(8, 9, 2021),
  updatedAt: new Date(8, 9, 2021),
} as ProductionPhase;
