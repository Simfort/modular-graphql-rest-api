import { EnvError } from "../errors/EnvError.js";

export const checkEnv = (message: string, env?: string) => {
  if (env) {
    return env;
  }
  throw new EnvError(message);
};
