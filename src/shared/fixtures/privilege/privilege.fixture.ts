export const responseEventRoleFixture = {
  event: { headers: { Authorization: 'eyJraWQiOiJzbVhzME9lR0' } },
};

export const responseEventRoleEmptyFixture = {
  event: { headers: { Authorization: '' } },
};

export const responseErrorRoleFixture = {
  response: { status: 403 },
};

export const responseErrorUnauthorizedRoleFixture = {
  response: { status: 401 },
};

export const privilegesMock = ['privilegeSingleMock'];

export const privilegesSecondMock = ['privilegeSecondMock'];

export const responsePrivilegeSingleFixture = ['privilegeSingleMock'];

export const responsePrivilegesFixture = ['privilegeFirstMock', 'privilegeSecondMock'];
