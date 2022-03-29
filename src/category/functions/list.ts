import { Connection } from 'typeorm';

import { ValidatedAPIGatewayProxyEvent } from '@/shared/interfaces/api-gateway.interface';
import { role } from '@/shared/middlewares/role.middleware';
import { createDbConnection } from '@/shared/utils/database.util';
import { httpMiddyfy } from '@/shared/utils/http-middy.util';
import { Category } from '@/category/entities/category.entity';
import { ROLE_CATEGORY_MANAGER } from '@/category/config/category.config';
import { CategoryDto } from '@/category/types/category.type';
import { CategoryService } from '@/category/services/category.service';

async function listHandler(event: ValidatedAPIGatewayProxyEvent<null>): Promise<CategoryDto[]> {
  let connection: Connection;
  try {
    connection = await createDbConnection([Category]);
    const { name } = event.queryStringParameters;
    const categories = await new CategoryService().list(name);
    return categories;
  } finally {
    connection && (await connection.close());
  }
}

export const handler = httpMiddyfy(listHandler).use(role([ROLE_CATEGORY_MANAGER]));
