export async function errorHandler<T extends Promise<unknown>>(promise: any) {
  try {
    const awaited = await promise;
    return [awaited, null] as const;
  } catch (e) {
    return [null, e] as const;
  }
}

class Calc {
  constructor(private num: number) {
    this.num = num;
  }
  add(add: number) {
    this.num = this.num + add;
    return this;
  }
  subtract(sub: number) {
    this.num = this.num - sub;
    return this;
  }
  async throwAsyncError() {
    throw new Error();
    return this;
  }
  throwSyncError() {
    throw new Error();
    return this;
  }
  async getNum() {
    return this.num;
  }
}

// passing a synchronous function to the error handler will crash the application immediately
// because it runs INSTANTLY, it does not return a promise to be awaited and handled.
// this also means that when chaining methods, when an error occurs in a synchronous method
// it will crash the application.

async function rejectPromise() {
  const promise = new Promise((res, rej) => {
    setTimeout(rej, 60);
  });
  console.log("waiting...");
  await new Promise((res) => setTimeout(res, 0));
  console.log("done waiting.");
  return await promise;
}

// (async () => {
//   const calc = new Calc(10);
//   const res = await errorHandler(calc.add(10).throwSyncError());
//   console.log(res);
//   console.log("I FINISHED RUNNING SUCCESSFULLY");
// })();

async function higherOrder(fn: Function) {
  return function (...args: any[]) {
    fn(args);
  };
}

const withErrors = <T, K extends unknown>(
  fn: (...args: T[]) => K | Promise<K>
) => {
  return async (...args: T[]): Promise<[K, null] | [null, Error]> => {
    try {
      const returned = await fn(...args);
      return [returned, null];
    } catch (e) {
      if (e instanceof Error) {
        return [null, e];
      }
      return [null, new Error()];
    }
  };
};

const someAsyncFunction = async () => {
  throw new Error();
};

const someOtherAsyncFunction = async () => {
  await someAsyncFunction();
};

(async () => {
  // const result = await withErrors(someAsyncFunction)();
  // console.log(result);
  try {
    const res = await someOtherAsyncFunction();
    console.log(res);
  } catch (e) {
    console.log("caught it");
  }
})();
