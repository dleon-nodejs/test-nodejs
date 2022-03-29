import { ValidatedAPIGatewayProxyEvent } from '@/shared/interfaces/api-gateway.interface';
import { role } from '@/shared/middlewares/role.middleware';
import { validate } from '@/shared/middlewares/validate.middleware';
import { createDbConnection } from '@/shared/utils/database.util';
import { httpMiddyfy } from '@/shared/utils/http-middy.util';
import 'reflect-metadata';
import { Connection } from 'typeorm';

import { providerSchema } from './schema/provider.schema';
import { ROLE_PROVIDER_MANAGER } from '../config/provider.config';
import { Provider } from '../entities/provider.entity';
import { ProviderService } from '@/provider/services/provider.service';
import { ProviderDto } from '../types/provider.type';
import { ProviderComplement } from '../entities/provider-complement.entity';

async function createHandler(event: ValidatedAPIGatewayProxyEvent<ProviderDto>) {
  let connection: Connection;

  try {
    connection = await createDbConnection([Provider, ProviderComplement]);
    const params = event.body || null;

    await new ProviderService().create(params);
  } finally {
    connection && (await connection.close());
  }
}

export const handler = httpMiddyfy(createHandler)
  .use(validate({ body: providerSchema }))
  .use(role([ROLE_PROVIDER_MANAGER]));
