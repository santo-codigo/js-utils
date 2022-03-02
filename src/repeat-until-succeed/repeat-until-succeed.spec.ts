import { repeatUntilSucceed } from './repeat-until-succeed';

describe('repeatUntilSucceed', () => {
  test('should return null if timeout exceeded', async () => {
    const sut = repeatUntilSucceed;

    const params = {
      callback: async () => {
        return { success: false, data: { name: 'test' } };
      },
      timeToSleep: 0,
      timeout: 1,
    };

    const result = await sut(params);

    expect(result).toBe(null);
  });

  test('should return null if attempts exceeded', async () => {
    const sut = repeatUntilSucceed;

    const params = {
      callback: async () => {
        return { success: false, data: { name: 'test' } };
      },
      timeToSleep: 0,
      attempts: 4,
    };

    const result = await sut(params);

    expect(result).toBe(null);
  });
});
