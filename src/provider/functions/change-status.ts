import 'reflect-metadata';
import { Connection } from 'typeorm';

import { ValidatedAPIGatewayProxyEvent } from '@/shared/interfaces/api-gateway.interface';
import { createDbConnection } from '@/shared/utils/database.util';
import { httpMiddyfy } from '@/shared/utils/http-middy.util';
import { validate } from '@/shared/middlewares/validate.middleware';
import { role } from '@/shared/middlewares/role.middleware';
import { ProviderComplement } from '../entities/provider-complement.entity';
import { Provider } from '../entities/provider.entity';
import { ROLE_PROVIDER_MANAGER } from '../config/provider.config';
import { providerChangeStatusSchema } from './schema/provider.schema';
import { ProviderService } from '../services/provider.service';
import { ProviderStatus } from '@/provider/types/provider.type';

async function changeStatusHandler(event: ValidatedAPIGatewayProxyEvent<ProviderStatus>): Promise<void> {
  const { id } = event.pathParameters;
  let connection: Connection;

  try {
    connection = await createDbConnection([ProviderComplement, Provider]);
    const { status } = event.body || null;
    await new ProviderService().changeStatus(Number(id), status);
  } finally {
    connection && (await connection.close());
  }
}

export const handler = httpMiddyfy(changeStatusHandler)
  .use(validate({ body: providerChangeStatusSchema }))
  .use(role([ROLE_PROVIDER_MANAGER]));
