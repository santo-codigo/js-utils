type CallbackResult<T> = {
  success: boolean;
  data?: T;
};

export type Options<T> = {
  callback: () => Promise<CallbackResult<T>>;
  timeToSleep: number;
  timeout?: number;
  attempts?: number;
};
