import { Connection } from 'typeorm';

import { ROLE_BUYER_MANAGER } from '@/buyer/config/buyer.config';
import { Buyer } from '@/buyer/entities/buyer.entity';

import { ROLE_CATEGORY_MANAGER } from '@/category/config/category.config';
import { Category } from '@/category/entities/category.entity';

import { ROLE_PRODUCTION_PHASE_MANAGE } from '@/production-phase/config/production-phase.config';
import { ProductionPhase } from '@/production-phase/entities/production-phase.entity';

import { ROLE_PURCHASE_UNIT_MANAGE } from '@/purchase-unit/config/purchase-unit.config';
import { PurchaseUnitVariation } from '@/purchase-unit/entities/purchase-unit-variation.entity';
import { PurchaseUnit } from '@/purchase-unit/entities/purchase-unit.entity';

import { ValidatedAPIGatewayProxyEvent } from '@/shared/interfaces/api-gateway.interface';
import { role } from '@/shared/middlewares/role.middleware';
import { createDbConnection } from '@/shared/utils/database.util';
import { httpMiddyfy } from '@/shared/utils/http-middy.util';

import { getProcessorByTypeFactory } from '../factories/processor-by-type.factory';
import { UploadType } from '../config/document-upload.enum';
import { Material } from '@/material/entities/material.entity';
import { ROLE_MATERIAL_MANAGER } from '@/material/config/material.config';
import { IS_OFFLINE } from '@/shared/config/app.config';

async function downloadHandler(event: ValidatedAPIGatewayProxyEvent<null>) {
  let connection: Connection;

  const { uploadType } = event.pathParameters;

  try {
    connection = await createDbConnection([PurchaseUnitVariation, PurchaseUnit, Buyer, Category, ProductionPhase, Material]);
    const typeEnum = UploadType[uploadType];
    const data = await getProcessorByTypeFactory(typeEnum).getCsvFile();

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'text/csv' },
      body: IS_OFFLINE ? data : data.toString(),
      isBase64Encoded: true,
    };
  } finally {
    connection && (await connection.close());
  }
}

export const handler = httpMiddyfy(downloadHandler, false).use(
  role([ROLE_PURCHASE_UNIT_MANAGE, ROLE_PRODUCTION_PHASE_MANAGE, ROLE_BUYER_MANAGER, ROLE_CATEGORY_MANAGER, ROLE_MATERIAL_MANAGER])
);
