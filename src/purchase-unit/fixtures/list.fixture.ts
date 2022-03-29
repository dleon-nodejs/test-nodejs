import { PurchaseUnit } from '../entities/purchase-unit.entity';
import { PurchaseUnitDto } from '../types/purchase-unit.type';

export const purchaseUnitListMock: PurchaseUnit[] = [
  {
    id: 67812,
    name: 'm2',
    description: 'Metro quadrado',
    status: true,
    variations: [
      {
        variation: 'm²',
      },
      {
        variation: 'm quadrado',
      },
    ],
  } as PurchaseUnit,
];

export const purchaseUnitFormattedListMock: PurchaseUnitDto[] = [
  {
    id: 67812,
    name: 'm2',
    description: 'Metro quadrado',
    variations: ['m²', 'm quadrado'],
    status: true,
  },
];

export const purchaseUnitListWithoutVariationMock: PurchaseUnit[] = [
  {
    id: 67812,
    name: 'm2',
    description: 'Metro quadrado',
    variations: null,
    status: true,
  } as PurchaseUnit,
];

export const purchaseUnitFormattedListWithoutVariationMock: PurchaseUnitDto[] = [
  {
    id: 67812,
    name: 'm2',
    description: 'Metro quadrado',
    variations: [],
    status: true,
  },
];

export const purchaseUnitListWithoutDescriptionMock: PurchaseUnit[] = [
  {
    id: 67812,
    name: 'm2',
    description: null,
    variations: [
      {
        variation: 'm²',
      },
      {
        variation: 'm quadrado',
      },
    ],
    status: true,
  } as PurchaseUnit,
];

export const purchaseUnitFormattedListWithoutDescriptionMock: PurchaseUnitDto[] = [
  {
    id: 67812,
    name: 'm2',
    description: '',
    variations: ['m²', 'm quadrado'],
    status: true,
  },
];

export const purchaseUnitNameMock = 'm2';
