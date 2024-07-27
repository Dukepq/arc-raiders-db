import "@/envConfig";

const envHandler = (variable: string): string => {
  const envVar = process.env[variable];
  if (!envVar) {
    throw new ReferenceError(
      `environment variable ${variable} is not defined, please define it inside of the .env file.`
    );
  }
  return envVar;
};

export default envHandler;
