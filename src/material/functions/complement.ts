import { Connection } from 'typeorm';

import { role } from '@/shared/middlewares/role.middleware';
import { createDbConnection } from '@/shared/utils/database.util';
import { httpMiddyfy } from '@/shared/utils/http-middy.util';

import { Material } from '@/material/entities/material.entity';
import { ROLE_MATERIAL_MANAGER } from '@/material/config/material.config';
import { PurchaseUnit } from '@/purchase-unit/entities/purchase-unit.entity';
import { PurchaseUnitVariation } from '@/purchase-unit/entities/purchase-unit-variation.entity';
import { Category } from '@/category/entities/category.entity';
import { Buyer } from '@/buyer/entities/buyer.entity';
import { listMaterialComplements } from '../services/material-complement.service';
import { MaterialComplementsDto } from '../types/material.type';
import { ProductionPhase } from '@/production-phase/entities/production-phase.entity';

async function complementHandler(): Promise<MaterialComplementsDto> {
  let connection: Connection;
  try {
    connection = await createDbConnection([Material, PurchaseUnit, PurchaseUnitVariation, Category, Buyer, ProductionPhase]);
    const resultData = await listMaterialComplements();
    return resultData;
  } finally {
    connection && (await connection.close());
  }
}

export const handler = httpMiddyfy(complementHandler).use(role([ROLE_MATERIAL_MANAGER]));
