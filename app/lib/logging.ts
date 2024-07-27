import "server-only";

const logging = {
  error: (err: Error | string) => {
    if (err instanceof Error) {
      console.error(err.message, err.stack);
    } else if (typeof err === "string") {
      console.error(err);
    }
  },
  log: (data: unknown) => {
    console.log(JSON.stringify(data));
  },
};
export default logging;
