import { Connection } from 'typeorm';

import { ValidatedAPIGatewayProxyEvent } from '@/shared/interfaces/api-gateway.interface';
import { role } from '@/shared/middlewares/role.middleware';
import { createDbConnection } from '@/shared/utils/database.util';
import { httpMiddyfy } from '@/shared/utils/http-middy.util';

import { ROLE_BUYER_MANAGER } from '@/buyer/config/buyer.config';
import { ROLE_CATEGORY_MANAGER } from '@/category/config/category.config';
import { DocumentUpload } from '@/document-upload/entities/document_upload.entity';
import { ROLE_PRODUCTION_PHASE_MANAGE } from '@/production-phase/config/production-phase.config';
import { ROLE_PURCHASE_UNIT_MANAGE } from '@/purchase-unit/config/purchase-unit.config';
import { DocumentUploadService } from '../services/document-upload.service';

async function listHandler(event: ValidatedAPIGatewayProxyEvent<null>): Promise<DocumentUpload[]> {
  const { uploadType } = event.pathParameters;
  let connection: Connection;

  try {
    connection = await createDbConnection([DocumentUpload]);
    const data = await new DocumentUploadService().findByUploadType(uploadType);
    return data;
  } finally {
    connection && (await connection.close());
  }
}

export const handler = httpMiddyfy(listHandler).use(
  role([ROLE_PURCHASE_UNIT_MANAGE, ROLE_PRODUCTION_PHASE_MANAGE, ROLE_BUYER_MANAGER, ROLE_CATEGORY_MANAGER])
);
