import { Connection } from 'typeorm';

import { ValidatedAPIGatewayProxyEvent } from '@/shared/interfaces/api-gateway.interface';
import { role } from '@/shared/middlewares/role.middleware';
import { validate } from '@/shared/middlewares/validate.middleware';
import { httpMiddyfy } from '@/shared/utils/http-middy.util';
import { ROLE_PRODUCTION_PHASE_MANAGE } from '@/production-phase/config/production-phase.config';
import { ProductionPhase } from '@/production-phase/entities/production-phase.entity';
import { ProductionPhaseDto } from '@/production-phase/types/production-phase.type';
import { createDbConnection } from '@/shared/utils/database.util';
import { productionPhaseSchema } from '@/production-phase/functions/schema/production-phase.schema';
import { ProductionPhaseService } from '../services/production-phase.service';

async function createHandler(event: ValidatedAPIGatewayProxyEvent<ProductionPhaseDto>) {
  let connection: Connection;

  try {
    connection = await createDbConnection([ProductionPhase]);
    const params = event.body || null;

    await new ProductionPhaseService().create(params);
  } finally {
    connection && (await connection.close());
  }
}

export const handler = httpMiddyfy(createHandler)
  .use(validate({ body: productionPhaseSchema }))
  .use(role([ROLE_PRODUCTION_PHASE_MANAGE]));
