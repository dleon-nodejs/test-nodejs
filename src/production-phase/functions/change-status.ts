import { Connection } from 'typeorm';

import { ProductionPhase } from '@/production-phase/entities/production-phase.entity';
import { ValidatedAPIGatewayProxyEvent } from '@/shared/interfaces/api-gateway.interface';
import { ProductionPhaseStatus } from '@/production-phase/types/production-phase.type';
import { productionPhaseChangeStatusSchema } from '@/production-phase/functions/schema/production-phase.schema';
import { role } from '@/shared/middlewares/role.middleware';
import { httpMiddyfy } from '@/shared/utils/http-middy.util';
import { validate } from '@/shared/middlewares/validate.middleware';
import { ProductionPhaseService } from '../services/production-phase.service';
import { ROLE_PRODUCTION_PHASE_MANAGE } from '@/production-phase/config/production-phase.config';
import { createDbConnection } from '@/shared/utils/database.util';

async function changeStatusHandler(event: ValidatedAPIGatewayProxyEvent<ProductionPhaseStatus>): Promise<void> {
  const { id } = event.pathParameters;
  let connection: Connection;

  try {
    connection = await createDbConnection([ProductionPhase]);
    const { status } = event.body || null;
    await new ProductionPhaseService().changeStatus(Number(id), status);
  } finally {
    connection && (await connection.close());
  }
}

export const handler = httpMiddyfy(changeStatusHandler)
  .use(validate({ body: productionPhaseChangeStatusSchema }))
  .use(role([ROLE_PRODUCTION_PHASE_MANAGE]));
