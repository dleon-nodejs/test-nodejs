import { Connection } from 'typeorm';

import { ValidatedAPIGatewayProxyEvent } from '@/shared/interfaces/api-gateway.interface';
import { createDbConnection } from '@/shared/utils/database.util';
import { httpMiddyfy } from '@/shared/utils/http-middy.util';
import { validate } from '@/shared/middlewares/validate.middleware';
import { role } from '@/shared/middlewares/role.middleware';

import { Category } from '@/category/entities/category.entity';
import { categoryChangeStatusSchema } from '@/category/functions/schema/category.schema';
import { CategoryStatusDto } from '@/category/types/category.type';
import { ROLE_CATEGORY_MANAGER } from '@/category/config/category.config';
import { CategoryService } from '@/category/services/category.service';

async function changeStatusHandler(event: ValidatedAPIGatewayProxyEvent<CategoryStatusDto>): Promise<void> {
  let connection: Connection;

  try {
    connection = await createDbConnection([Category]);
    const { status } = event.body || null;
    const { id } = event.pathParameters;
    await new CategoryService().changeStatus(Number(id), status);
  } finally {
    connection && (await connection.close());
  }
}

export const handler = httpMiddyfy(changeStatusHandler)
  .use(role([ROLE_CATEGORY_MANAGER]))
  .use(validate({ body: categoryChangeStatusSchema }));
