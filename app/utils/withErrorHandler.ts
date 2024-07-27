const WEH = async <T extends Promise<unknown>>(
  promise: T
): Promise<[Awaited<T>, null] | [null, Error]> => {
  try {
    const awaited = await promise;
    return [awaited, null];
  } catch (e) {
    if (e instanceof Error) {
      return [null, e];
    }
    return [null, new Error(`${e}`)];
  }
};

export default WEH;
