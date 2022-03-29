import 'reflect-metadata';
import { Connection } from 'typeorm';

import { ValidatedAPIGatewayProxyEvent } from '@/shared/interfaces/api-gateway.interface';
import { httpMiddyfy } from '@/shared/utils/http-middy.util';
import { role } from '@/shared/middlewares/role.middleware';
import { createDbConnection } from '@/shared/utils/database.util';
import { ROLE_PURCHASE_UNIT_MANAGE } from '../config/purchase-unit.config';
import { PurchaseUnitVariation } from '../entities/purchase-unit-variation.entity';
import { PurchaseUnit } from '../entities/purchase-unit.entity';
import { PurchaseUnitService } from '../services/purchase-unit.service';
import { PurchaseUnitDto } from '../types/purchase-unit.type';

async function listHandler(event: ValidatedAPIGatewayProxyEvent<null>): Promise<PurchaseUnitDto[]> {
  let connection: Connection;
  const { name } = event.queryStringParameters;

  try {
    connection = await createDbConnection([PurchaseUnitVariation, PurchaseUnit]);
    const data = await new PurchaseUnitService().list(name);
    return data;
  } finally {
    connection && (await connection.close());
  }
}

export const handler = httpMiddyfy(listHandler).use(role([ROLE_PURCHASE_UNIT_MANAGE]));
