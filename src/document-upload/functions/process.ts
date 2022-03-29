import { S3Event } from 'aws-lambda';
import { Connection } from 'typeorm';
import { middyDefaults } from '@moblybr/middy-defaults';

import { createDbConnection } from '@/shared/utils/database.util';
import { PurchaseUnitVariation } from '@/purchase-unit/entities/purchase-unit-variation.entity';
import { PurchaseUnit } from '@/purchase-unit/entities/purchase-unit.entity';
import { ProductionPhase } from '@/production-phase/entities/production-phase.entity';
import { Category } from '@/category/entities/category.entity';
import { Buyer } from '@/buyer/entities/buyer.entity';
import { DocumentUpload } from '@/document-upload/entities/document_upload.entity';
import { DocumentProcessService } from '../services/document-process.service';
import { Material } from '@/material/entities/material.entity';

export async function processHandler(event: S3Event, _context, callback) {
  const records = event.Records || [];

  let connection: Connection;
  try {
    connection = await createDbConnection([PurchaseUnitVariation, PurchaseUnit, ProductionPhase, Category, Buyer, Material, DocumentUpload]);
    await new DocumentProcessService().processFiles(records);
  } catch (error) {
    console.log(error);
    throw error;
  } finally {
    connection && (await connection.close());
    callback(null, 'ok');
  }
}

export const handler = middyDefaults(processHandler);
