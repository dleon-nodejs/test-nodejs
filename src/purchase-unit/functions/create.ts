import { ValidatedAPIGatewayProxyEvent } from '@/shared/interfaces/api-gateway.interface';
import { role } from '@/shared/middlewares/role.middleware';
import { validate } from '@/shared/middlewares/validate.middleware';
import { createDbConnection } from '@/shared/utils/database.util';
import { httpMiddyfy } from '@/shared/utils/http-middy.util';
import 'reflect-metadata';
import { Connection } from 'typeorm';
import { ROLE_PURCHASE_UNIT_MANAGE } from '../config/purchase-unit.config';
import { PurchaseUnitVariation } from '../entities/purchase-unit-variation.entity';
import { PurchaseUnit } from '../entities/purchase-unit.entity';
import { PurchaseUnitService } from '../services/purchase-unit.service';
import { PurchaseUnitCreateDto } from '../types/purchase-unit.type';
import { purchaseUnitSchema } from './schema/purchase-unit.schema';

async function createHandler(event: ValidatedAPIGatewayProxyEvent<PurchaseUnitCreateDto>) {
  let connection: Connection;

  try {
    connection = await createDbConnection([PurchaseUnitVariation, PurchaseUnit]);
    const params = event.body || null;

    await new PurchaseUnitService().create(params);
  } finally {
    connection && (await connection.close());
  }
}

export const handler = httpMiddyfy(createHandler)
  .use(validate({ body: purchaseUnitSchema }))
  .use(role([ROLE_PURCHASE_UNIT_MANAGE]));
