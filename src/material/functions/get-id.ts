import { Connection } from 'typeorm';

import { ValidatedAPIGatewayProxyEvent } from '@/shared/interfaces/api-gateway.interface';
import { role } from '@/shared/middlewares/role.middleware';
import { createDbConnection } from '@/shared/utils/database.util';
import { httpMiddyfy } from '@/shared/utils/http-middy.util';

import { Material } from '@/material/entities/material.entity';
import { MaterialDto } from '@/material/types/material.type';
import { ROLE_MATERIAL_MANAGER } from '@/material/config/material.config';
import { MaterialService } from '@/material/services/material.service';
import { Buyer } from '@/buyer/entities/buyer.entity';
import { Category } from '@/category/entities/category.entity';
import { PurchaseUnitVariation } from '@/purchase-unit/entities/purchase-unit-variation.entity';
import { PurchaseUnit } from '@/purchase-unit/entities/purchase-unit.entity';
import { ProductionPhase } from '@/production-phase/entities/production-phase.entity';

async function getIdHandler(event: ValidatedAPIGatewayProxyEvent<null>): Promise<MaterialDto> {
  let connection: Connection;
  try {
    connection = await createDbConnection([Material, PurchaseUnit, PurchaseUnitVariation, Category, Buyer, ProductionPhase]);
    const { id } = event.pathParameters;
    const material = await new MaterialService().getById(Number(id));
    return material;
  } finally {
    connection && (await connection.close());
  }
}

export const handler = httpMiddyfy(getIdHandler).use(role([ROLE_MATERIAL_MANAGER]));
