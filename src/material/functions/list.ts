import { Connection } from 'typeorm';

import { ValidatedAPIGatewayProxyEvent } from '@/shared/interfaces/api-gateway.interface';
import { role } from '@/shared/middlewares/role.middleware';
import { createDbConnection } from '@/shared/utils/database.util';
import { httpMiddyfy } from '@/shared/utils/http-middy.util';

import { Material } from '@/material/entities/material.entity';
import { ROLE_MATERIAL_MANAGER } from '@/material/config/material.config';
import { PurchaseUnit } from '@/purchase-unit/entities/purchase-unit.entity';
import { PurchaseUnitVariation } from '@/purchase-unit/entities/purchase-unit-variation.entity';
import { Category } from '@/category/entities/category.entity';
import { Buyer } from '@/buyer/entities/buyer.entity';
import { MaterialService } from '../services/material.service';
import { MaterialPaginatedDto, MaterialParamsDto } from '../types/material.type';
import { validate } from '@/shared/middlewares/validate.middleware';
import { materialPaginetedSchema } from './schema/material.schema';
import { ProductionPhase } from '@/production-phase/entities/production-phase.entity';

async function listHandler(event: ValidatedAPIGatewayProxyEvent<null>): Promise<MaterialPaginatedDto> {
  let connection: Connection;
  try {
    connection = await createDbConnection([Material, PurchaseUnit, PurchaseUnitVariation, Category, Buyer, ProductionPhase]);
    const { name, page, limit, code, buyerEmail } = event.queryStringParameters;
    const paramsMaterial: MaterialParamsDto = {
      page: Number(page),
      limit: Number(limit),
      name,
      code,
      buyerEmail,
    };
    const materials = await new MaterialService().findPaginatedParams(paramsMaterial);
    return materials;
  } finally {
    connection && (await connection.close());
  }
}

export const handler = httpMiddyfy(listHandler)
  .use(validate({ queryStringParameters: materialPaginetedSchema }))
  .use(role([ROLE_MATERIAL_MANAGER]));
