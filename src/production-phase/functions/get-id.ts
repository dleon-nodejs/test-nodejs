import { Connection } from 'typeorm';

import { ValidatedAPIGatewayProxyEvent } from '@/shared/interfaces/api-gateway.interface';
import { httpMiddyfy } from '@/shared/utils/http-middy.util';
import { ProductionPhase } from '@/production-phase/entities/production-phase.entity';
import { ProductionPhaseCreate } from '@/production-phase/types/production-phase.type';
import { createDbConnection } from '@/shared/utils/database.util';
import { ProductionPhaseService } from '../services/production-phase.service';

async function getByIdHandler(event: ValidatedAPIGatewayProxyEvent<null>): Promise<ProductionPhaseCreate> {
  const { id } = event.pathParameters;
  let connection: Connection;

  try {
    connection = await createDbConnection([ProductionPhase]);
    const data = await new ProductionPhaseService().getById(Number(id));
    return data;
  } finally {
    connection && (await connection.close());
  }
}

export const handler = httpMiddyfy(getByIdHandler);
