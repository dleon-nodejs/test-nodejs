import { Connection } from 'typeorm';

import { ValidatedAPIGatewayProxyEvent } from '@/shared/interfaces/api-gateway.interface';
import { role } from '@/shared/middlewares/role.middleware';
import { validate } from '@/shared/middlewares/validate.middleware';
import { httpMiddyfy } from '@/shared/utils/http-middy.util';
import { ROLE_PRODUCTION_PHASE_MANAGE } from '@/production-phase/config/production-phase.config';
import { ProductionPhase } from '@/production-phase/entities/production-phase.entity';
import { ProductionPhaseDto } from '@/production-phase/types/production-phase.type';
import { productionPhaseSchema } from '@/production-phase/functions/schema/production-phase.schema';
import { createDbConnection } from '@/shared/utils/database.util';
import { ProductionPhaseService } from '../services/production-phase.service';

async function updateHandler(event: ValidatedAPIGatewayProxyEvent<ProductionPhaseDto>) {
  let connection: Connection;

  try {
    connection = await createDbConnection([ProductionPhase]);
    const params = event.body || null;
    const id = Number(event.pathParameters.id);

    await new ProductionPhaseService().update(params, id);
  } finally {
    connection && (await connection.close());
  }
}

export const handler = httpMiddyfy(updateHandler)
  .use(validate({ body: productionPhaseSchema }))
  .use(role([ROLE_PRODUCTION_PHASE_MANAGE]));
