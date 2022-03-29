import { Connection } from 'typeorm';

import { ValidatedAPIGatewayProxyEvent } from '@/shared/interfaces/api-gateway.interface';
import { role } from '@/shared/middlewares/role.middleware';
import { validate } from '@/shared/middlewares/validate.middleware';
import { createDbConnection } from '@/shared/utils/database.util';
import { httpMiddyfy } from '@/shared/utils/http-middy.util';

import { materialSchema } from '@/material/functions/schema/material.schema';
import { MaterialRegisterDto } from '@/material/types/material.type';
import { Material } from '@/material/entities/material.entity';
import { ROLE_MATERIAL_MANAGER } from '@/material/config/material.config';
import { MaterialService } from '@/material/services/material.service';
import { Buyer } from '@/buyer/entities/buyer.entity';
import { Category } from '@/category/entities/category.entity';
import { PurchaseUnitVariation } from '@/purchase-unit/entities/purchase-unit-variation.entity';
import { PurchaseUnit } from '@/purchase-unit/entities/purchase-unit.entity';
import { ProductionPhase } from '@/production-phase/entities/production-phase.entity';

async function createHandler(event: ValidatedAPIGatewayProxyEvent<MaterialRegisterDto>): Promise<void> {
  let connection: Connection;
  try {
    connection = await createDbConnection([Material, PurchaseUnit, ProductionPhase, PurchaseUnitVariation, Category, Buyer]);
    const params = event.body || null;
    await new MaterialService().create(params);
  } finally {
    connection && (await connection.close());
  }
}

export const handler = httpMiddyfy(createHandler)
  .use(validate({ body: materialSchema }))
  .use(role([ROLE_MATERIAL_MANAGER]));
