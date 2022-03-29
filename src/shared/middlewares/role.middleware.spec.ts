import createHttpError from 'http-errors';
import * as roleRepository from '../repositories/role/role.repository';
import {
  ERR_AUTH_UNAUTHORIZED,
  ERR_AUTH_UNAUTHORIZED_INTEGRATION,
  ERR_FORBIDDEN_INTEGRATION,
  ERR_FORBIDDEN,
  ERR_FAILED_DEPENDENCY_INTEGRATION,
} from '../errors/app.error';
import { roleMiddleware } from './role.middleware';
import {
  responseEventRoleFixture,
  responseErrorUnauthorizedRoleFixture,
  responsePrivilegesFixture,
  responseErrorRoleFixture,
  responsePrivilegeSingleFixture,
  responseEventRoleEmptyFixture,
  privilegesMock,
  privilegesSecondMock,
} from '../fixtures/privilege/privilege.fixture';

describe('Suite - Role Middleware', () => {
  const getPermissionsRepositoryMock = jest.spyOn(roleRepository, 'getPermissions');

  beforeEach(() => {
    getPermissionsRepositoryMock.mockClear();
  });

  describe('fails', () => {
    it('should throw 401 when not passed header Authorization', async () => {
      const data = responseEventRoleEmptyFixture;
      const error = createHttpError(ERR_AUTH_UNAUTHORIZED);
      await expect(async () => roleMiddleware(data, privilegesMock)).rejects.toEqual(error);
    });
    it('should throw 401 when occur a error UNAUTHORIZED on request to retrieve permissions', async () => {
      const data = responseEventRoleFixture;
      getPermissionsRepositoryMock.mockRejectedValue(responseErrorUnauthorizedRoleFixture);
      const error = createHttpError(ERR_AUTH_UNAUTHORIZED_INTEGRATION);
      await expect(async () => roleMiddleware(data, privilegesMock)).rejects.toEqual(error);
    });

    it('should throw 403 when occur a error FORBIDDEN on request to retrieve permissions', async () => {
      const data = responseEventRoleFixture;
      getPermissionsRepositoryMock.mockRejectedValue(responseErrorRoleFixture);
      const error = createHttpError(ERR_FORBIDDEN_INTEGRATION);
      await expect(async () => roleMiddleware(data, privilegesMock)).rejects.toEqual(error);
    });

    it('should throw 424 when occur a generic error on request to retrieve permissions', async () => {
      const data = responseEventRoleFixture;
      const error = new Error('xpto');
      const errorExpected = createHttpError(ERR_FAILED_DEPENDENCY_INTEGRATION);
      getPermissionsRepositoryMock.mockRejectedValue(error);
      await expect(async () => roleMiddleware(data, privilegesMock)).rejects.toEqual(errorExpected);
    });

    it('should throw 403 when user no associated privileges', async () => {
      const data = responseEventRoleFixture;
      getPermissionsRepositoryMock.mockResolvedValue([]);
      const error = createHttpError(ERR_FORBIDDEN);
      await expect(async () => roleMiddleware(data, privilegesMock)).rejects.toEqual(error);
    });

    it('should throw 403 when user not has least one privilege permissions', async () => {
      const data = responseEventRoleFixture;
      getPermissionsRepositoryMock.mockResolvedValue(responsePrivilegesFixture);
      const error = createHttpError(ERR_FORBIDDEN);
      await expect(async () => roleMiddleware(data, privilegesMock)).rejects.toEqual(error);
    });
  });

  describe('success', () => {
    it('should success when user has a least one privilege', async () => {
      const data = responseEventRoleFixture;
      getPermissionsRepositoryMock.mockResolvedValue(responsePrivilegeSingleFixture);
      await roleMiddleware(data, privilegesMock);
      expect(getPermissionsRepositoryMock).toBeCalledTimes(1);
    });

    it('should success when user has a privilege that is not the first', async () => {
      const data = responseEventRoleFixture;
      getPermissionsRepositoryMock.mockResolvedValue(responsePrivilegesFixture);
      await roleMiddleware(data, privilegesSecondMock);
      expect(getPermissionsRepositoryMock).toBeCalledTimes(1);
    });
  });
});
