import { ValidatedAPIGatewayProxyEvent } from '@/shared/interfaces/api-gateway.interface';
import { createDbConnection } from '@/shared/utils/database.util';
import { httpMiddyfy } from '@/shared/utils/http-middy.util';
import { Connection } from 'typeorm';
import { PurchaseUnitVariation } from '../entities/purchase-unit-variation.entity';
import { PurchaseUnit } from '../entities/purchase-unit.entity';
import { PurchaseUnitService } from '../services/purchase-unit.service';
import { PurchaseUnitDto } from '../types/purchase-unit.type';

async function getUnitHandler(event: ValidatedAPIGatewayProxyEvent<null>): Promise<PurchaseUnitDto> {
  const { id } = event.pathParameters;
  let connection: Connection;

  try {
    connection = await createDbConnection([PurchaseUnitVariation, PurchaseUnit]);
    const data = await new PurchaseUnitService().getById(Number(id));
    return data;
  } finally {
    connection && (await connection.close());
  }
}

export const handler = httpMiddyfy(getUnitHandler);
