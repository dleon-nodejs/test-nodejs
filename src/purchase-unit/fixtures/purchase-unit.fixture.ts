import { PurchaseUnit } from '../entities/purchase-unit.entity';
import { PurchaseUnitDto } from '../types/purchase-unit.type';

export const purchaseUnitItemFixture: PurchaseUnit = {
  id: 1,
  name: 'm2',
  status: true,
  description: 'Metro quadrado',
  variations: [
    {
      variation: 'm²',
    },
    {
      variation: 'm quadrado',
    },
  ],
} as PurchaseUnit;

export const purchaseUnitFormattedItemFixture: PurchaseUnitDto = {
  id: 1,
  name: 'm2',
  description: 'Metro quadrado',
  variations: ['m²', 'm quadrado'],
  status: true,
};

export const purchaseUnitWithoutVariationItemFixture: PurchaseUnit = {
  id: 1,
  name: 'metro',
  status: true,
  variations: null,
  description: 'Metro',
} as PurchaseUnit;

export const purchaseUnitFormattedWithoutVariationItemFixture: PurchaseUnitDto = {
  id: 1,
  name: 'metro',
  variations: [],
  description: 'Metro',
  status: true,
};

export const purchaseUnitWithoutDescriptionItemFixture: PurchaseUnit = {
  id: 1,
  name: 'metro',
  status: true,
  variations: [
    {
      variation: 'm²',
    },
    {
      variation: 'm quadrado',
    },
  ],
  description: null,
} as PurchaseUnit;

export const purchaseUnitFormattedWithoutDescriptionItemFixture: PurchaseUnitDto = {
  id: 1,
  name: 'metro',
  variations: ['m²', 'm quadrado'],
  description: '',
  status: true,
};
