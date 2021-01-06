import dotenvExtended from "dotenv-extended";
import dotenvParseVariables from "dotenv-parse-variables";

const env = dotenvExtended.load({
  path: process.env.ENV_FILE,
  defaults: "./config/.env.defaults",
  schema: "./config/.env.schema",
  includeProcessEnv: true,
  silent: false,
  errorOnMissing: true,
  errorOnExtra: true,
});

const parsedEnv = dotenvParseVariables(env);

type LogLevel =
  | "silent"
  | "error"
  | "warn"
  | "info"
  | "http"
  | "verbose"
  | "debug"
  | "silly";

interface Config {
  // logger
  morganLogger: boolean;
  morganBodyLogger: boolean;
  exmplDevLogger: boolean;
  // winston log level
  loggerLevel: LogLevel;
  // mongo
  mongo: {
    url: string;
    useCreateIndex: boolean;
    autoIndex: boolean;
  };
}

const config: Config = {
  // logger
  morganLogger: parsedEnv.MORGAN_LOGGER as boolean,
  morganBodyLogger: parsedEnv.MORGAN_BODY_LOGGER as boolean,
  exmplDevLogger: parsedEnv.EXMPL_DEV_LOGGER as boolean,
  // winston log level
  loggerLevel: parsedEnv.LOGGER_LEVEL as LogLevel,
  // mongo
  mongo: {
    url: parsedEnv.MONGO_URL as string,
    useCreateIndex: parsedEnv.MONGO_CREATE_INDEX as boolean,
    autoIndex: parsedEnv.MONGO_AUTO_INDEX as boolean,
  },
};

export default config;
