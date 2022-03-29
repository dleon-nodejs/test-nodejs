import { Connection } from 'typeorm';

import { ValidatedAPIGatewayProxyEvent } from '@/shared/interfaces/api-gateway.interface';
import { role } from '@/shared/middlewares/role.middleware';
import { validate } from '@/shared/middlewares/validate.middleware';
import { createDbConnection } from '@/shared/utils/database.util';
import { httpMiddyfy } from '@/shared/utils/http-middy.util';

import { categorySchema } from '@/category/functions/schema/category.schema';
import { CategoryDto } from '@/category/types/category.type';
import { Category } from '@/category/entities/category.entity';
import { ROLE_CATEGORY_MANAGER } from '@/category/config/category.config';
import { CategoryService } from '@/category/services/category.service';

async function updateHandler(event: ValidatedAPIGatewayProxyEvent<CategoryDto>): Promise<void> {
  let connection: Connection;
  try {
    connection = await createDbConnection([Category]);
    const params = event.body || null;
    const { id } = event.pathParameters;
    await new CategoryService().update(params, Number(id));
  } finally {
    connection && (await connection.close());
  }
}

export const handler = httpMiddyfy(updateHandler)
  .use(validate({ body: categorySchema }))
  .use(role([ROLE_CATEGORY_MANAGER]));
