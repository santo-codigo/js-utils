import { performance } from 'perf_hooks';

import { Options } from './types';

export const repeatUntilSucceed = async <T = any>(
  options: Options<T>
): Promise<T | null> => {
  const INITIAL_TIME = performance.now();

  const resolver = async (attempts = 1): Promise<T | null> => {
    if (options?.timeout) {
      const NOW = performance.now() - INITIAL_TIME;

      if (NOW >= options?.timeout) return null;
    }

    if (!!options?.attempts && attempts > options.attempts) return null;

    const result = await options?.callback?.();

    if (result.success) return result?.data ?? null;

    await new Promise<void>((resolve) => {
      setTimeout(() => resolve(), options.timeToSleep);
    });

    return resolver(++attempts);
  };

  return resolver();
};
