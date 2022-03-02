import { types } from 'util';

export const resolver = async (
  promise: any,
  customArrayResolver = Promise.allSettled
): Promise<any> => {
  if (!promise) return promise;

  if (Array.isArray(promise)) {
    const promisesWithResolve = promise.map(async (promise) => {
      return resolver(promise, customArrayResolver);
    });

    return customArrayResolver(promisesWithResolve);
  }

  if (types.isPromise(promise)) {
    const result = await promise;
    return resolver(result, customArrayResolver);
  }

  if (typeof promise === 'object') {
    const entries = Object.entries(promise);
    const entriesPromise = entries.map(async ([key, value]) => {
      if (Array.isArray(value) || typeof value === 'object') {
        const newValue = await resolver(value, customArrayResolver);
        return [key, newValue];
      }

      return [key, value];
    });

    const entriesResolved = await Promise.all(entriesPromise);
    return Object.fromEntries(entriesResolved);
  }

  return promise;
};
