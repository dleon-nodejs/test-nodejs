import { PurchaseUnit } from '../entities/purchase-unit.entity';

export const purchaseUnitInvalidIdMock = Number('abc1223');

export const purchaseUnitItemMock: PurchaseUnit = {
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
} as PurchaseUnit;

export const purchaseUnitTrueStatusMock = true;
export const purchaseUnitFalseStatusMock = false;
