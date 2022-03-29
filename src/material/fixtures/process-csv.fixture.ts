import { MaterialCsvDto, MaterialDto } from '@/material/types/material.type';
import { CategoryDto } from '@/category/types/category.type';
import { PurchaseUnitDto } from '@/purchase-unit/types/purchase-unit.type';
import { createFileFixture } from '@/shared/fixtures/utils/file/file.fixture';
import { Material } from '../entities/material.entity';

export const materialItemFixture: Material = {
  id: 1,
  code: 'INS-12345',
  name: 'teste',
  purchaseUnitId: 1,
  productionPhaseId: 1,
  categoryId: 1,
  leadTimeDay: 1,
  buyerId: 1,
  price: 200,
  priceService: 300,
  datePrice: new Date(8, 13, 2021),
  status: true,
  verifiable: true,
  createdAt: new Date(8, 13, 2021),
  updatedAt: new Date(8, 13, 2021),
} as Material;

export const materialFormattedItemFixture: MaterialDto = {
  id: 1,
  code: 'INS-12345',
  name: 'teste',
  purchaseUnitId: 1,
  productionPhaseId: 1,
  categoryId: 1,
  leadTimeDay: 1,
  buyerId: 1,
  price: 200,
  priceService: 300,
  datePrice: new Date(8, 13, 2021),
  status: true,
  deletedAt: undefined,
  verifiable: true,
};
export const invalidMaterialIdFixture = Number('abc123');
export const materialIdFixture = 1;
export const materialPriceFixture = 33.33;

export const formattedCsvStringFixture = `mp_original,nome_mp,UNID_COMPRA,categoria,leadtime (dia),Comprador email,PRECO_NOMINAL,SERVICO/unid_compra,Fase_produção,verificavel
INS-54321,Parafuso,pc,parafusos,2,,33.33,0,2_parafuso,1
INS-12345,Madeira,m2,madeiras,2,,15.99,0,madeira,0`;

export const createMaterialFileCsvFixture = (props = {}) =>
  createFileFixture({
    content: Buffer.from(formattedCsvStringFixture),
    filename: 'insumo.csv',
    ...props,
  });

export const materialListFormattedFixture: MaterialDto[] = [
  {
    id: 1,
    code: 'INS-12345',
    name: 'Madeira',
    purchaseUnitId: 1,
    productionPhaseId: 1,
    categoryId: 1,
    leadTimeDay: 2,
    buyerId: 1,
    price: 33.33,
    priceService: 0,
    status: true,
    verifiable: true,
    datePrice: new Date(8, 20, 2021),
  },
  {
    id: 2,
    code: 'INS-54321',
    name: 'Parafuso',
    purchaseUnitId: 2,
    productionPhaseId: 1,
    categoryId: 2,
    leadTimeDay: 2,
    buyerId: 2,
    price: 15.99,
    priceService: 0,
    status: true,
    verifiable: true,
    datePrice: new Date(8, 20, 2021),
  },
];

export const materialListCsvFixture: MaterialCsvDto[] = [
  {
    code: 'INS-54321',
    name: 'Parafuso',
    leadTimeDay: '2',
    purchaseUnit: 'pc',
    category: 'parafusos',
    price: '33.33',
    priceService: '0',
    productionPhase: '2_parafuso',
    verifiable: '1',
  },
  {
    code: 'INS-12345',
    name: 'Madeira',
    leadTimeDay: '2',
    purchaseUnit: 'm2',
    category: 'madeiras',
    price: '15.99',
    priceService: '0',
    productionPhase: 'madeira',
    verifiable: '0',
  },
];

export const materialListPriceChangedCsvFixture: MaterialDto[] = [
  {
    ...materialListFormattedFixture[0],
    price: 28.99,
  },
  {
    ...materialListFormattedFixture[1],
    price: 16.3,
  },
];

export const categoryListMaterialFixture: CategoryDto[] = [
  {
    id: 1,
    name: 'madeiras',
    description: '',
    status: true,
  },
  {
    id: 2,
    name: 'parafusos',
    description: '',
    status: true,
  },
];

export const purchaseUnitListMaterialFixture: PurchaseUnitDto[] = [
  {
    id: 1,
    name: 'pc',
    description: 'Peça',
    variations: ['peca', 'peça'],
    status: true,
  },
  {
    id: 2,
    name: 'm2',
    description: 'Metro quadrado',
    variations: ['m²', 'm quadrado'],
    status: true,
  },
];

export const successErrorCategoryNotExistsLogFixture = [
  {
    error: 'ERR_CATEGORY_NOT_EXISTS',
    line: 1,
  },
  {
    error: null,
    line: 2,
  },
];

export const successErrorPurchaseUnitNotExistsLogFixture = [
  {
    error: 'ERR_PURCHASE_UNIT_NOT_EXISTS',
    line: 1,
  },
  {
    error: null,
    line: 2,
  },
];

export const successLogFixture = [
  {
    error: null,
    line: 1,
  },
  {
    error: null,
    line: 2,
  },
];
