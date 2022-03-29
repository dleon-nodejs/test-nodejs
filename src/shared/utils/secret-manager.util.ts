import AWS from 'aws-sdk';

const client = new AWS.SecretsManager();

export async function getSecret<T>(secretName: string, json = false): Promise<T> {
  const data = await client.getSecretValue({ SecretId: secretName }).promise();
  let secret;
  if ('SecretString' in data) {
    secret = data.SecretString;
  } else {
    if (typeof data.SecretBinary === 'string') {
      secret = data.SecretBinary;
    } else {
      const conversion = data.SecretBinary as never;
      const buff = Buffer.from(conversion, 'base64');
      secret = buff.toString('ascii');
    }
  }
  return json ? JSON.parse(secret) : secret;
}
