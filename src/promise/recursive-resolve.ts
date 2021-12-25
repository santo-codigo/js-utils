import { types } from 'util'

const customResolve = async (promises: object[]) => await Promise.all(promises)

export const recursiveResolve = async (promise: any, arrayResolve = customResolve): Promise<any> => {
  if (!promise) return promise;

  if (Array.isArray(promise)) {
    const promisesWithResolve = promise.map(async promise => {
      return await recursiveResolve(promise, arrayResolve)
    })

    return await arrayResolve(promisesWithResolve)
  }

  if (types.isPromise(promise)) {
    const result = await promise;
    return await recursiveResolve(result, arrayResolve)
  }

  if (typeof promise === 'object') {
    const entries = Object.entries(promise);
    const entriesPromise = entries.map(async ([key, value]) => {

      if (Array.isArray(value) || typeof value === 'object') {
        const newValue = await recursiveResolve(value, arrayResolve);
        return [key, newValue]
      }

      return [key, value]
    })

    const entriesResolved = await Promise.all(entriesPromise)
    return Object.fromEntries(entriesResolved)
  }

  return promise;
};
