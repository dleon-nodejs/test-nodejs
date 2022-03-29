import 'reflect-metadata';
import { Connection } from 'typeorm';

import { ValidatedAPIGatewayProxyEvent } from '@/shared/interfaces/api-gateway.interface';
import { httpMiddyfy } from '@/shared/utils/http-middy.util';
import { role } from '@/shared/middlewares/role.middleware';
import { createDbConnection } from '@/shared/utils/database.util';
import { ProviderService } from '../services/provider.service';
import { ROLE_PROVIDER_MANAGER } from '../config/provider.config';
import { ProviderComplement } from '../entities/provider-complement.entity';
import { Provider } from '../entities/provider.entity';
import { ProviderPaginatedDto, ProviderParamsDto } from '../types/provider.type';

async function listHandler(event: ValidatedAPIGatewayProxyEvent<null>): Promise<ProviderPaginatedDto> {
  let connection: Connection;
  const { name, page, limit, document, codeErp, produto } = event.queryStringParameters;
  const paramsProvider: ProviderParamsDto = {
    page: Number(page),
    limit: Number(limit),
    document,
    name,
    codeErp,
    produto,
  };

  try {
    connection = await createDbConnection([ProviderComplement, Provider]);
    const data = await new ProviderService().findPaginatedParams(paramsProvider);
    return data;
  } finally {
    connection && (await connection.close());
  }
}

export const handler = httpMiddyfy(listHandler).use(role([ROLE_PROVIDER_MANAGER]));
