import { Connection } from 'typeorm';

import { ValidatedAPIGatewayProxyEvent } from '@/shared/interfaces/api-gateway.interface';
import { role } from '@/shared/middlewares/role.middleware';
import { validate } from '@/shared/middlewares/validate.middleware';
import { createDbConnection } from '@/shared/utils/database.util';
import { httpMiddyfy } from '@/shared/utils/http-middy.util';

import { materialSchema } from '@/material/functions/schema/material.schema';
import { Material } from '@/material/entities/material.entity';
import { MaterialDto } from '@/material/types/material.type';
import { ROLE_MATERIAL_MANAGER } from '@/material/config/material.config';
import { MaterialService } from '@/material/services/material.service';
import { PurchaseUnit } from '@/purchase-unit/entities/purchase-unit.entity';
import { PurchaseUnitVariation } from '@/purchase-unit/entities/purchase-unit-variation.entity';
import { Category } from '@/category/entities/category.entity';
import { Buyer } from '@/buyer/entities/buyer.entity';
import { ProductionPhase } from '@/production-phase/entities/production-phase.entity';

async function updateHandler(event: ValidatedAPIGatewayProxyEvent<MaterialDto>): Promise<void> {
  let connection: Connection;
  try {
    connection = await createDbConnection([Material, PurchaseUnit, PurchaseUnitVariation, Category, Buyer, ProductionPhase]);
    const params = event.body || null;
    const { id } = event.pathParameters;
    await new MaterialService().update(params, Number(id));
  } finally {
    connection && (await connection.close());
  }
}

export const handler = httpMiddyfy(updateHandler)
  .use(validate({ body: materialSchema }))
  .use(role([ROLE_MATERIAL_MANAGER]));
