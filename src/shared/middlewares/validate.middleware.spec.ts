import { validateMiddleware } from './validate.middleware';
import { payloadFailedCreateUserMock, payloadSucessedCreateUserMock, userSchemaMock } from '../fixtures/middleware/validate-middleware.fixture';

describe('Suite - Yup Validate', () => {
  const next = jest.fn();
  describe('validate test fail', () => {
    it('should throw a BadRequest error', async () => {
      const data = { event: { body: { ...payloadFailedCreateUserMock } } };
      const error = {
        message: { errors: ['email is a required field'] },
        statusCode: 400,
      };
      await expect(async () => validateMiddleware(data, next, { body: userSchemaMock })).rejects.toEqual(error);
    });
  });
  describe('validate test success', () => {
    it('should validate body with success', async () => {
      const data = { event: { body: payloadSucessedCreateUserMock } };
      await validateMiddleware(data, next, { body: userSchemaMock });
      expect(next).toHaveBeenCalled();
    });
  });
});
