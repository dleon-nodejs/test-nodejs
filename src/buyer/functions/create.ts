import { Connection } from 'typeorm';

import { ValidatedAPIGatewayProxyEvent } from '@/shared/interfaces/api-gateway.interface';
import { createDbConnection } from '@/shared/utils/database.util';
import { httpMiddyfy } from '@/shared/utils/http-middy.util';
import { role } from '@/shared/middlewares/role.middleware';
import { validate } from '@/shared/middlewares/validate.middleware';

import { BuyerCreateDto } from '@/buyer/types/buyer.type';
import { Buyer } from '@/buyer/entities/buyer.entity';
import { buyerSchema } from '@/buyer/functions/schema/buyer.schema';
import { ROLE_BUYER_MANAGER } from '@/buyer/config/buyer.config';
import { BuyerService } from '../services/buyer.service';

async function createHandler(event: ValidatedAPIGatewayProxyEvent<BuyerCreateDto>): Promise<void> {
  let connection: Connection;
  try {
    connection = await createDbConnection([Buyer]);
    const params = event.body || null;
    await new BuyerService().create(params);
  } finally {
    connection && (await connection.close());
  }
}

export const handler = httpMiddyfy(createHandler)
  .use(validate({ body: buyerSchema }))
  .use(role([ROLE_BUYER_MANAGER]));
