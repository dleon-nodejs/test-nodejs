import { BuyerService } from '@/buyer/services/buyer.service';
import { BuyerComplementDto } from '@/buyer/types/buyer.type';
import { CategoryService } from '@/category/services/category.service';
import { CategoryComplementDto } from '@/category/types/category.type';
import { ProductionPhaseService } from '@/production-phase/services/production-phase.service';
import { ProductionPhaseComplementDto } from '@/production-phase/types/production-phase.type';
import { PurchaseUnitService } from '@/purchase-unit/services/purchase-unit.service';
import { PurchaseUnitComplementDto } from '@/purchase-unit/types/purchase-unit.type';
import { MaterialComplementsDto } from '../types/material.type';

export async function listMaterialComplements(): Promise<MaterialComplementsDto> {
  const promisseCategory = listComplementCategory();
  const promisseBuyer = listComplementBuyer();
  const promissePurchaseUnit = listPurchaseUnit();
  const promisseProductionPhase = listComplementProductionPhase();

  const [categories, buyers, purchaseUnits, productionPhases] = await Promise.all([
    promisseCategory,
    promisseBuyer,
    promissePurchaseUnit,
    promisseProductionPhase,
  ]);

  const dataModules: MaterialComplementsDto = {
    categories,
    buyers,
    purchaseUnits,
    productionPhases,
  };

  return dataModules;
}

async function listComplementCategory(): Promise<CategoryComplementDto[]> {
  const resultCategory = await new CategoryService().listActive();
  return resultCategory.map(function (item): CategoryComplementDto {
    return {
      id: item.id,
      name: item.name,
    };
  });
}

async function listPurchaseUnit(): Promise<PurchaseUnitComplementDto[]> {
  const resultPurchaseUnit = await new PurchaseUnitService().listActive();
  return resultPurchaseUnit.map(function (item): PurchaseUnitComplementDto {
    return {
      id: item.id,
      name: item.name,
    };
  });
}

async function listComplementBuyer(): Promise<BuyerComplementDto[]> {
  const resultBuyer = await new BuyerService().listActive();
  return resultBuyer.map(function (item): BuyerComplementDto {
    return {
      id: item.id,
      name: item.name,
      email: item.email,
    };
  });
}

async function listComplementProductionPhase(): Promise<ProductionPhaseComplementDto[]> {
  const resultProductionPhase = await new ProductionPhaseService().listActive();
  return resultProductionPhase.map(function (item): ProductionPhaseComplementDto {
    return {
      id: item.id,
      name: item.name,
    };
  });
}
