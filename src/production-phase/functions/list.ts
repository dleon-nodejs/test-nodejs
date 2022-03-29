import { Connection } from 'typeorm';

import { ValidatedAPIGatewayProxyEvent } from '@/shared/interfaces/api-gateway.interface';
import { role } from '@/shared/middlewares/role.middleware';
import { httpMiddyfy } from '@/shared/utils/http-middy.util';
import { ROLE_PRODUCTION_PHASE_MANAGE } from '@/production-phase/config/production-phase.config';
import { ProductionPhase } from '@/production-phase/entities/production-phase.entity';
import { ProductionPhaseService } from '../services/production-phase.service';
import { ProductionPhaseCreate } from '@/production-phase/types/production-phase.type';
import { createDbConnection } from '@/shared/utils/database.util';

async function listHandler(event: ValidatedAPIGatewayProxyEvent<null>): Promise<ProductionPhaseCreate[]> {
  let connection: Connection;
  const { name } = event.queryStringParameters;

  try {
    connection = await createDbConnection([ProductionPhase]);
    const data = await new ProductionPhaseService().list(name);
    return data;
  } finally {
    connection && (await connection.close());
  }
}

export const handler = httpMiddyfy(listHandler).use(role([ROLE_PRODUCTION_PHASE_MANAGE]));
