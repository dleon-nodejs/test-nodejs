import { dbHandlerCatch } from '../utils/database.util';

export const DbCatch = (_target: any, _propertyKey: string, descriptor: PropertyDescriptor) => {
  const original = descriptor.value;
  descriptor.value = async function (...args) {
    try {
      const result = await original.apply(this, args);
      return result;
    } catch (error) {
      dbHandlerCatch(error);
    }
    return;
  };
};
