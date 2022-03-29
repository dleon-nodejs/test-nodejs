import { Connection } from 'typeorm';

import { ValidatedAPIGatewayProxyEvent } from '@/shared/interfaces/api-gateway.interface';
import { createDbConnection } from '@/shared/utils/database.util';
import { validate } from '@/shared/middlewares/validate.middleware';
import { role } from '@/shared/middlewares/role.middleware';

import { BuyerStatusDto } from '@/buyer/types/buyer.type';
import { Buyer } from '@/buyer/entities/buyer.entity';
import { httpMiddyfy } from '@/shared/utils/http-middy.util';
import { buyerStatusSchema } from '@/buyer/functions/schema/buyer.schema';
import { ROLE_BUYER_MANAGER } from '@/buyer/config/buyer.config';
import { BuyerService } from '../services/buyer.service';

export async function changeStatusHandler(event: ValidatedAPIGatewayProxyEvent<BuyerStatusDto>): Promise<void> {
  let connection: Connection;
  try {
    connection = await createDbConnection([Buyer]);
    const { status } = event.body;
    const { id } = event.pathParameters;
    await new BuyerService().changeStatus(Number(id), status);
  } finally {
    connection && (await connection.close());
  }
}

export const handler = httpMiddyfy(changeStatusHandler)
  .use(validate({ body: buyerStatusSchema }))
  .use(role([ROLE_BUYER_MANAGER]));
