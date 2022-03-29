import { ValidatedAPIGatewayProxyEvent } from '@/shared/interfaces/api-gateway.interface';
import { createDbConnection } from '@/shared/utils/database.util';
import { httpMiddyfy } from '@/shared/utils/http-middy.util';
import { Connection } from 'typeorm';
import { ProviderComplement } from '../entities/provider-complement.entity';
import { Provider } from '../entities/provider.entity';
import { ProviderService } from '../services/provider.service';
import { ProviderDto } from '../types/provider.type';

async function getUnitHandler(event: ValidatedAPIGatewayProxyEvent<null>): Promise<ProviderDto> {
  const { id } = event.pathParameters;
  let connection: Connection;

  try {
    connection = await createDbConnection([ProviderComplement, Provider]);
    const data = await new ProviderService().getById(Number(id));
    return data;
  } finally {
    connection && (await connection.close());
  }
}

export const handler = httpMiddyfy(getUnitHandler);
