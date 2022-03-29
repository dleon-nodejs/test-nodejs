import { PurchaseUnitDto } from '../types/purchase-unit.type';
import { PurchaseUnit } from '../entities/purchase-unit.entity';
import { PurchaseUnitVariation } from '../entities/purchase-unit-variation.entity';

export const createResultMock: PurchaseUnitDto = {
  id: 1,
  name: 'nameMock',
  description: 'descriptionMock',
  variations: ['variationUmMock', 'variationDoisMock', 'variationTresMock', 'variationQuatroMock'],
  status: true,
};

export const createAlreadyExistsMock: PurchaseUnit[] = [
  {
    id: 5,
    name: 'nameMock',
    status: true,
    description: null,
    createdAt: new Date(2021, 6, 27),
    updatedAt: new Date(2021, 6, 27),
  } as PurchaseUnit,
];

export const createWithoutDescMock: PurchaseUnitDto = {
  id: 1,
  name: 'nameMock',
  description: '',
  variations: [],
  status: true,
};

export const createWithoutVariationsMock: PurchaseUnitDto = {
  id: 1,
  name: 'nameMock',
  description: 'descriptionMock',
  variations: [],
  status: true,
};

export const createAlreadVariationMock: PurchaseUnitVariation[] = [
  {
    id: 1,
    variation: 'variationMock',
    purchaseUnitId: 2,
    createdAt: new Date(2021, 6, 27),
  } as PurchaseUnitVariation,
];
