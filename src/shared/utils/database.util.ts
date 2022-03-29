import 'mysql2';
import { Connection, ConnectionOptions, createConnection, EntityNotFoundError } from 'typeorm';
import { IS_OFFLINE } from '../config/app.config';
import { DB_ENGINE_LOCAL, DB_NAME, DB_SECRET_NAME, DB_URI_LOCAL } from '../config/db.config';
import { DbDuplicateEntry, DbEntityNotFound } from '../errors/db-custom.error';
import { DbConfig } from '../interfaces/db.interface';

import { getSecret } from './secret-manager.util';

export async function getDbCredentialsFromSecret() {
  if (IS_OFFLINE) {
    return {
      uri: DB_URI_LOCAL,
      engine: DB_ENGINE_LOCAL,
    };
  }

  const { engine, username, password, host, port } = await getSecret<DbConfig>(DB_SECRET_NAME, true);

  return {
    uri: `${engine}2://${username}:${password}@${host}:${port}/${DB_NAME}`,
    engine,
  };
}

export async function createDbConnection(entities = []): Promise<Connection> {
  console.info(`Database.getConnection()-creating connection ...`);

  const { engine, uri } = await getDbCredentialsFromSecret();

  const connectionOptions: ConnectionOptions = {
    type: engine as never,
    url: uri,
    entities,
  };

  const connection = await createConnection(connectionOptions);

  return connection;
}

export function dbHandlerCatch(error) {
  if (error.code === 'ER_DUP_ENTRY') {
    throw new DbDuplicateEntry(error.message, error.code, error.errno);
  }
  if (error instanceof EntityNotFoundError) {
    throw new DbEntityNotFound(error);
  }

  throw error;
}
