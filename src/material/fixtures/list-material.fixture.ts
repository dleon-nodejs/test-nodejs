import { Buyer } from '@/buyer/entities/buyer.entity';
import { MaterialPaginatedDto, MaterialParamsDto } from '../types/material.type';

export const materialParamsDtoFixture: MaterialParamsDto = {
  buyerEmail: 'testemock@gmail.com',
  code: '19004',
  name: 'teste12',
  page: 1,
  limit: 1,
};

export const materialParamsCodeFixture: MaterialParamsDto = {
  code: '19004',
  page: 1,
  limit: 1,
};

export const materialParamsPagesAboveFixture: MaterialParamsDto = {
  code: '19004',
  page: 2,
  limit: 1,
};

export const materialParamsNameFixture: MaterialParamsDto = {
  name: 'teste12',
  page: 1,
  limit: 1,
};

export const materialParamsEmailFixture: MaterialParamsDto = {
  buyerEmail: 'testemock@gmail.com',
  page: 1,
  limit: 1,
};

export const buyerReturnMaterialFixture: Buyer = {
  id: 2,
  name: 'testebuyer2',
  phone: null,
  status: true,
  email: 'testeemail2@buyer.com.br',
  createdAt: new Date(2021, 6, 27),
  deletedAt: null,
  updatedAt: new Date(2021, 6, 27),
} as Buyer;

export const materailListPageAboveFixture = [];

export const materailListPaginatedFixture: MaterialPaginatedDto = {
  limit: 1,
  page: 1,
  totalItems: 1,
  data: [
    {
      id: 50,
      code: 'INS-12345',
      leadTimeDay: 1,
      name: 'teste',
      purchaseUnitName: 'metro',
      price: 200,
      priceService: 300,
      purchaseUnitId: 1,
      productionPhaseId: 1,
      categoryId: 1,
      buyerId: 1,
      verifiable: true,
    },
  ],
};

export const materialListFilterFixture = [
  {
    id: 50,
    code: 'INS-12345',
    leadTimeDay: 1,
    name: 'teste',
    price: 200,
    priceService: 300,
    purchaseUnitId: 1,
    productionPhaseId: 1,
    purchaseUnitName: 'metro',
    categoryId: 1,
    buyerId: 1,
    verifiable: true,
    purchaseUnit: {
      name: 'metro',
    },
  },
];

export const materailListPaginatedAboveFixture: MaterialPaginatedDto = {
  limit: 1,
  page: 2,
  totalItems: 1,
  data: [],
};
