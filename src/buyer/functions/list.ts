import { Connection } from 'typeorm';

import { ValidatedAPIGatewayProxyEvent } from '@/shared/interfaces/api-gateway.interface';
import { createDbConnection } from '@/shared/utils/database.util';
import { httpMiddyfy } from '@/shared/utils/http-middy.util';
import { role } from '@/shared/middlewares/role.middleware';

import { BuyerDto } from '@/buyer/types/buyer.type';
import { Buyer } from '@/buyer/entities/buyer.entity';
import { BuyerService } from '@/buyer/services/buyer.service';
import { ROLE_BUYER_MANAGER } from '@/buyer/config/buyer.config';

async function listHandler(event: ValidatedAPIGatewayProxyEvent<null>): Promise<BuyerDto[]> {
  let connection: Connection;
  try {
    connection = await createDbConnection([Buyer]);
    const { name } = event.queryStringParameters;
    const response = await new BuyerService().list(name);
    return response;
  } finally {
    connection && (await connection.close());
  }
}

export const handler = httpMiddyfy(listHandler).use(role([ROLE_BUYER_MANAGER]));
