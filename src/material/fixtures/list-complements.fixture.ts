import { BuyerDto } from '@/buyer/types/buyer.type';
import { CategoryDto } from '@/category/types/category.type';
import { ProductionPhaseDto } from '@/production-phase/types/production-phase.type';
import { PurchaseUnitDto } from '@/purchase-unit/types/purchase-unit.type';
import { MaterialComplementsDto } from '../types/material.type';

export const categoryComplementFixture: CategoryDto[] = [
  {
    id: 1,
    name: 'madeiras',
    description: '',
    status: true,
  },
];

export const buyerComplementFixture: BuyerDto[] = [
  {
    id: 1,
    name: 'José',
    email: 'jose@email.com',
    phone: '1198888555',
    status: true,
  },
];

export const purchaseUnitComplementFixture: PurchaseUnitDto[] = [
  {
    id: 1,
    name: 'm2',
    description: 'Metro quadrado',
    variations: ['m²', 'm quadrado'],
    status: true,
  },
];

export const productionPhaseComplementFixture: ProductionPhaseDto[] = [
  {
    id: 1,
    name: 'madeira lisa',
    description: 'madeira eucalipto',
    status: true,
  },
];

export const materialComplementsFixture: MaterialComplementsDto = {
  categories: [
    {
      id: 1,
      name: 'madeiras',
    },
  ],

  purchaseUnits: [
    {
      id: 1,
      name: 'm2',
    },
  ],

  buyers: [
    {
      id: 1,
      name: 'José',
      email: 'jose@email.com',
    },
  ],

  productionPhases: [
    {
      id: 1,
      name: 'madeira lisa',
    },
  ],
};
