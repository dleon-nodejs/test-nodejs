import { PermissionResponse } from '@/shared/interfaces/permissions.type';
import { roleApi } from '@/shared/utils/factory-user-api.util';

export async function getPermissions(token: string): Promise<string[]> {
  const response = await roleApi(token).get<PermissionResponse>('/me');
  const permissions = response?.data?.permissions || [];

  return permissions.map((permission) => permission.privilege_cod);
}
