const getSecretValueMock = jest.fn();

jest.mock('aws-sdk', () => ({
  SecretsManager: jest.fn(() => ({
    getSecretValue: getSecretValueMock,
  })),
}));

import { getSecret } from './secret-manager.util';

describe('Suite secret-manager', () => {
  it('should return a secret string by secretId', async () => {
    const promiseMock = jest.fn().mockResolvedValue({
      SecretString: '123',
    });
    getSecretValueMock.mockReturnValue({ promise: promiseMock });

    const response = await getSecret<string>('MY_SECRET');
    expect(response).toEqual('123');
  });

  it('should return a secret json by secretId when passed json true', async () => {
    const promiseMock = jest.fn().mockResolvedValue({
      SecretString: '{ "user": "ay123", "pass": 7890 }',
    });
    getSecretValueMock.mockReturnValue({ promise: promiseMock });

    const response = await getSecret<string>('MY_SECRET_JSON', true);
    expect(response).toEqual({
      user: 'ay123',
      pass: 7890,
    });
  });

  it('should throw error', async () => {
    const error = new Error('Error test secret manager');
    const promiseMock = jest.fn().mockRejectedValue(error);
    getSecretValueMock.mockReturnValue({ promise: promiseMock });

    await expect(async () => getSecret<string>('MY_SECRET')).rejects.toEqual(error);
  });
});
