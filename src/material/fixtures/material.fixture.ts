import { BuyerDto } from '@/buyer/types/buyer.type';
import { CategoryDto } from '@/category/types/category.type';
import { ProductionPhaseDto } from '@/production-phase/types/production-phase.type';
import { PurchaseUnitDto } from '@/purchase-unit/types/purchase-unit.type';
import { Material } from '../entities/material.entity';
import { MaterialRegisterDto } from '../types/material.type';

export const materialRegisterId = 1;

export const materialRegisterInvalidId = Number('number123');

export const materialRegisterItemFixture: MaterialRegisterDto = {
  code: 'INS-12345',
  name: 'Madeira',
  purchaseUnitId: 1,
  productionPhaseId: 1,
  categoryId: 1,
  leadTimeDay: 2,
  buyerId: 1,
  price: 17.99,
  priceService: 0,
  verifiable: true,
};

export const materialRegisterItemCsvFixture: MaterialRegisterDto = {
  code: 'INS-12345',
  name: 'Madeira',
  purchaseUnitId: 1,
  productionPhaseId: 1,
  categoryId: 1,
  leadTimeDay: 2,
  buyerId: 1,
  price: 17.99,
  priceService: 0,
  verifiable: true,
  datePrice: new Date(8, 31, 2021),
};

export const materialRegisterWithoutBuyerItemFixture: MaterialRegisterDto = {
  code: 'INS-12345',
  name: 'Madeira',
  purchaseUnitId: 1,
  categoryId: 1,
  leadTimeDay: 2,
  price: 17.99,
  priceService: 0,
  verifiable: true,
};

export const categoryMaterialFixture: CategoryDto = {
  id: 1,
  name: 'madeiras',
  description: '',
  status: true,
};

export const categoryMaterialInactiveFixture: CategoryDto = {
  id: 1,
  name: 'madeiras',
  description: '',
  status: false,
};

export const buyerMaterialFixture: BuyerDto = {
  id: 1,
  name: 'José',
  email: 'jose@email.com',
  phone: '1198888555',
  status: true,
};

export const buyerMaterialInactiveFixture: BuyerDto = {
  id: 1,
  name: 'José',
  email: 'jose@email.com',
  phone: '1198888555',
  status: false,
};

export const purchaseUnitMaterialFixture: PurchaseUnitDto = {
  id: 1,
  name: 'm2',
  description: 'Metro quadrado',
  variations: ['m²', 'm quadrado'],
  status: true,
};

export const purchaseUnitMaterialInactiveFixture: PurchaseUnitDto = {
  id: 1,
  name: 'madeira lisa',
  description: 'madeira eucalipto',
  status: false,
};

export const productionPhaseMaterialFixture: ProductionPhaseDto = {
  id: 1,
  name: 'madeira lisa',
  description: 'madeira eucalipto',
  status: true,
};

export const productionPhaseMaterialInactiveFixture: ProductionPhaseDto = {
  id: 1,
  name: 'Madeira',
  description: 'Madeira de carvalho',
  status: false,
};

export const materialCsvFixture: Material[] = [
  {
    id: 1,
    code: 'INS-54321',
    name: 'Parafuso',
    leadTimeDay: 2,
    purchaseUnit: { name: 'pc' },
    category: { name: 'parafusos' },
    price: 33.33,
    priceService: 0,
    productionPhase: { name: '2_parafuso' },
    verifiable: true,
    purchaseUnitId: 1,
    productionPhaseId: 1,
    categoryId: 1,
    buyerId: 1,
  } as Material,
  {
    id: 1,
    code: 'INS-12345',
    name: 'Madeira',
    leadTimeDay: 2,
    purchaseUnit: { name: 'm2' },
    category: { name: 'madeiras' },
    price: 15.99,
    priceService: 0,
    productionPhase: { name: 'madeira' },
    verifiable: false,
    purchaseUnitId: 1,
    productionPhaseId: 1,
    categoryId: 1,
    buyerId: 1,
  } as Material,
];
