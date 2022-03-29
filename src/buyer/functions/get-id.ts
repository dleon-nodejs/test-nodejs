import { Connection } from 'typeorm';

import { ValidatedAPIGatewayProxyEvent } from '@/shared/interfaces/api-gateway.interface';
import { httpMiddyfy } from '@/shared/utils/http-middy.util';
import { role } from '@/shared/middlewares/role.middleware';

import { BuyerDto } from '@/buyer/types/buyer.type';
import { createDbConnection } from '@/shared/utils/database.util';
import { Buyer } from '@/buyer/entities/buyer.entity';
import { ROLE_BUYER_MANAGER } from '@/buyer/config/buyer.config';
import { BuyerService } from '@/buyer/services/buyer.service';

async function getIdHandler(event: ValidatedAPIGatewayProxyEvent<null>): Promise<BuyerDto> {
  let connection: Connection;
  try {
    connection = await createDbConnection([Buyer]);
    const { id } = event.pathParameters;
    const buyer = await new BuyerService().getById(Number(id));
    return buyer;
  } finally {
    connection && (await connection.close());
  }
}

export const handler = httpMiddyfy(getIdHandler).use(role([ROLE_BUYER_MANAGER]));
