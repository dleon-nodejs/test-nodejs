import { DbDuplicateEntry, DbEntityNotFound } from '../errors/db-custom.error';

export const dbEntityNotFoundErrorMock = new DbEntityNotFound('Entity not Found');
export const dbDuplicatedErrorMock = new DbDuplicateEntry('Duplicated field', 'ER_DUP_ENTRY', 1062);
