export const throttle = <T extends any[]>(
  callback: (...arg: T) => void,
  delay: number
) => {
  let wait = false;
  let waitingArgs: T | null;
  const timeoutFunc = () => {
    if (!waitingArgs) {
      wait = false;
    } else {
      callback(...waitingArgs);
      waitingArgs = null;
      setTimeout(timeoutFunc, delay);
    }
  };
  return (...args: T) => {
    if (wait) {
      waitingArgs = args;
      return;
    }
    callback(...args);
    wait = true;
    setTimeout(timeoutFunc, delay);
  };
};
