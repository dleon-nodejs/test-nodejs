import { Connection } from 'typeorm';

import { ValidatedAPIGatewayProxyEvent } from '@/shared/interfaces/api-gateway.interface';
import { createDbConnection } from '@/shared/utils/database.util';
import { httpMiddyfy } from '@/shared/utils/http-middy.util';
import { validate } from '@/shared/middlewares/validate.middleware';
import { role } from '@/shared/middlewares/role.middleware';

import { materialChangeStatusSchema } from '@/material/functions/schema/material.schema';
import { MaterialStatusDto } from '@/material/types/material.type';
import { Material } from '@/material/entities/material.entity';
import { ROLE_MATERIAL_MANAGER } from '@/material/config/material.config';
import { MaterialService } from '@/material/services/material.service';
import { PurchaseUnit } from '@/purchase-unit/entities/purchase-unit.entity';
import { PurchaseUnitVariation } from '@/purchase-unit/entities/purchase-unit-variation.entity';
import { Buyer } from '@/buyer/entities/buyer.entity';
import { Category } from '@/category/entities/category.entity';
import { ProductionPhase } from '@/production-phase/entities/production-phase.entity';

async function changeStatusHandler(event: ValidatedAPIGatewayProxyEvent<MaterialStatusDto>): Promise<void> {
  let connection: Connection;

  try {
    connection = await createDbConnection([Material, PurchaseUnit, PurchaseUnitVariation, Buyer, Category, ProductionPhase]);
    const { status } = event.body || null;
    const { id } = event.pathParameters;
    await new MaterialService().changeStatus(Number(id), status);
  } finally {
    connection && (await connection.close());
  }
}

export const handler = httpMiddyfy(changeStatusHandler)
  .use(role([ROLE_MATERIAL_MANAGER]))
  .use(validate({ body: materialChangeStatusSchema }));
