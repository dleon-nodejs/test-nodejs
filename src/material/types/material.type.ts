import { BuyerComplementDto } from '@/buyer/types/buyer.type';
import { CategoryComplementDto } from '@/category/types/category.type';
import { PurchaseUnitComplementDto } from '@/purchase-unit/types/purchase-unit.type';
import { ProductionPhaseComplementDto } from '@/production-phase/types/production-phase.type';

export type MaterialDto = {
  id: number;
  code: string;
  name: string;
  purchaseUnitId: number;
  productionPhaseId?: number;
  categoryId: number;
  leadTimeDay: number;
  buyerId?: number;
  price: number;
  priceService: number;
  status: boolean;
  verifiable: boolean;
  datePrice?: Date;
  deletedAt?: Date;
};

export type MaterialCsvDto = {
  code: string;
  name: string;
  buyer?: string;
  category: string;
  purchaseUnit: string;
  productionPhase?: string;
  leadTimeDay: string;
  price: string;
  verifiable: string;
  priceService: string;
};

export type MaterialPaginatedDto = {
  page: number;
  limit: number;
  totalItems: number;
  data: MaterialPaginatedData[];
};

export type MaterialParamsDto = {
  buyerEmail?: string;
  code?: string;
  name?: string;
  page: number;
  limit: number;
};

export type MaterialRegisterDto = Omit<MaterialDto, 'id' | 'status' | 'deletedAt'>;

export type MaterialStatusDto = Pick<MaterialDto, 'status'>;

export type MaterialPriceDto = Pick<MaterialDto, 'price'>;

export type MaterialPaginatedData = Omit<MaterialDto, 'status'> & { purchaseUnitName: string };

export type MaterialComplementsDto = {
  categories: CategoryComplementDto[];
  purchaseUnits: PurchaseUnitComplementDto[];
  buyers: BuyerComplementDto[];
  productionPhases: ProductionPhaseComplementDto[];
};
