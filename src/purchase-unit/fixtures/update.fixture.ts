import { PurchaseUnitVariation } from '../entities/purchase-unit-variation.entity';
import { PurchaseUnit } from '../entities/purchase-unit.entity';
import { PurchaseUnitDto } from '../types/purchase-unit.type';

export const updateFindByIdMock: PurchaseUnit = {
  id: 1,
  name: 'nameMock',
  status: true,
  description: 'descriptionMock',
} as PurchaseUnit;

export const updateResultMock: PurchaseUnitDto = {
  id: 1,
  name: 'nameMock',
  description: 'descriptionMock',
  variations: ['variationUmMock', 'variationDoisMock', 'variationTresMock', 'variationQuatroMock'],
  status: true,
};

export const updateWithoutDescriptionMock: PurchaseUnitDto = {
  id: 1,
  name: 'nameMock',
  description: '',
  variations: ['testVariationMock'],
  status: true,
};

export const updateWithoutVariationsMock: PurchaseUnitDto = {
  id: 1,
  name: 'nameMock',
  description: 'descriptionMock',
  variations: [],
  status: true,
};

export const updateVariationMock: PurchaseUnitVariation[] = [
  {
    id: 19,
    variation: 'variationMock',
    purchaseUnitId: 2,
    createdAt: new Date(2021, 6, 27),
  } as PurchaseUnitVariation,
];

export const updatePurchaseUnitMock: PurchaseUnitDto = {
  id: 1,
  name: 'nameMock',
  description: 'descriptionMock',
  variations: ['variationUmMock', 'variationDoisMock', 'variationTresMock', 'variationQuatroMock'],
  status: true,
};

export const updateFindByNameMock: PurchaseUnit[] = [
  {
    id: 5,
    name: 'nameMock',
    status: true,
    description: null,
    createdAt: new Date(2021, 6, 27),
    updatedAt: new Date(2021, 6, 27),
  } as PurchaseUnit,
];
