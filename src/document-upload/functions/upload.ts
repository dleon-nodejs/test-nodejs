import { ValidatedAPIGatewayProxyEvent } from '@/shared/interfaces/api-gateway.interface';
import { role } from '@/shared/middlewares/role.middleware';
import { httpMiddyfy } from '@/shared/utils/http-middy.util';

import { ROLE_BUYER_MANAGER } from '@/buyer/config/buyer.config';
import { ROLE_CATEGORY_MANAGER } from '@/category/config/category.config';
import { UploadDocumentDto } from '@/document-upload/types/document-upload.type';
import { ROLE_PRODUCTION_PHASE_MANAGE } from '@/production-phase/config/production-phase.config';
import { ROLE_PURCHASE_UNIT_MANAGE } from '@/purchase-unit/config/purchase-unit.config';
import { DocumentUploadService } from '../services/document-upload.service';

async function uploadHandler(event: ValidatedAPIGatewayProxyEvent<UploadDocumentDto>) {
  const {
    body,
    pathParameters: { uploadType },
  } = event;

  return new DocumentUploadService().createUploadURL(uploadType, body);
}

export const handler = httpMiddyfy(uploadHandler).use(
  role([ROLE_PURCHASE_UNIT_MANAGE, ROLE_PRODUCTION_PHASE_MANAGE, ROLE_BUYER_MANAGER, ROLE_CATEGORY_MANAGER])
);
