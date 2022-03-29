import { IS_OFFLINE } from '../config/app.config';
import {
  ERR_AUTH_UNAUTHORIZED,
  ERR_AUTH_UNAUTHORIZED_INTEGRATION,
  ERR_FAILED_DEPENDENCY_INTEGRATION,
  ERR_FORBIDDEN,
  ERR_FORBIDDEN_INTEGRATION,
} from '../errors/app.error';
import { getPermissions } from '../repositories/role/role.repository';
import { throwError } from '../utils/throw-error.util';

export async function roleMiddleware(request, privileges: string[]) {
  const token = request.event.headers.Authorization;

  if (IS_OFFLINE) {
    return;
  }

  if (!token) {
    throwError(ERR_AUTH_UNAUTHORIZED);
  }

  let privilegesFound = [];

  try {
    const privilegesUser = await getPermissions(token);
    privilegesFound = privileges.filter((privilege) => privilegesUser.includes(privilege));
  } catch (error) {
    if (error?.response?.status === 401) {
      throwError(ERR_AUTH_UNAUTHORIZED_INTEGRATION);
    }
    if (error?.response?.status === 403) {
      throwError(ERR_FORBIDDEN_INTEGRATION);
    }

    console.error(error);
    throwError(ERR_FAILED_DEPENDENCY_INTEGRATION);
  }

  if (!privilegesFound.length) {
    throwError(ERR_FORBIDDEN);
  }
}

/* istanbul ignore next */
export function role(privileges: string[]) {
  return {
    before: (request) => roleMiddleware(request, privileges),
  };
}
