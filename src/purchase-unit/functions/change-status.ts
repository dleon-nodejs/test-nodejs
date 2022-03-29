import 'reflect-metadata';
import { Connection } from 'typeorm';

import { purchaseUnitChangeStatusSchema } from './schema/purchase-unit.schema';
import { PurchaseUnitService } from '../services/purchase-unit.service';
import { PurchaseUnitStatus } from '../types/purchase-unit.type';
import { ValidatedAPIGatewayProxyEvent } from '@/shared/interfaces/api-gateway.interface';
import { createDbConnection } from '@/shared/utils/database.util';
import { PurchaseUnitVariation } from '../entities/purchase-unit-variation.entity';
import { PurchaseUnit } from '../entities/purchase-unit.entity';
import { httpMiddyfy } from '@/shared/utils/http-middy.util';
import { validate } from '@/shared/middlewares/validate.middleware';
import { role } from '@/shared/middlewares/role.middleware';
import { ROLE_PURCHASE_UNIT_MANAGE } from '../config/purchase-unit.config';

async function changeStatusHandler(event: ValidatedAPIGatewayProxyEvent<PurchaseUnitStatus>): Promise<void> {
  const { id } = event.pathParameters;
  let connection: Connection;

  try {
    connection = await createDbConnection([PurchaseUnitVariation, PurchaseUnit]);
    const { status } = event.body || null;
    await new PurchaseUnitService().changeStatus(Number(id), status);
  } finally {
    connection && (await connection.close());
  }
}

export const handler = httpMiddyfy(changeStatusHandler)
  .use(validate({ body: purchaseUnitChangeStatusSchema }))
  .use(role([ROLE_PURCHASE_UNIT_MANAGE]));
