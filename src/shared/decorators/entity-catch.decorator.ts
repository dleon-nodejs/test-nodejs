import { DbDuplicateEntry, DbEntityNotFound } from '../errors/db-custom.error';
import { throwError } from '../utils/throw-error.util';

export const EntityCatch = (options: any) => (_target: any, _propertyKey: string, descriptor: PropertyDescriptor) => {
  const original = descriptor.value;
  descriptor.value = async function (...args) {
    try {
      const result = await original.apply(this, args);
      return result;
    } catch (error) {
      if (error instanceof DbEntityNotFound) {
        throwError(options.notExists);
      }
      if (error instanceof DbDuplicateEntry) {
        throwError(options.duplicate);
      }
      throw error;
    }
    return;
  };
};
